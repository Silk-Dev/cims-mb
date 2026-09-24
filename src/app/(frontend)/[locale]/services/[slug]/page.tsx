import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ArrowIcon, CheckIcon, ClockIcon, PhoneIcon } from '@/components/Icons'
import { Reveal } from '@/components/Reveal'
import { RichText } from '@/components/RichText'
import { ServiceVisual } from '@/components/ServiceVisual'
import { getDictionary } from '@/lib/dictionary'
import { isLocale, localizeHref, telHref } from '@/lib/i18n'
import { getService, getServices, getSettings } from '@/lib/payload'

// Rendered on first request, then cached and revalidated (see `revalidate` in the layout).
export function generateStaticParams() {
  return []
}

type Params = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const service = await getService(locale, slug)
  if (!service) return {}
  return { title: service.title, description: service.excerpt }
}

export default async function ServicePage({ params }: Params) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  const [service, services, settings] = await Promise.all([
    getService(locale, slug),
    getServices(locale),
    getSettings(locale),
  ])
  if (!service) notFound()
  const others = services.filter((s) => s.id !== service.id)
  const phone = settings.phoneOffice

  return (
    <>
      <section className="noise relative isolate overflow-hidden bg-navy-950 pb-16 pt-36 text-white sm:pb-24 sm:pt-44">
        <div className="bg-grid absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="absolute -top-40 end-0 -z-10 h-[36rem] w-[36rem] rounded-full bg-blue-600/30 blur-[130px]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Reveal>
              <Link
                href={localizeHref('/services', locale)}
                className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300"
              >
                <ArrowIcon width={16} height={16} className="rotate-180" />
                {t.allServices}
              </Link>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
                {service.title}
              </h1>
            </Reveal>
            {service.tagline && (
              <Reveal delay={0.1}>
                <p className="mt-4 text-xl font-medium text-gradient">{service.tagline}</p>
              </Reveal>
            )}
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
                {service.excerpt}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap gap-3">
                {service.duration && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm">
                    <ClockIcon width={16} height={16} className="text-cyan-300" />
                    {t.duration} · {service.duration}
                  </span>
                )}
                {service.fasting && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    {t.fasting} · {service.fasting}
                  </span>
                )}
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="noise relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-navy-800 to-blue-600 shadow-[0_40px_80px_-30px_rgba(47,168,228,0.6)]">
              <div className="bg-grid absolute inset-0 opacity-60" />
              <ServiceVisual
                kind={service.visual}
                className="absolute inset-0 m-auto h-3/4 w-3/4"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Reveal>
            <RichText data={service.description} />
          </Reveal>

          {!!service.highlights?.length && (
            <Reveal className="mt-14">
              <h2 className="font-display text-2xl font-bold text-navy-900">{t.highlights}</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {service.highlights.map((h) => (
                  <li
                    key={h.id}
                    className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
                      <CheckIcon width={14} height={14} />
                    </span>
                    <span className="font-medium text-navy-900">{h.text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {!!service.indications?.length && (
            <Reveal className="mt-14">
              <h2 className="font-display text-2xl font-bold text-navy-900">{t.indications}</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {service.indications.map((i) => (
                  <span
                    key={i.id}
                    className="rounded-full bg-ice px-4 py-2 text-sm font-medium text-navy-800"
                  >
                    {i.text}
                  </span>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <div className="rounded-[2rem] border border-line bg-white p-7 shadow-[0_30px_60px_-40px_rgba(16,42,85,0.5)]">
              <h2 className="font-display text-xl font-bold text-navy-900">{t.preparation}</h2>
              {!!service.preparation?.length && (
                <ol className="mt-6 space-y-4">
                  {service.preparation.map((p, i) => (
                    <li key={p.id} className="flex gap-4">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ice font-display text-xs font-bold text-blue-500">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed text-navy-800">{p.text}</span>
                    </li>
                  ))}
                </ol>
              )}
              <p className="mt-6 rounded-2xl bg-ice p-4 text-sm text-muted">{t.preparationNote}</p>
              <Link
                href={`${localizeHref('/contact', locale)}?service=${service.id}`}
                className="mt-6 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 py-4 font-semibold text-white transition hover:brightness-110"
              >
                {t.bookThis}
                <ArrowIcon width={18} height={18} />
              </Link>
              {phone && (
                <a
                  href={telHref(phone)}
                  className="mt-3 flex items-center justify-center gap-2 rounded-full border border-line py-4 font-semibold text-navy-900"
                  dir="ltr"
                >
                  <PhoneIcon width={16} height={16} /> {phone}
                </a>
              )}
            </div>
          </Reveal>
        </aside>
      </section>

      {!!others.length && (
        <section className="border-t border-line bg-ice py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              {t.otherServices}
            </h2>
            <div className="mt-8 flex snap-x gap-4 overflow-x-auto pb-4" data-lenis-prevent>
              {others.map((s) => (
                <Link
                  key={s.id}
                  href={localizeHref(`/services/${s.slug}`, locale)}
                  className="group flex w-64 shrink-0 snap-start items-center gap-4 rounded-2xl border border-line bg-white p-3 transition hover:border-cyan-300"
                >
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-navy-900 to-blue-600">
                    <ServiceVisual
                      kind={s.visual}
                      className="absolute inset-0 m-auto h-[85%] w-[85%]"
                    />
                  </span>
                  <span className="font-semibold text-navy-900 group-hover:text-blue-500">
                    {s.shortName || s.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
