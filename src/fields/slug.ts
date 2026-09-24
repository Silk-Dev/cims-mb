import type { Field } from 'payload'

const toSlug = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** URL slug, shared by both languages; auto-generated from the French title when empty. */
export const slugField = (source = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  label: { fr: 'Slug (URL)', ar: 'الرابط (URL)', en: 'Slug' },
  admin: {
    position: 'sidebar',
    description: {
      fr: 'Partie de l’adresse web, identique en français et en arabe. Généré automatiquement.',
      ar: 'جزء من عنوان الصفحة، مشترك بين اللغتين. يتم إنشاؤه تلقائياً.',
      en: 'URL segment shared by both languages. Auto-generated.',
    },
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === 'string' && value.length > 0) return toSlug(value)
        const src = data?.[source]
        if (typeof src === 'string') return toSlug(src)
        return value
      },
    ],
  },
})
