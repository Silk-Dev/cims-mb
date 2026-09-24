export const formatDate = (date: string | null | undefined, locale: string) =>
  date
    ? new Intl.DateTimeFormat(locale === 'ar' ? 'ar-TN' : 'fr-TN', { dateStyle: 'long' }).format(
        new Date(date),
      )
    : ''
