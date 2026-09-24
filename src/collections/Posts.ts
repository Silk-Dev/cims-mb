import type { CollectionConfig } from 'payload'

import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

import { slugField } from '../fields/slug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: { fr: 'Article', ar: 'مقال', en: 'Post' },
    plural: { fr: 'Actualités', ar: 'الأخبار', en: 'News' },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', '_status'],
    group: { fr: 'Contenu', ar: 'المحتوى', en: 'Content' },
  },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
  },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  versions: { drafts: true },
  defaultSort: '-publishedAt',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Titre', ar: 'العنوان', en: 'Title' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      label: { fr: 'Chapeau', ar: 'مقدمة', en: 'Excerpt' },
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      label: { fr: 'Image de couverture', ar: 'صورة الغلاف', en: 'Cover' },
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      label: { fr: 'Contenu', ar: 'المحتوى', en: 'Content' },
    },
    slugField(),
    {
      name: 'publishedAt',
      type: 'date',
      label: { fr: 'Date de publication', ar: 'تاريخ النشر', en: 'Published at' },
      admin: { position: 'sidebar' },
      hooks: {
        beforeChange: [
          ({ value, siblingData }) =>
            value || (siblingData._status === 'published' ? new Date() : value),
        ],
      },
    },
  ],
}
