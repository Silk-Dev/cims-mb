import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ArrowIcon } from '@/components/Icons'
import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/Reveal'
import { getDictionary } from '@/lib/dictionary'
import { formatDate } from '@/lib/format'
import { isLocale, localizeHref } from '@/lib/i18n'
import { getPosts } from '@/lib/payload'
import type { Media } from '@/payload-types'

type Params = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const t = getDictionary(locale)
  return { title: t.news.title, description: t.news.intro }
}

export default async function NewsPage({ params }: Params) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  const posts = await getPosts(locale)

  return (
    <>
      <PageHeader eyebrow={t.news.eyebrow} title={t.news.title} intro={t.news.intro} />
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        {!posts.length && <p className="text-muted">{t.news.empty}</p>}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => {
            const cover = typeof p.cover === 'object' ? (p.cover as Media | null) : null
            return (
              <Reveal key={p.id} delay={(i % 3) * 0.08}>
                <Link
                  href={localizeHref(`/actualites/${p.slug}`, locale)}
                  className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-white transition hover:shadow-[0_30px_60px_-30px_rgba(16,42,85,0.45)]"
                >
                  <div className="noise relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-blue-600">
                    {cover?.url ? (
                      <Image
                        src={cover.url}
                        alt={cover.alt}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                        sizes="(min-width: 1024px) 33vw, 100vw"
                      />
                    ) : (
                      <>
                        <div className="bg-grid absolute inset-0 opacity-60" />
                        <span
                          className="absolute bottom-5 start-6 font-display text-6xl font-extrabold text-white/10"
                          dir="ltr"
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <time className="text-xs font-semibold uppercase tracking-widest text-blue-500">
                      {formatDate(p.publishedAt, locale)}
                    </time>
                    <h2 className="mt-3 font-display text-xl font-bold leading-snug text-navy-900">
                      {p.title}
                    </h2>
                    {p.excerpt && <p className="mt-3 line-clamp-3 text-muted">{p.excerpt}</p>}
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-navy-800">
                      {t.news.read}
                      <ArrowIcon
                        width={16}
                        height={16}
                        className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>
    </>
  )
}
