import type { CollectionConfig } from 'payload'

import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: {
    singular: { fr: 'Question fréquente', ar: 'سؤال شائع', en: 'FAQ' },
    plural: { fr: 'Questions fréquentes', ar: 'الأسئلة الشائعة', en: 'FAQs' },
  },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order'],
    group: { fr: 'Contenu', ar: 'المحتوى', en: 'Content' },
  },
  access: { read: () => true },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  defaultSort: 'order',
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Question', ar: 'السؤال', en: 'Question' },
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      localized: true,
      label: { fr: 'Réponse', ar: 'الجواب', en: 'Answer' },
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'general',
      options: [
        { label: { fr: 'Général', ar: 'عام', en: 'General' }, value: 'general' },
        { label: { fr: 'Préparation', ar: 'التحضير', en: 'Preparation' }, value: 'preparation' },
        { label: { fr: 'Rendez-vous', ar: 'المواعيد', en: 'Appointments' }, value: 'appointments' },
      ],
      label: { fr: 'Catégorie', ar: 'الفئة', en: 'Category' },
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: { fr: 'Ordre', ar: 'الترتيب', en: 'Order' },
      admin: { position: 'sidebar' },
    },
  ],
}
