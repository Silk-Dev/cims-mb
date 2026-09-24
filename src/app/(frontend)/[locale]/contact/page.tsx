import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ContactForm } from '@/components/ContactForm'
import { ClockIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from '@/components/Icons'
import { MapEmbed } from '@/components/MapEmbed'
import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/Reveal'
import { getDictionary } from '@/lib/dictionary'
import { isLocale, telHref } from '@/lib/i18n'
import { getServices, getSettings } from '@/lib/payload'

type Params = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getDictionary(locale)
  return { title: t.contactPage.title, description: t.contactPage.intro }
}

export default async function ContactPage({ params }: Params) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  const [services, settings] = await Promise.all([getServices(locale), getSettings(locale)])
  const whatsapp = settings.whatsapp
    ? `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}`
    : null

  const cards = [
    ...[settings.phoneOffice, settings.phoneMobile]
      .filter((p): p is string => !!p)
      .map((p) => ({ icon: PhoneIcon, label: t.phone, value: p, href: telHref(p), ltr: true })),
    ...(whatsapp
      ? [
          {
            icon: WhatsAppIcon,
            label: t.whatsapp,
            value: settings.phoneMobile ?? settings.whatsapp ?? '',
            href: whatsapp,
            ltr: true,
          },
        ]
      : []),
    ...(settings.email
      ? [
          {
            icon: MailIcon,
            label: t.email,
            value: settings.email,
            href: `mailto:${settings.email}`,
            ltr: true,
          },
        ]
      : []),
  ]

  return (
    <>
      <PageHeader
        eyebrow={t.contactPage.eyebrow}
        title={t.contactPage.title}
        intro={t.contactPage.intro}
      >
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={i} delay={0.15 + i * 0.05}>
              <a
                href={c.href}
                target={c.href?.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-cyan-300/60 hover:bg-white/10"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white">
                  <c.icon width={20} height={20} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-widest text-white/50">
                    {c.label}
                  </span>
                  <span className="block truncate font-semibold" dir={c.ltr ? 'ltr' : undefined}>
                    {c.value}
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </PageHeader>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <div className="rounded-[2rem] border border-line bg-ice/60 p-6 sm:p-10">
            <h2 className="mb-8 font-display text-3xl font-extrabold text-navy-900">
              {t.contactPage.formTitle}
            </h2>
            <ContactForm
              locale={locale}
              t={t.contactPage}
              services={services.map((s) => ({ id: s.id, title: s.title }))}
            />
          </div>
        </Reveal>
        <div className="flex flex-col gap-6">
          <Reveal delay={0.1}>
            <ul className="flex flex-col gap-5 rounded-[2rem] bg-navy-950 p-8 text-white/80">
              {settings.address && (
                <li className="flex gap-4">
                  <PinIcon className="mt-1 shrink-0 text-cyan-300" />
                  <span>
                    <span className="block text-xs uppercase tracking-widest text-white/45">
                      {t.address}
                    </span>
                    <span className="whitespace-pre-line">{settings.address}</span>
                  </span>
                </li>
              )}
              {!!settings.hours?.length && (
                <li className="flex gap-4">
                  <ClockIcon className="mt-1 shrink-0 text-cyan-300" />
                  <span>
                    <span className="block text-xs uppercase tracking-widest text-white/45">
                      {t.hours}
                    </span>
                    {settings.hours.map((h) => (
                      <span key={h.id} className="block">
                        {h.days} · <span dir="ltr">{h.time}</span>
                      </span>
                    ))}
                    {settings.hoursNote && (
                      <span className="mt-2 block text-sm text-white/50">{settings.hoursNote}</span>
                    )}
                  </span>
                </li>
              )}
            </ul>
          </Reveal>
          <Reveal delay={0.15} className="flex-1">
            <MapEmbed
              query={settings.mapQuery || settings.address || 'Menzel Bourguiba'}
              title={t.directions}
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
