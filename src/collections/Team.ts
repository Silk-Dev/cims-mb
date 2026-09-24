import type { CollectionConfig } from 'payload'

import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate'

export const Team: CollectionConfig = {
  slug: 'team',
  labels: {
    singular: { fr: 'Membre de l’équipe', ar: 'عضو الفريق', en: 'Team member' },
    plural: { fr: 'Équipe', ar: 'الفريق', en: 'Team' },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'order'],
    group: { fr: 'Contenu', ar: 'المحتوى', en: 'Content' },
  },
  access: { read: () => true },
  hooks: { afterChange: [revalidateAfterChange], afterDelete: [revalidateAfterDelete] },
  defaultSort: 'order',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Nom', ar: 'الاسم', en: 'Name' },
    },
    {
      name: 'role',
      type: 'text',
      localized: true,
      label: { fr: 'Fonction', ar: 'الوظيفة', en: 'Role' },
    },
    {
      name: 'bio',
      type: 'textarea',
      localized: true,
      label: { fr: 'Biographie', ar: 'نبذة', en: 'Bio' },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: { fr: 'Photo', ar: 'صورة', en: 'Photo' },
    },
    {
      name: 'isLead',
      type: 'checkbox',
      label: { fr: 'Médecin responsable (mis en avant)', ar: 'الطبيب المسؤول', en: 'Lead' },
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
