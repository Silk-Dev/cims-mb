import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CtaBanner } from '@/components/CtaBanner'
import { PageHeader } from '@/components/PageHeader'
import { ServiceCard } from '@/components/ServiceCard'
import { getDictionary } from '@/lib/dictionary'
import { isLocale, localizeHref, telHref } from '@/lib/i18n'
import { getServices, getSettings } from '@/lib/payload'

type Params = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getDictionary(locale)
  return { title: t.services.title, description: t.services.intro }
}

export default async function ServicesPage({ params }: Params) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  const [services, settings] = await Promise.all([getServices(locale), getSettings(locale)])
  const phone = settings.phoneOffice

  return (
    <>
      <PageHeader eyebrow={settings.siteName} title={t.services.title} intro={t.services.intro} />
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
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
      <CtaBanner
        title={t.contactPage.title}
        text={t.contactPage.intro}
        bookLabel={t.book}
        bookHref={localizeHref('/contact', locale)}
        phone={phone ? { label: phone, href: telHref(phone)! } : undefined}
      />
    </>
  )
}
