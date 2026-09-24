import type { GlobalConfig } from 'payload'

import { revalidateGlobal } from '../hooks/revalidate'

const L = (fr: string, ar: string, en: string) => ({ fr, ar, en })

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: L('Page d’accueil', 'الصفحة الرئيسية', 'Home page'),
  admin: { group: L('Contenu', 'المحتوى', 'Content') },
  access: { read: () => true },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'hero',
          label: L('Bandeau principal', 'الواجهة', 'Hero'),
          fields: [
            {
              name: 'eyebrow',
              type: 'text',
              localized: true,
              label: L('Sur-titre', 'عنوان علوي', 'Eyebrow'),
            },
            {
              name: 'title',
              type: 'text',
              localized: true,
              required: true,
              label: L('Titre', 'العنوان', 'Title'),
            },
            {
              name: 'highlight',
              type: 'text',
              localized: true,
              label: L('Mot(s) en dégradé', 'كلمات مميزة', 'Highlight'),
            },
            {
              name: 'subtitle',
              type: 'textarea',
              localized: true,
              label: L('Sous-titre', 'العنوان الفرعي', 'Subtitle'),
            },
            {
              name: 'primaryLabel',
              type: 'text',
              localized: true,
              label: L('Bouton principal', 'الزر الرئيسي', 'Primary button'),
            },
            {
              name: 'secondaryLabel',
              type: 'text',
              localized: true,
              label: L('Bouton secondaire', 'الزر الثانوي', 'Secondary button'),
            },
          ],
        },
        {
          name: 'stats',
          label: L('Chiffres clés', 'أرقام', 'Stats'),
          fields: [
            {
              name: 'items',
              type: 'array',
              maxRows: 4,
              fields: [
                {
                  name: 'value',
                  type: 'number',
                  required: true,
                  label: L('Valeur', 'القيمة', 'Value'),
                },
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
        },
        {
          name: 'services',
          label: L('Section examens', 'قسم الفحوصات', 'Services section'),
          fields: [
            {
              name: 'eyebrow',
              type: 'text',
              localized: true,
              label: L('Sur-titre', 'عنوان علوي', 'Eyebrow'),
            },
            { name: 'title', type: 'text', localized: true, label: L('Titre', 'العنوان', 'Title') },
            { name: 'text', type: 'textarea', localized: true, label: L('Texte', 'النص', 'Text') },
          ],
        },
        {
          name: 'xray',
          label: L('Section « Voir au-delà »', 'قسم «الرؤية أبعد»', 'X-ray section'),
          fields: [
            { name: 'title', type: 'text', localized: true, label: L('Titre', 'العنوان', 'Title') },
            { name: 'text', type: 'textarea', localized: true, label: L('Texte', 'النص', 'Text') },
            {
              name: 'hint',
              type: 'text',
              localized: true,
              label: L('Indication', 'تلميح', 'Hint'),
            },
          ],
        },
        {
          name: 'why',
          label: L('Pourquoi nous', 'لماذا نحن', 'Why us'),
          fields: [
            { name: 'title', type: 'text', localized: true, label: L('Titre', 'العنوان', 'Title') },
            {
              name: 'items',
              type: 'array',
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  defaultValue: 'shield',
                  options: ['shield', 'clock', 'sparkle', 'heart', 'pin', 'doc'].map((v) => ({
                    label: v,
                    value: v,
                  })),
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  localized: true,
                  label: L('Titre', 'العنوان', 'Title'),
                },
                {
                  name: 'text',
                  type: 'textarea',
                  localized: true,
                  label: L('Texte', 'النص', 'Text'),
                },
              ],
            },
          ],
        },
        {
          name: 'journey',
          label: L('Parcours patient', 'مسار المريض', 'Patient journey'),
          fields: [
            { name: 'title', type: 'text', localized: true, label: L('Titre', 'العنوان', 'Title') },
            {
              name: 'steps',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  localized: true,
                  label: L('Titre', 'العنوان', 'Title'),
                },
                {
                  name: 'text',
                  type: 'textarea',
                  localized: true,
                  label: L('Texte', 'النص', 'Text'),
                },
              ],
            },
          ],
        },
        {
          name: 'cta',
          label: L('Bandeau final', 'الشريط الختامي', 'Final CTA'),
          fields: [
            { name: 'title', type: 'text', localized: true, label: L('Titre', 'العنوان', 'Title') },
            { name: 'text', type: 'textarea', localized: true, label: L('Texte', 'النص', 'Text') },
          ],
        },
      ],
    },
  ],
}
