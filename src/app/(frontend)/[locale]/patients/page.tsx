import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Blocks } from '@/components/Blocks'
import { CtaBanner } from '@/components/CtaBanner'
import { Faq } from '@/components/Faq'
import { ArrowIcon, CheckIcon, ClockIcon } from '@/components/Icons'
import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { ServiceVisual } from '@/components/ServiceVisual'
import { getDictionary } from '@/lib/dictionary'
import { isLocale, localizeHref, telHref } from '@/lib/i18n'
import { getFaqs, getPage, getServices, getSettings } from '@/lib/payload'

type Params = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getDictionary(locale)
  return { title: t.patients.title, description: t.patients.intro }
}

export default async function PatientsPage({ params }: Params) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  const [services, faqs, settings, page] = await Promise.all([
    getServices(locale),
    getFaqs(locale),
    getSettings(locale),
    getPage(locale, 'patients'),
  ])

  return (
    <>
      <PageHeader
        eyebrow={t.patients.eyebrow}
        title={page?.title || t.patients.title}
        intro={page?.intro || t.patients.intro}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <Reveal>
          <div className="grid gap-8 rounded-[2rem] border border-line bg-white p-8 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <h2 className="font-display text-3xl font-extrabold text-navy-900">
              {t.patients.bring}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {t.patients.bringList.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-ice p-4 font-medium text-navy-900"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
                    <CheckIcon width={14} height={14} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {page?.layout?.length ? (
        <Blocks blocks={page.layout} locale={locale} t={t} allServices={services} allFaqs={faqs} />
      ) : null}

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <SectionHeading title={t.patients.byExam} />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 2) * 0.06}>
              <article className="flex h-full flex-col rounded-[2rem] border border-line bg-white p-6 sm:p-7">
                <div className="flex items-center gap-4">
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 to-blue-600">
                    <ServiceVisual
                      kind={s.visual}
                      className="absolute inset-0 m-auto h-[85%] w-[85%]"
                    />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-navy-900">{s.title}</h3>
                    <p className="mt-0.5 flex flex-wrap gap-x-4 text-sm text-muted">
                      {s.duration && (
                        <span className="inline-flex items-center gap-1">
                          <ClockIcon width={14} height={14} /> {s.duration}
                        </span>
                      )}
                      {s.fasting && (
                        <span>
                          {t.fasting} : {s.fasting}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                {!!s.preparation?.length && (
                  <ul className="mt-5 space-y-2 text-[0.95rem] text-navy-800">
                    {s.preparation.map((p) => (
                      <li key={p.id} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                        {p.text}
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href={localizeHref(`/services/${s.slug}`, locale)}
                  className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-blue-500"
                >
                  {t.viewService}
                  <ArrowIcon width={16} height={16} />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">{t.preparationNote}</p>
      </section>

      {!!faqs.length && (
        <section className="bg-ice py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <SectionHeading title={t.patients.faq} align="center" />
            <div className="mt-12">
              <Faq
                items={faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))}
              />
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        title={t.contactPage.title}
        text={t.contactPage.intro}
        bookLabel={t.book}
        bookHref={localizeHref('/contact', locale)}
        phone={
          settings.phoneOffice
            ? { label: settings.phoneOffice, href: telHref(settings.phoneOffice)! }
            : undefined
        }
      />
    </>
  )
}
