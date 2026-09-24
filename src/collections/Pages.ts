import type { CollectionConfig } from 'payload'

import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

import { pageBlocks } from '../blocks'
import { slugField } from '../fields/slug'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: { fr: 'Page', ar: 'صفحة', en: 'Page' },
    plural: { fr: 'Pages libres', ar: 'صفحات حرة', en: 'Pages' },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    group: { fr: 'Contenu', ar: 'المحتوى', en: 'Content' },
    description: {
      fr: 'Pages supplémentaires construites avec des blocs (mentions légales, tarifs, partenaires…). Accessibles via /fr/<slug> et /ar/<slug>.',
      ar: 'صفحات إضافية مبنية بالكتل. متاحة عبر ‎/fr/<slug>‎ و ‎/ar/<slug>‎.',
      en: 'Extra block-built pages, served at /fr/<slug> and /ar/<slug>.',
    },
  },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
  },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  versions: { drafts: true },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Titre', ar: 'العنوان', en: 'Title' },
    },
    {
      name: 'intro',
      type: 'textarea',
      localized: true,
      label: { fr: 'Introduction', ar: 'مقدمة', en: 'Intro' },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: pageBlocks,
      label: { fr: 'Contenu de la page', ar: 'محتوى الصفحة', en: 'Layout' },
    },
    slugField(),
    {
      name: 'metaDescription',
      type: 'textarea',
      localized: true,
      label: { fr: 'Description SEO', ar: 'وصف SEO', en: 'SEO description' },
      admin: { position: 'sidebar' },
    },
  ],
}
