import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CtaBanner } from '@/components/CtaBanner'
import { Hero } from '@/components/Hero'
import { ArrowIcon, featureIcons } from '@/components/Icons'
import { Journey } from '@/components/Journey'
import { Marquee } from '@/components/Marquee'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { ServiceCard } from '@/components/ServiceCard'
import { Stats } from '@/components/Stats'
import { XRayReveal } from '@/components/XRayReveal'
import { getDictionary } from '@/lib/dictionary'
import { isLocale, localizeHref, telHref } from '@/lib/i18n'
import { getHome, getServices, getSettings, getTeam } from '@/lib/payload'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  const [home, services, settings, team] = await Promise.all([
    getHome(locale),
    getServices(locale),
    getSettings(locale),
    getTeam(locale),
  ])
  const featured = services.filter((s) => s.featured)
  const lead = team.find((m) => m.isLead) ?? team[0]
  const phones = [settings.phoneOffice, settings.phoneMobile].filter((p): p is string => !!p)

  return (
    <>
      <Hero
        eyebrow={home.hero?.eyebrow}
        title={home.hero?.title || settings.siteName}
        highlight={home.hero?.highlight}
        subtitle={home.hero?.subtitle}
        primary={{
          label: home.hero?.primaryLabel || t.book,
          href: localizeHref('/contact', locale),
        }}
        secondary={{
          label: home.hero?.secondaryLabel || t.allServices,
          href: localizeHref('/services', locale),
        }}
        chips={services.map((s) => s.shortName || s.title)}
        phones={phones.map((p) => ({ label: p, href: telHref(p)! }))}
        scrollLabel={t.scroll}
      />

      <Marquee items={services.map((s) => s.shortName || s.title)} />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <Stats
          items={(home.stats?.items ?? []).map((s) => ({
            value: s.value,
            suffix: s.suffix,
            label: s.label,
          }))}
        />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow={home.services?.eyebrow}
            title={home.services?.title}
            text={home.services?.text}
          />
          <Reveal>
            <Link
              href={localizeHref('/services', locale)}
              className="group inline-flex items-center gap-2 font-semibold text-blue-500"
            >
              {t.allServices}
              <ArrowIcon className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <ServiceCard
              key={s.id}
              index={i}
              href={localizeHref(`/services/${s.slug}`, locale)}
              title={s.title}
              tagline={s.tagline}
              excerpt={s.excerpt}
              visual={s.visual}
              cta={t.viewService}
            />
          ))}
        </div>
      </section>

      <XRayReveal title={home.xray?.title} text={home.xray?.text} hint={home.xray?.hint} />

      {!!home.why?.items?.length && (
        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading title={home.why.title} />
              {lead && (
                <Reveal delay={0.1} className="mt-10">
                  <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-900 to-blue-600 p-8 text-white">
                    <div className="bg-grid absolute inset-0 opacity-50" />
                    <div className="relative flex items-center gap-5">
                      <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/10 font-display text-xl font-extrabold text-cyan-200 ring-1 ring-white/20">
                        {lead.name
                          .replace(/^(Dr\.?|الدكتور)\s*/i, '')
                          .split(' ')
                          .map((w) => w[0])
                          .join('')
                          .slice(0, 2)}
                      </span>
                      <div>
                        <p className="font-display text-xl font-bold">{lead.name}</p>
                        <p className="text-sm text-cyan-200/80">{lead.role}</p>
                      </div>
                    </div>
                    {lead.bio && (
                      <p className="relative mt-6 text-sm leading-relaxed text-white/70">
                        {lead.bio}
                      </p>
                    )}
                    <Link
                      href={localizeHref('/centre', locale)}
                      className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200"
                    >
                      {t.centre.eyebrow}
                      <ArrowIcon width={16} height={16} />
                    </Link>
                  </div>
                </Reveal>
              )}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {home.why.items.map((item, i) => {
                const Icon =
                  featureIcons[(item.icon as keyof typeof featureIcons) ?? 'shield'] ??
                  featureIcons.shield
                return (
                  <Reveal key={item.id ?? i} delay={i * 0.08}>
                    <div className="group h-full rounded-[1.75rem] border border-line bg-white p-7 transition duration-500 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-[0_24px_50px_-28px_rgba(16,42,85,0.4)]">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ice text-blue-500 transition group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-cyan-400 group-hover:text-white">
                        <Icon width={22} height={22} />
                      </span>
                      <h3 className="mt-6 font-display text-lg font-bold text-navy-900">
                        {item.title}
                      </h3>
                      {item.text && <p className="mt-2 leading-relaxed text-muted">{item.text}</p>}
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {!!home.journey?.steps?.length && (
        <Journey title={home.journey.title} steps={home.journey.steps} />
      )}

      <CtaBanner
        title={home.cta?.title}
        text={home.cta?.text}
        bookLabel={t.book}
        bookHref={localizeHref('/contact', locale)}
        phone={phones[0] ? { label: phones[0], href: telHref(phones[0])! } : undefined}
        whatsapp={
          settings.whatsapp
            ? { label: t.whatsapp, href: `https://wa.me/${settings.whatsapp.replace(/\D/g, '')}` }
            : undefined
        }
      />
    </>
  )
}
