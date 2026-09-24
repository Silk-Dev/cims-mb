import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: { fr: 'Média', ar: 'وسائط', en: 'Media' },
    plural: { fr: 'Médias', ar: 'الوسائط', en: 'Media' },
  },
  admin: {
    group: { fr: 'Administration', ar: 'الإدارة', en: 'Admin' },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Texte alternatif', ar: 'نص بديل', en: 'Alt text' },
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumbnail', width: 480 },
      { name: 'card', width: 900 },
      { name: 'hero', width: 1920 },
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
  },
}
