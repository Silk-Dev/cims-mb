'use server'

import { headers } from 'next/headers'

import { isLocale } from '@/lib/i18n'
import { getPayloadClient } from '@/lib/payload'

export type ContactState = { status: 'idle' | 'success' | 'error' | 'invalid' }

const clean = (v: FormDataEntryValue | null, max = 500) =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

// Very small in-memory rate limit (per server instance) to discourage spam bursts.
const hits = new Map<string, number[]>()
const limited = (key: string) => {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < 10 * 60_000)
  recent.push(now)
  hits.set(key, recent)
  return recent.length > 5
}

export async function submitAppointment(
  _prev: ContactState,
  form: FormData,
): Promise<ContactState> {
  // Honeypot: bots fill every field.
  if (clean(form.get('website'))) return { status: 'success' }

  const fullName = clean(form.get('fullName'), 120)
  const phone = clean(form.get('phone'), 40)
  const email = clean(form.get('email'), 160)
  const serviceRaw = clean(form.get('service'), 20)
  const preferredDate = clean(form.get('preferredDate'), 20)
  const message = clean(form.get('message'), 2000)
  const locale = clean(form.get('locale'), 5)

  const digits = phone.replace(/\D/g, '')
  if (fullName.length < 2 || digits.length < 8 || form.get('consent') !== 'on')
    return { status: 'invalid' }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { status: 'invalid' }

  const h = await headers()
  const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (limited(ip)) return { status: 'error' }

  try {
    const payload = await getPayloadClient()
    const serviceId = Number(serviceRaw)
    await payload.create({
      collection: 'appointments',
      data: {
        fullName,
        phone,
        email: email || undefined,
        service: Number.isFinite(serviceId) && serviceId > 0 ? serviceId : undefined,
        preferredDate: /^\d{4}-\d{2}-\d{2}$/.test(preferredDate)
          ? new Date(preferredDate).toISOString()
          : undefined,
        message: message || undefined,
        locale: isLocale(locale) ? locale : undefined,
        status: 'new',
      },
      overrideAccess: true,
    })
    return { status: 'success' }
  } catch (err) {
    console.error('[contact] failed to save appointment', err)
    return { status: 'error' }
  }
}
