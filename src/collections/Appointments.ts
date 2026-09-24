import type { CollectionConfig } from 'payload'

/**
 * Requests submitted from the website form. Public creation happens only through
 * the server action in `src/app/(frontend)/[locale]/contact/actions.ts`, which
 * validates input and writes with the Local API.
 */
export const Appointments: CollectionConfig = {
  slug: 'appointments',
  labels: {
    singular: { fr: 'Demande de rendez-vous', ar: 'طلب موعد', en: 'Appointment request' },
    plural: { fr: 'Demandes de rendez-vous', ar: 'طلبات المواعيد', en: 'Appointment requests' },
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'phone', 'service', 'status', 'createdAt'],
    group: { fr: 'Patients', ar: 'المرضى', en: 'Patients' },
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'fullName',
          type: 'text',
          required: true,
          label: { fr: 'Nom complet', ar: 'الاسم الكامل', en: 'Full name' },
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          label: { fr: 'Téléphone', ar: 'الهاتف', en: 'Phone' },
        },
        {
          name: 'email',
          type: 'email',
          label: { fr: 'E-mail', ar: 'البريد الإلكتروني', en: 'Email' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'service',
          type: 'relationship',
          relationTo: 'services',
          label: { fr: 'Examen', ar: 'الفحص', en: 'Exam' },
        },
        {
          name: 'preferredDate',
          type: 'date',
          label: { fr: 'Date souhaitée', ar: 'التاريخ المفضل', en: 'Preferred date' },
          admin: { date: { pickerAppearance: 'dayOnly' } },
        },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      label: { fr: 'Message', ar: 'الرسالة', en: 'Message' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: { fr: 'Nouvelle', ar: 'جديد', en: 'New' }, value: 'new' },
        { label: { fr: 'Rappelé', ar: 'تم الاتصال', en: 'Contacted' }, value: 'contacted' },
        { label: { fr: 'Planifié', ar: 'تمت الجدولة', en: 'Scheduled' }, value: 'scheduled' },
        { label: { fr: 'Annulé', ar: 'ملغى', en: 'Cancelled' }, value: 'cancelled' },
      ],
      label: { fr: 'Statut', ar: 'الحالة', en: 'Status' },
      admin: { position: 'sidebar' },
    },
    {
      name: 'locale',
      type: 'text',
      label: { fr: 'Langue du formulaire', ar: 'لغة النموذج', en: 'Form language' },
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: { fr: 'Notes internes', ar: 'ملاحظات داخلية', en: 'Internal notes' },
      admin: { position: 'sidebar' },
    },
  ],
}
