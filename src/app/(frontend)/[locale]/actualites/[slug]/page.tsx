import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ArrowIcon } from '@/components/Icons'
import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/Reveal'
import { RichText } from '@/components/RichText'
import { getDictionary } from '@/lib/dictionary'
import { formatDate } from '@/lib/format'
import { isLocale, localizeHref } from '@/lib/i18n'
import { getPost } from '@/lib/payload'
import type { Media } from '@/payload-types'

// Rendered on first request, then cached and revalidated (see `revalidate` in the layout).
export function generateStaticParams() {
  return []
}

type Params = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const post = await getPost(locale, slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt ?? undefined }
}

export default async function PostPage({ params }: Params) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  const post = await getPost(locale, slug)
  if (!post) notFound()
  const cover = typeof post.cover === 'object' ? (post.cover as Media | null) : null

  return (
    <>
      <PageHeader
        eyebrow={formatDate(post.publishedAt, locale)}
        title={post.title}
        intro={post.excerpt}
      />
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        {cover?.url && (
          <Reveal className="relative mb-12 aspect-[16/9] overflow-hidden rounded-[2rem]">
            <Image
              src={cover.url}
              alt={cover.alt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 768px, 100vw"
              priority
            />
          </Reveal>
        )}
        <Reveal>
          <RichText data={post.content} />
        </Reveal>
        <Link
          href={localizeHref('/actualites', locale)}
          className="mt-14 inline-flex items-center gap-2 font-semibold text-blue-500"
        >
          <ArrowIcon width={16} height={16} className="rotate-180" />
          {t.news.back}
        </Link>
      </article>
    </>
  )
}
