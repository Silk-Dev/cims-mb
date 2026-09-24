'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useActionState, useEffect, useRef } from 'react'

import { submitAppointment, type ContactState } from '@/app/(frontend)/[locale]/contact/actions'
import type { Dictionary } from '@/lib/dictionary'

import { ArrowIcon, CheckIcon } from './Icons'

type Props = {
  locale: string
  t: Dictionary['contactPage']
  services: { id: number | string; title: string }[]
}

const field =
  'peer w-full rounded-2xl border border-line bg-white px-4 pb-3 pt-6 text-navy-900 outline-none transition placeholder-transparent focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/15'
const label =
  'pointer-events-none absolute start-4 top-2 text-xs font-semibold text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500'

export function ContactForm({ locale, t, services }: Props) {
  const [state, action, pending] = useActionState<ContactState, FormData>(submitAppointment, {
    status: 'idle',
  })
  const serviceRef = useRef<HTMLSelectElement>(null)

  // Preselect the exam when arriving from a service page (/contact?service=<id>).
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get('service')
    if (wanted && serviceRef.current && services.some((s) => String(s.id) === wanted))
      serviceRef.current.value = wanted
  }, [services])

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {state.status === 'success' ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center rounded-[2rem] border border-line bg-white px-8 py-16 text-center"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
              <CheckIcon width={30} height={30} />
            </span>
            <p className="mt-6 max-w-sm text-lg font-medium text-navy-900">{t.success}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            action={action}
            className="grid gap-4 sm:grid-cols-2"
            exit={{ opacity: 0 }}
          >
            <input type="hidden" name="locale" value={locale} />
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="relative sm:col-span-2">
              <input
                id="fullName"
                name="fullName"
                required
                minLength={2}
                placeholder=" "
                autoComplete="name"
                className={field}
              />
              <label htmlFor="fullName" className={label}>
                {t.fullName} *
              </label>
            </div>
            <div className="relative">
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder=" "
                autoComplete="tel"
                dir="ltr"
                className={`${field} rtl:text-end`}
              />
              <label htmlFor="phone" className={label}>
                {t.phone} *
              </label>
            </div>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                placeholder=" "
                autoComplete="email"
                dir="ltr"
                className={`${field} rtl:text-end`}
              />
              <label htmlFor="email" className={label}>
                {t.email}
              </label>
            </div>
            <div className="relative">
              <select
                ref={serviceRef}
                id="service"
                name="service"
                defaultValue=""
                className={`${field} appearance-none`}
              >
                <option value="">{t.chooseService}</option>
                {services.map((s) => (
                  <option key={s.id} value={String(s.id)}>
                    {s.title}
                  </option>
                ))}
                <option value="0">{t.other}</option>
              </select>
              <label
                htmlFor="service"
                className="pointer-events-none absolute start-4 top-2 text-xs font-semibold text-muted"
              >
                {t.service}
              </label>
            </div>
            <div className="relative">
              <input id="preferredDate" name="preferredDate" type="date" className={field} />
              <label
                htmlFor="preferredDate"
                className="pointer-events-none absolute start-4 top-2 text-xs font-semibold text-muted"
              >
                {t.date}
              </label>
            </div>
            <div className="relative sm:col-span-2">
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder=" "
                className={`${field} resize-none`}
              />
              <label htmlFor="message" className={label}>
                {t.message}
              </label>
            </div>
            <label className="flex items-start gap-3 text-sm text-muted sm:col-span-2">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-1 h-4 w-4 accent-blue-500"
              />
              {t.consent}
            </label>

            {(state.status === 'error' || state.status === 'invalid') && (
              <p
                role="alert"
                className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2"
              >
                {state.status === 'invalid' ? t.required : t.error}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
              <p className="text-xs text-muted">{t.urgent}</p>
              <button
                type="submit"
                disabled={pending}
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-7 py-4 font-semibold text-white shadow-[0_10px_30px_-10px_rgba(47,168,228,0.9)] transition hover:brightness-110 disabled:opacity-60"
              >
                {pending ? t.sending : t.submit}
                <ArrowIcon className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
