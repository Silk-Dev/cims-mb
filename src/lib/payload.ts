import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { Locale } from './i18n'

export const getPayloadClient = cache(() => getPayload({ config }))

export const getSettings = cache(async (locale: Locale) => {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings', locale, depth: 1 })
  return { ...settings, siteName: settings.siteName || 'CIMS Radiologie' }
})

export const getNavigation = cache(async (locale: Locale) => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'navigation', locale })
})

export const getHome = cache(async (locale: Locale) => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'home-page', locale })
})

export const getServices = cache(async (locale: Locale) => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'services',
    locale,
    sort: 'order',
    limit: 50,
    depth: 1,
  })
  return res.docs
})

export const getService = cache(async (locale: Locale, slug: string) => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'services',
    locale,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  return res.docs[0] ?? null
})

export const getFaqs = cache(async (locale: Locale) => {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'faqs', locale, sort: 'order', limit: 100 })
  return res.docs
})

export const getTeam = cache(async (locale: Locale) => {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'team', locale, sort: 'order', limit: 50, depth: 1 })
  return res.docs
})

export const getPosts = cache(async (locale: Locale, limit = 24) => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'posts',
    locale,
    sort: '-publishedAt',
    limit,
    depth: 1,
    where: { _status: { equals: 'published' } },
  })
  return res.docs
})

export const getPost = cache(async (locale: Locale, slug: string) => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'posts',
    locale,
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    limit: 1,
    depth: 1,
  })
  return res.docs[0] ?? null
})

export const getPage = cache(async (locale: Locale, slug: string) => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'pages',
    locale,
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    limit: 1,
    depth: 2,
  })
  return res.docs[0] ?? null
})
