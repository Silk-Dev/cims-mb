import type { MetadataRoute } from 'next'

import { locales } from '@/lib/i18n'
import { getPayloadClient } from '@/lib/payload'
import { siteUrl } from '@/lib/site'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl()
  const payload = await getPayloadClient()
  const [services, posts, pages] = await Promise.all([
    payload.find({
      collection: 'services',
      limit: 100,
      depth: 0,
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'posts',
      limit: 500,
      depth: 0,
      where: { _status: { equals: 'published' } },
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'pages',
      limit: 100,
      depth: 0,
      where: { _status: { equals: 'published' } },
      select: { slug: true, updatedAt: true },
    }),
  ])
  const staticPaths = ['', '/services', '/centre', '/patients', '/actualites', '/contact']
  const dynamic = [
    ...services.docs.map((d) => ({ path: `/services/${d.slug}`, updatedAt: d.updatedAt })),
    ...posts.docs.map((d) => ({ path: `/actualites/${d.slug}`, updatedAt: d.updatedAt })),
    ...pages.docs
      .filter((d) => !['centre', 'patients'].includes(d.slug))
      .map((d) => ({ path: `/${d.slug}`, updatedAt: d.updatedAt })),
  ]
  return [
    ...staticPaths.map((path) => ({ path, updatedAt: undefined as string | undefined })),
    ...dynamic,
  ].flatMap(({ path, updatedAt }) =>
    locales.map((l) => ({
      url: `${base}/${l}${path}`,
      lastModified: updatedAt ? new Date(updatedAt) : undefined,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${base}/${x}${path}`])) },
    })),
  )
}
