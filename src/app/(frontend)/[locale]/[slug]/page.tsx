import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Blocks } from '@/components/Blocks'
import { PageHeader } from '@/components/PageHeader'
import { getDictionary } from '@/lib/dictionary'
import { isLocale } from '@/lib/i18n'
import { getFaqs, getPage, getServices } from '@/lib/payload'

// Rendered on first request, then cached and revalidated (see `revalidate` in the layout).
export function generateStaticParams() {
  return []
}

type Params = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const page = await getPage(locale, slug)
  if (!page) return {}
  return { title: page.title, description: page.metaDescription || page.intro || undefined }
}

/** Generic CMS page built from blocks (e.g. /fr/mentions-legales). */
export default async function CmsPage({ params }: Params) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const page = await getPage(locale, slug)
  if (!page) notFound()
  const t = getDictionary(locale)
  const [services, faqs] = await Promise.all([getServices(locale), getFaqs(locale)])

  return (
    <>
      <PageHeader title={page.title} intro={page.intro} />
      <div className="py-10">
        <Blocks
          blocks={page.layout ?? []}
          locale={locale}
          t={t}
          allServices={services}
          allFaqs={faqs}
        />
      </div>
    </>
  )
}
