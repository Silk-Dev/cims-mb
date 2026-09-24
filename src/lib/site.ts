/** Public URL of the site: SITE_URL, else the Vercel production/deployment URL, else localhost. */
export const siteUrl = () => {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '')
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}
