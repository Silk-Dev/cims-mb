import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { fr: 'Utilisateur', ar: 'مستخدم', en: 'User' },
    plural: { fr: 'Utilisateurs', ar: 'المستخدمون', en: 'Users' },
  },
  admin: {
    useAsTitle: 'email',
    group: { fr: 'Administration', ar: 'الإدارة', en: 'Admin' },
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: { fr: 'Nom', ar: 'الاسم', en: 'Name' },
    },
  ],
}
