import type { Payload } from 'payload'

import {
  centrePage,
  obsoleteServiceSlugs,
  faqs,
  home,
  legalPage,
  navigation,
  posts,
  services,
  settings,
  team,
} from './data'
import { richText } from './richtext'

type WithId = { id?: string | null }

/** Copy row ids from the French version so Arabic updates target the same rows. */
const withIds = <T extends object>(rows: T[], saved: WithId[] | null | undefined) =>
  rows.map((row, i) => ({ ...row, id: saved?.[i]?.id ?? undefined }))

/**
 * Idempotent seed: creates or updates every document by slug, in French then Arabic.
 * Run with `pnpm seed`.
 */
export async function seed(payload: Payload) {
  const log = (msg: string) => payload.logger.info(`[seed] ${msg}`)

  // ---- Services -------------------------------------------------------------
  const serviceIds: Record<string, number | string> = {}
  for (const s of services) {
    const existing = await payload.find({
      collection: 'services',
      where: { slug: { equals: s.slug } },
      limit: 1,
    })
    const fr = {
      title: s.title.fr,
      shortName: s.shortName.fr,
      tagline: s.tagline.fr,
      excerpt: s.excerpt.fr,
      description: richText(s.description.fr),
      highlights: s.highlights.fr.map((text) => ({ text })),
      indications: s.indications.fr.map((text) => ({ text })),
      duration: s.duration.fr,
      fasting: s.fasting.fr,
      preparation: s.preparation.fr.map((text) => ({ text })),
      slug: s.slug,
      visual: s.visual,
      order: s.order,
      featured: s.featured,
    }
    const doc = existing.docs[0]
      ? await payload.update({
          collection: 'services',
          id: existing.docs[0].id,
          data: fr,
          locale: 'fr',
        })
      : await payload.create({ collection: 'services', data: fr, locale: 'fr' })

    await payload.update({
      collection: 'services',
      id: doc.id,
      locale: 'ar',
      data: {
        title: s.title.ar,
        shortName: s.shortName.ar,
        tagline: s.tagline.ar,
        excerpt: s.excerpt.ar,
        description: richText(s.description.ar, 'rtl'),
        highlights: s.highlights.ar.map((text) => ({ text })),
        indications: s.indications.ar.map((text) => ({ text })),
        duration: s.duration.ar,
        fasting: s.fasting.ar,
        preparation: s.preparation.ar.map((text) => ({ text })),
      },
    })
    serviceIds[s.slug] = doc.id
  }
  const removed = await payload.delete({
    collection: 'services',
    where: { slug: { in: obsoleteServiceSlugs } },
  })
  log(`${services.length} services (${removed.docs.length} obsolete removed)`)

  // ---- FAQs -----------------------------------------------------------------
  for (const [i, f] of faqs.entries()) {
    const existing = await payload.find({
      collection: 'faqs',
      where: { question: { equals: f.q.fr } },
      locale: 'fr',
      limit: 1,
    })
    const data = { question: f.q.fr, answer: f.a.fr, category: f.category, order: i + 1 }
    const doc = existing.docs[0]
      ? await payload.update({ collection: 'faqs', id: existing.docs[0].id, data, locale: 'fr' })
      : await payload.create({ collection: 'faqs', data, locale: 'fr' })
    await payload.update({
      collection: 'faqs',
      id: doc.id,
      locale: 'ar',
      data: { question: f.q.ar, answer: f.a.ar },
    })
  }
  log(`${faqs.length} FAQs`)

  // ---- Team -----------------------------------------------------------------
  for (const m of team) {
    const existing = await payload.find({
      collection: 'team',
      where: { name: { equals: m.fr.name } },
      locale: 'fr',
      limit: 1,
    })
    const data = { ...m.fr, isLead: m.isLead, order: m.order }
    const doc = existing.docs[0]
      ? await payload.update({ collection: 'team', id: existing.docs[0].id, data, locale: 'fr' })
      : await payload.create({ collection: 'team', data, locale: 'fr' })
    await payload.update({ collection: 'team', id: doc.id, locale: 'ar', data: m.ar })
  }
  log(`${team.length} team members`)

  // ---- Posts ----------------------------------------------------------------
  for (const p of posts) {
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: p.slug } },
      limit: 1,
      draft: true,
    })
    const data = {
      title: p.title.fr,
      excerpt: p.excerpt.fr,
      content: richText(p.body.fr),
      slug: p.slug,
      publishedAt: p.date,
      _status: 'published' as const,
    }
    const doc = existing.docs[0]
      ? await payload.update({ collection: 'posts', id: existing.docs[0].id, data, locale: 'fr' })
      : await payload.create({ collection: 'posts', data, locale: 'fr' })
    await payload.update({
      collection: 'posts',
      id: doc.id,
      locale: 'ar',
      data: {
        title: p.title.ar,
        excerpt: p.excerpt.ar,
        content: richText(p.body.ar, 'rtl'),
        _status: 'published',
      },
    })
  }
  log(`${posts.length} posts`)

  // ---- Simple content pages ------------------------------------------------
  for (const pageData of [centrePage, legalPage]) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: pageData.slug } },
      limit: 1,
      draft: true,
    })
    const frData = {
      title: pageData.fr.title,
      intro: pageData.fr.intro,
      slug: pageData.slug,
      layout: [{ blockType: 'content' as const, body: richText(pageData.fr.body) }],
      _status: 'published' as const,
    }
    const doc = existing.docs[0]
      ? await payload.update({
          collection: 'pages',
          id: existing.docs[0].id,
          data: frData,
          locale: 'fr',
        })
      : await payload.create({ collection: 'pages', data: frData, locale: 'fr' })
    await payload.update({
      collection: 'pages',
      id: doc.id,
      locale: 'ar',
      data: {
        title: pageData.ar.title,
        intro: pageData.ar.intro,
        layout: [
          {
            id: doc.layout?.[0]?.id,
            blockType: 'content',
            body: richText(pageData.ar.body, 'rtl'),
          },
        ],
        _status: 'published',
      },
    })
  }
  log('content pages')

  // ---- Globals --------------------------------------------------------------
  const s = await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'fr',
    data: {
      siteName: settings.fr.siteName,
      tagline: settings.fr.tagline,
      seoDescription: settings.fr.seoDescription,
      address: settings.fr.address,
      phoneOffice: settings.phoneOffice,
      phoneMobile: settings.phoneMobile,
      whatsapp: settings.whatsapp,
      email: settings.email,
      mapQuery: settings.mapQuery,
      facebook: settings.facebook,
      hours: settings.fr.hours,
      hoursNote: settings.fr.hoursNote,
    },
  })
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'ar',
    data: {
      siteName: settings.ar.siteName,
      tagline: settings.ar.tagline,
      seoDescription: settings.ar.seoDescription,
      address: settings.ar.address,
      hours: withIds(settings.ar.hours, s.hours),
      hoursNote: settings.ar.hoursNote,
    },
  })

  const nav = await payload.updateGlobal({
    slug: 'navigation',
    locale: 'fr',
    data: {
      header: navigation.header.map((l) => ({ href: l.href, label: l.fr })),
      footer: navigation.footer.map((l) => ({ href: l.href, label: l.fr })),
    },
  })
  await payload.updateGlobal({
    slug: 'navigation',
    locale: 'ar',
    data: {
      header: withIds(
        navigation.header.map((l) => ({ href: l.href, label: l.ar })),
        nav.header,
      ),
      footer: withIds(
        navigation.footer.map((l) => ({ href: l.href, label: l.ar })),
        nav.footer,
      ),
    },
  })

  const h = await payload.updateGlobal({
    slug: 'home-page',
    locale: 'fr',
    data: {
      hero: home.fr.hero,
      stats: { items: home.fr.stats },
      services: home.fr.services,
      xray: home.fr.xray,
      why: { title: home.fr.why.title, items: home.fr.why.items as never },
      journey: home.fr.journey,
      cta: home.fr.cta,
    },
  })
  await payload.updateGlobal({
    slug: 'home-page',
    locale: 'ar',
    data: {
      hero: home.ar.hero,
      stats: { items: withIds(home.ar.stats, h.stats?.items) },
      services: home.ar.services,
      xray: home.ar.xray,
      why: { title: home.ar.why.title, items: withIds(home.ar.why.items, h.why?.items) as never },
      journey: {
        title: home.ar.journey.title,
        steps: withIds(home.ar.journey.steps, h.journey?.steps),
      },
      cta: home.ar.cta,
    },
  })
  log('globals')

  // ---- Optional first admin -------------------------------------------------
  const email = process.env.SEED_ADMIN_EMAIL
  const password = process.env.SEED_ADMIN_PASSWORD
  if (email && password) {
    const users = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1,
    })
    if (!users.docs.length) {
      await payload.create({ collection: 'users', data: { email, password, name: 'Admin' } })
      log(`admin user ${email}`)
    }
  }

  log('done ✔')
}
