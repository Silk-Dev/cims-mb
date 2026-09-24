import type { Block } from 'payload'

const L = (fr: string, ar: string, en: string) => ({ fr, ar, en })

export const ContentBlock: Block = {
  slug: 'content',
  labels: {
    singular: L('Texte riche', 'نص منسق', 'Rich text'),
    plural: L('Textes', 'نصوص', 'Rich text'),
  },
  fields: [
    { name: 'heading', type: 'text', localized: true, label: L('Titre', 'العنوان', 'Heading') },
    { name: 'body', type: 'richText', localized: true, label: L('Contenu', 'المحتوى', 'Body') },
  ],
}

export const ImageTextBlock: Block = {
  slug: 'imageText',
  labels: {
    singular: L('Image + texte', 'صورة ونص', 'Image + text'),
    plural: L('Images + texte', 'صور ونصوص', 'Image + text'),
  },
  fields: [
    { name: 'heading', type: 'text', localized: true, label: L('Titre', 'العنوان', 'Heading') },
    { name: 'body', type: 'richText', localized: true, label: L('Contenu', 'المحتوى', 'Body') },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: L('Image', 'صورة', 'Image'),
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'end',
      options: [
        { label: L('Début', 'البداية', 'Start'), value: 'start' },
        { label: L('Fin', 'النهاية', 'End'), value: 'end' },
      ],
      label: L('Position de l’image', 'موضع الصورة', 'Image position'),
    },
  ],
}

export const CtaBlock: Block = {
  slug: 'cta',
  labels: {
    singular: L('Appel à l’action', 'دعوة لاتخاذ إجراء', 'Call to action'),
    plural: L('Appels à l’action', 'دعوات', 'CTAs'),
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      label: L('Titre', 'العنوان', 'Heading'),
    },
    { name: 'text', type: 'textarea', localized: true, label: L('Texte', 'النص', 'Text') },
    {
      name: 'buttonLabel',
      type: 'text',
      localized: true,
      label: L('Libellé du bouton', 'نص الزر', 'Button label'),
    },
    {
      name: 'buttonHref',
      type: 'text',
      defaultValue: '/contact',
      label: L('Lien (ex. /contact)', 'الرابط (مثال /contact)', 'Link (e.g. /contact)'),
    },
  ],
}

export const ServicesGridBlock: Block = {
  slug: 'servicesGrid',
  labels: {
    singular: L('Grille des examens', 'شبكة الفحوصات', 'Services grid'),
    plural: L('Grilles des examens', 'شبكات', 'Services grids'),
  },
  fields: [
    { name: 'heading', type: 'text', localized: true, label: L('Titre', 'العنوان', 'Heading') },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: L('Examens (vide = tous)', 'الفحوصات (فارغ = الكل)', 'Services (empty = all)'),
    },
  ],
}

export const FaqBlock: Block = {
  slug: 'faq',
  labels: { singular: L('FAQ', 'أسئلة شائعة', 'FAQ'), plural: L('FAQ', 'أسئلة شائعة', 'FAQ') },
  fields: [
    { name: 'heading', type: 'text', localized: true, label: L('Titre', 'العنوان', 'Heading') },
    {
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
      label: L('Questions (vide = toutes)', 'الأسئلة (فارغ = الكل)', 'Questions (empty = all)'),
    },
  ],
}

export const StatsBlock: Block = {
  slug: 'stats',
  labels: {
    singular: L('Chiffres clés', 'أرقام', 'Stats'),
    plural: L('Chiffres clés', 'أرقام', 'Stats'),
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'value', type: 'number', required: true, label: L('Valeur', 'القيمة', 'Value') },
        { name: 'suffix', type: 'text', label: L('Suffixe', 'لاحقة', 'Suffix') },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          label: L('Libellé', 'التسمية', 'Label'),
        },
      ],
    },
  ],
}

export const pageBlocks = [
  ContentBlock,
  ImageTextBlock,
  ServicesGridBlock,
  StatsBlock,
  FaqBlock,
  CtaBlock,
]
