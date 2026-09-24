import type { GlobalConfig } from 'payload'

import { revalidateGlobal } from '../hooks/revalidate'

const L = (fr: string, ar: string, en: string) => ({ fr, ar, en })

const linkFields = [
  {
    name: 'label',
    type: 'text' as const,
    required: true,
    localized: true,
    label: L('Libellé', 'التسمية', 'Label'),
  },
  {
    name: 'href',
    type: 'text' as const,
    required: true,
    label: L('Lien', 'الرابط', 'Link'),
    admin: {
      description: L(
        'Chemin interne sans la langue (ex. /services) ou URL complète.',
        'مسار داخلي بدون اللغة (مثال /services) أو رابط كامل.',
        'Internal path without locale (e.g. /services) or full URL.',
      ),
    },
  },
]

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: L('Menus', 'القوائم', 'Navigation'),
  admin: { group: L('Réglages', 'الإعدادات', 'Settings') },
  access: { read: () => true },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      name: 'header',
      type: 'array',
      label: L('Menu principal', 'القائمة الرئيسية', 'Header'),
      fields: linkFields,
    },
    {
      name: 'footer',
      type: 'array',
      label: L('Liens du pied de page', 'روابط التذييل', 'Footer'),
      fields: linkFields,
    },
  ],
}
