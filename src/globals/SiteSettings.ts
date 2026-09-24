import type { GlobalConfig } from 'payload'

import { revalidateGlobal } from '../hooks/revalidate'

const L = (fr: string, ar: string, en: string) => ({ fr, ar, en })

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: L('Informations du centre', 'معلومات المركز', 'Site settings'),
  admin: { group: L('Réglages', 'الإعدادات', 'Settings') },
  access: { read: () => true },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: L('Identité', 'الهوية', 'Identity'),
          fields: [
            {
              name: 'siteName',
              type: 'text',
              required: true,
              localized: true,
              label: L('Nom du centre', 'اسم المركز', 'Name'),
            },
            {
              name: 'tagline',
              type: 'text',
              localized: true,
              label: L('Slogan', 'الشعار', 'Tagline'),
            },
            {
              name: 'seoDescription',
              type: 'textarea',
              localized: true,
              label: L(
                'Description SEO par défaut',
                'وصف SEO الافتراضي',
                'Default SEO description',
              ),
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: L('Image de partage', 'صورة المشاركة', 'Share image'),
            },
          ],
        },
        {
          label: L('Coordonnées', 'معلومات الاتصال', 'Contact'),
          fields: [
            {
              name: 'address',
              type: 'textarea',
              localized: true,
              label: L('Adresse', 'العنوان', 'Address'),
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'phoneOffice',
                  type: 'text',
                  label: L('Téléphone fixe', 'الهاتف الثابت', 'Office phone'),
                },
                { name: 'phoneMobile', type: 'text', label: L('Mobile', 'الجوال', 'Mobile') },
                {
                  name: 'whatsapp',
                  type: 'text',
                  label: L(
                    'WhatsApp (format international)',
                    'واتساب (بالصيغة الدولية)',
                    'WhatsApp',
                  ),
                  admin: {
                    description: L('ex. 21656606633', 'مثال 21656606633', 'e.g. 21656606633'),
                  },
                },
              ],
            },
            { name: 'email', type: 'email', label: L('E-mail', 'البريد الإلكتروني', 'Email') },
            {
              name: 'mapQuery',
              type: 'text',
              label: L('Recherche Google Maps', 'بحث خرائط Google', 'Google Maps query'),
              admin: {
                description: L(
                  'Adresse ou coordonnées « lat,lng » utilisées pour la carte.',
                  'العنوان أو الإحداثيات المستعملة في الخريطة.',
                  'Address or "lat,lng" used for the map.',
                ),
              },
            },
            {
              name: 'hours',
              type: 'array',
              label: L('Horaires', 'أوقات العمل', 'Opening hours'),
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'days',
                      type: 'text',
                      required: true,
                      localized: true,
                      label: L('Jours', 'الأيام', 'Days'),
                    },
                    {
                      name: 'time',
                      type: 'text',
                      required: true,
                      localized: true,
                      label: L('Heures', 'الساعات', 'Hours'),
                    },
                  ],
                },
              ],
            },
            {
              name: 'hoursNote',
              type: 'text',
              localized: true,
              label: L('Note sur les horaires', 'ملاحظة حول الأوقات', 'Hours note'),
            },
          ],
        },
        {
          label: L('Réseaux sociaux', 'الشبكات الاجتماعية', 'Social'),
          fields: [
            { name: 'facebook', type: 'text', label: 'Facebook' },
            { name: 'instagram', type: 'text', label: 'Instagram' },
          ],
        },
      ],
    },
  ],
}
