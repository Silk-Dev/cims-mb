import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Blocks } from '@/components/Blocks'
import { ClockIcon, featureIcons, MailIcon, PhoneIcon, PinIcon } from '@/components/Icons'
import { MapEmbed } from '@/components/MapEmbed'
import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { ServiceVisual } from '@/components/ServiceVisual'
import { getDictionary } from '@/lib/dictionary'
import { isLocale, localizeHref, telHref } from '@/lib/i18n'
import { getFaqs, getHome, getPage, getServices, getSettings, getTeam } from '@/lib/payload'
import type { Media } from '@/payload-types'

type Params = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getDictionary(locale)
  return { title: t.centre.eyebrow, description: t.centre.intro }
}

export default async function CentrePage({ params }: Params) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  const [page, team, services, settings, home, faqs] = await Promise.all([
    getPage(locale, 'centre'),
    getTeam(locale),
    getServices(locale),
    getSettings(locale),
    getHome(locale),
    getFaqs(locale),
  ])

  return (
    <>
      <PageHeader
        eyebrow={t.centre.eyebrow}
        title={page?.title || t.centre.title}
        intro={page?.intro || t.centre.intro}
      />

      {page?.layout?.length ? (
        <Blocks blocks={page.layout} locale={locale} t={t} allServices={services} allFaqs={faqs} />
      ) : null}

      {!!team.length && (
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading eyebrow={t.centre.eyebrow} title={t.centre.team} />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {team.map((m, i) => {
              const photo = typeof m.photo === 'object' ? (m.photo as Media | null) : null
              return (
                <Reveal key={m.id} delay={i * 0.08}>
                  <article className="flex h-full flex-col gap-6 rounded-[2rem] border border-line bg-white p-6 sm:flex-row sm:p-8">
                    <div className="relative aspect-square w-full shrink-0 self-start overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-navy-900 to-blue-600 sm:w-44">
                      {photo?.url ? (
                        <Image
                          src={photo.url}
                          alt={photo.alt || m.name}
                          fill
                          className="object-cover"
                          sizes="200px"
                        />
                      ) : (
                        <>
                          <div className="bg-grid absolute inset-0 opacity-60" />
                          <ServiceVisual
                            kind="mri"
                            className="absolute inset-0 m-auto h-3/4 w-3/4 opacity-80"
                          />
                        </>
                      )}
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-navy-900">{m.name}</h3>
                      {m.role && <p className="mt-1 font-medium text-blue-500">{m.role}</p>}
                      {m.bio && <p className="mt-4 leading-relaxed text-muted">{m.bio}</p>}
                    </div>
                  </article>
                </Reveal>
              )
            })}
            <Reveal delay={0.1}>
              <div className="relative flex h-full min-h-64 items-center justify-center overflow-hidden rounded-[2rem] border border-line bg-white p-8">
                <Image
                  src="/brand/logo-full.jpg"
                  alt="CIMS Radiologie"
                  width={1754}
                  height={1241}
                  className="h-auto w-full max-w-md"
                  sizes="(min-width: 1024px) 40vw, 90vw"
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="bg-ice py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading title={t.centre.platform} />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={(i % 5) * 0.05}>
                <Link
                  href={localizeHref(`/services/${s.slug}`, locale)}
                  className="group flex h-full flex-col items-center gap-4 rounded-[1.5rem] border border-line bg-white p-5 text-center transition hover:-translate-y-1 hover:border-cyan-300"
                >
                  <span className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 to-blue-600">
                    <ServiceVisual
                      kind={s.visual}
                      className="absolute inset-0 m-auto h-4/5 w-4/5"
                    />
                  </span>
                  <span className="text-sm font-semibold text-navy-900 group-hover:text-blue-500">
                    {s.shortName || s.title}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {!!home.why?.items?.length && (
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading title={t.centre.values} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {home.why.items.map((item, i) => {
              const Icon =
                featureIcons[(item.icon as keyof typeof featureIcons) ?? 'shield'] ??
                featureIcons.shield
              return (
                <Reveal key={item.id ?? i} delay={i * 0.06}>
                  <div className="h-full rounded-[1.75rem] border border-line p-7">
                    <Icon width={26} height={26} className="text-blue-500" />
                    <h3 className="mt-5 font-display text-lg font-bold text-navy-900">
                      {item.title}
                    </h3>
                    {item.text && <p className="mt-2 text-muted">{item.text}</p>}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <SectionHeading title={t.centre.visit} />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.5fr]">
          <Reveal>
            <ul className="flex h-full flex-col gap-6 rounded-[2rem] bg-navy-950 p-8 text-white/80">
              {settings.address && (
                <li className="flex gap-4">
                  <PinIcon className="mt-1 shrink-0 text-cyan-300" />
                  <span className="whitespace-pre-line">{settings.address}</span>
                </li>
              )}
              {[settings.phoneOffice, settings.phoneMobile].filter(Boolean).map((p) => (
                <li key={p} className="flex gap-4">
                  <PhoneIcon className="shrink-0 text-cyan-300" />
                  <a href={telHref(p)} dir="ltr" className="hover:text-cyan-300">
                    {p}
                  </a>
                </li>
              ))}
              {settings.email && (
                <li className="flex gap-4">
                  <MailIcon className="shrink-0 text-cyan-300" />
                  <a href={`mailto:${settings.email}`} className="break-all hover:text-cyan-300">
                    {settings.email}
                  </a>
                </li>
              )}
              {!!settings.hours?.length && (
                <li className="flex gap-4">
                  <ClockIcon className="mt-1 shrink-0 text-cyan-300" />
                  <span>
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
          <Reveal delay={0.1}>
            <MapEmbed
              query={settings.mapQuery || settings.address || 'Menzel Bourguiba'}
              title={t.centre.visit}
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
