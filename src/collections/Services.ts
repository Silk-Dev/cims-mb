import type { CollectionConfig } from 'payload'

import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

import { slugField } from '../fields/slug'

export const serviceVisuals = [
  { label: 'Scanner (CT)', value: 'ct' },
  { label: 'IRM', value: 'mri' },
  { label: 'Échographie', value: 'ultrasound' },
  { label: 'Doppler', value: 'doppler' },
  { label: 'Mammographie', value: 'mammo' },
  { label: 'Ostéodensitométrie', value: 'dexa' },
  { label: 'Radiologie générale', value: 'xray' },
  { label: 'Radiologie dentaire', value: 'dental' },
  { label: 'Interventionnelle', value: 'interventional' },
] as const

export type ServiceVisual = (typeof serviceVisuals)[number]['value']

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: { fr: 'Examen / Service', ar: 'فحص / خدمة', en: 'Service' },
    plural: { fr: 'Examens & Services', ar: 'الفحوصات والخدمات', en: 'Services' },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'shortName', 'order', 'updatedAt'],
    group: { fr: 'Contenu', ar: 'المحتوى', en: 'Content' },
  },
  access: { read: () => true },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  defaultSort: 'order',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: { fr: 'Titre', ar: 'العنوان', en: 'Title' },
        },
        {
          name: 'shortName',
          type: 'text',
          localized: true,
          label: { fr: 'Nom court (menu, badges)', ar: 'اسم مختصر', en: 'Short name' },
        },
      ],
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      label: { fr: 'Accroche', ar: 'شعار قصير', en: 'Tagline' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      required: true,
      label: { fr: 'Résumé', ar: 'ملخص', en: 'Excerpt' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: { fr: 'Description', ar: 'الوصف', en: 'Description' },
          fields: [
            {
              name: 'description',
              type: 'richText',
              localized: true,
              label: { fr: 'Description détaillée', ar: 'وصف مفصل', en: 'Description' },
            },
            {
              name: 'highlights',
              type: 'array',
              localized: true,
              label: { fr: 'Points forts', ar: 'نقاط القوة', en: 'Highlights' },
              fields: [{ name: 'text', type: 'text', required: true }],
            },
            {
              name: 'indications',
              type: 'array',
              localized: true,
              label: { fr: 'Indications courantes', ar: 'دواعي الاستعمال', en: 'Indications' },
              fields: [{ name: 'text', type: 'text', required: true }],
            },
          ],
        },
        {
          label: { fr: 'Préparation', ar: 'التحضير', en: 'Preparation' },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'duration',
                  type: 'text',
                  localized: true,
                  label: { fr: 'Durée indicative', ar: 'المدة التقريبية', en: 'Duration' },
                },
                {
                  name: 'fasting',
                  type: 'text',
                  localized: true,
                  label: { fr: 'Jeûne', ar: 'الصيام', en: 'Fasting' },
                },
              ],
            },
            {
              name: 'preparation',
              type: 'array',
              localized: true,
              label: {
                fr: 'Consignes de préparation',
                ar: 'تعليمات التحضير',
                en: 'Preparation steps',
              },
              fields: [{ name: 'text', type: 'text', required: true }],
            },
          ],
        },
      ],
    },
    slugField(),
    {
      name: 'visual',
      type: 'select',
      required: true,
      defaultValue: 'xray',
      options: serviceVisuals.map((v) => ({ ...v })),
      label: { fr: 'Animation', ar: 'الرسم المتحرك', en: 'Visual' },
      admin: {
        position: 'sidebar',
        description: {
          fr: 'Illustration animée affichée sur le site.',
          ar: 'الرسم المتحرك المعروض في الموقع.',
          en: 'Animated illustration shown on the site.',
        },
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: { fr: 'Photo (optionnelle)', ar: 'صورة (اختيارية)', en: 'Image' },
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: { fr: 'Ordre', ar: 'الترتيب', en: 'Order' },
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: true,
      label: { fr: 'Afficher sur l’accueil', ar: 'عرض في الصفحة الرئيسية', en: 'Show on home' },
      admin: { position: 'sidebar' },
    },
  ],
}
