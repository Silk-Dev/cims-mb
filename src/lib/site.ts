/** Canonical domain of the live site. */
export const PRODUCTION_URL = 'https://cims-mb.tn'

/**
 * Public URL of the site: SITE_URL if set; cims-mb.tn for Vercel production deployments;
 * the deployment's own URL for previews; localhost in development.
 */
export const siteUrl = () => {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '')
  if (process.env.VERCEL_ENV === 'production') return PRODUCTION_URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}
