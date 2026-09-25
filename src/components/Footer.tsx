import Link from 'next/link'

import type { Dictionary } from '@/lib/dictionary'
import { type Locale, localizeHref, telHref } from '@/lib/i18n'
import type { Navigation, Service, SiteSetting } from '@/payload-types'

import { ClockIcon, FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon } from './Icons'
import { Logo } from './Logo'

type Props = {
  locale: Locale
  t: Dictionary
  settings: SiteSetting
  nav: Navigation
  services: Service[]
}

export function Footer({ locale, t, settings, nav, services }: Props) {
  const year = new Date().getFullYear()
  return (
    <footer className="noise relative overflow-hidden bg-navy-950 text-white/70">
      <div className="bg-grid absolute inset-0 opacity-50 [mask-image:linear-gradient(to_top,black,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Logo variant="light" line={t.brandLine} />
            {settings.tagline && (
              <p className="mt-6 max-w-sm text-sm leading-relaxed">{settings.tagline}</p>
            )}
            <div className="mt-6 flex gap-3">
              {settings.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition hover:border-cyan-300 hover:text-cyan-300"
                >
                  <FacebookIcon />
                </a>
              )}
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition hover:border-cyan-300 hover:text-cyan-300"
                >
                  <InstagramIcon />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-display text-sm font-bold uppercase tracking-[0.2em] text-white">
              {t.services.title}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    href={localizeHref(`/services/${s.slug}`, locale)}
                    className="transition hover:text-cyan-300"
                  >
                    {s.shortName || s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-display text-sm font-bold uppercase tracking-[0.2em] text-white">
              {t.links}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[...(nav.header ?? []), ...(nav.footer ?? [])].map((l, i) => (
                <li key={`${l.href}-${i}`}>
                  <Link
                    href={localizeHref(l.href, locale)}
                    className="transition hover:text-cyan-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-display text-sm font-bold uppercase tracking-[0.2em] text-white">
              {t.contact}
            </h3>
            <ul className="space-y-4 text-sm">
              {settings.address && (
                <li className="flex gap-3">
                  <PinIcon className="mt-0.5 shrink-0 text-cyan-300" />
                  <span className="whitespace-pre-line">{settings.address}</span>
                </li>
              )}
              {[settings.phoneOffice, settings.phoneMobile].filter(Boolean).map((p) => (
                <li key={p} className="flex gap-3">
                  <PhoneIcon className="shrink-0 text-cyan-300" />
                  <a href={telHref(p)} dir="ltr" className="transition hover:text-cyan-300">
                    {p}
                  </a>
                </li>
              ))}
              {settings.email && (
                <li className="flex gap-3">
                  <MailIcon className="shrink-0 text-cyan-300" />
                  <a
                    href={`mailto:${settings.email}`}
                    className="break-all transition hover:text-cyan-300"
                  >
                    {settings.email}
                  </a>
                </li>
              )}
              {!!settings.hours?.length && (
                <li className="flex gap-3">
                  <ClockIcon className="mt-0.5 shrink-0 text-cyan-300" />
                  <span>
                    {settings.hours.map((h) => (
                      <span key={h.id} className="block">
                        {h.days} · <span dir="ltr">{h.time}</span>
                      </span>
                    ))}
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div
          className="pointer-events-none mt-16 select-none text-center font-display text-[22vw] font-extrabold leading-none tracking-tighter text-white/[0.04] lg:text-[16rem]"
          dir="ltr"
          aria-hidden="true"
        >
          CIMS
        </div>

        <div className="mt-4 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row">
          <p>
            © {year} {settings.siteName}. {t.rights}
          </p>
          <p>{t.medicalNotice}</p>
        </div>
        <p className="mt-6 text-center text-xs text-white/40">
          {t.createdBy}{' '}
          <a
            href="https://creacom.tn"
            target="_blank"
            rel="noopener"
            className="font-semibold text-white/70 transition hover:text-cyan-300"
            dir="ltr"
          >
            Crea&apos;com
          </a>
        </p>
      </div>
    </footer>
  )
}
