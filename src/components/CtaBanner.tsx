import Link from 'next/link'

import { ArrowIcon, PhoneIcon, WhatsAppIcon } from './Icons'
import { Reveal } from './Reveal'

type Props = {
  title?: string | null
  text?: string | null
  bookLabel: string
  bookHref: string
  phone?: { label: string; href: string }
  whatsapp?: { label: string; href: string }
}

export function CtaBanner({ title, text, bookLabel, bookHref, phone, whatsapp }: Props) {
  return (
    <section className="px-3 py-16 sm:px-6 sm:py-24">
      <Reveal>
        <div className="noise relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-navy-900 via-navy-800 to-blue-600 px-6 py-16 text-white sm:px-16 sm:py-24">
          <div className="bg-grid absolute inset-0 opacity-50" />
          <svg
            viewBox="0 0 400 400"
            className="absolute -bottom-40 -end-24 h-[34rem] w-[34rem] animate-spin-slow opacity-50"
            aria-hidden="true"
          >
            <circle
              cx="200"
              cy="200"
              r="170"
              fill="none"
              stroke="#6fd0f5"
              strokeWidth="30"
              strokeDasharray="820 250"
              strokeOpacity=".35"
            />
            <circle
              cx="200"
              cy="200"
              r="120"
              fill="none"
              stroke="#b5e6fb"
              strokeWidth="1.5"
              strokeDasharray="3 9"
            />
          </svg>
          <div className="relative max-w-2xl">
            {title && (
              <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                {title}
              </h2>
            )}
            {text && <p className="mt-5 text-lg text-white/70">{text}</p>}
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href={bookHref}
                className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 font-semibold text-navy-900 transition hover:bg-cyan-200"
              >
                {bookLabel}
                <ArrowIcon className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>
              {phone && (
                <a
                  href={phone.href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-4 font-semibold transition hover:bg-white/10"
                  dir="ltr"
                >
                  <PhoneIcon width={18} height={18} /> {phone.label}
                </a>
              )}
              {whatsapp && (
                <a
                  href={whatsapp.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-4 font-semibold transition hover:bg-white/10"
                >
                  <WhatsAppIcon width={18} height={18} /> {whatsapp.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
