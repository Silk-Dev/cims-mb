import type { ServerProps } from 'payload'

import { RefreshButton } from './RefreshButton'
import { SeedButton } from './SeedButton'

/**
 * Dashboard card: offers to import the starter content while the database is empty,
 * otherwise shows what the database holds and a button to refresh the cached pages.
 */
export async function SeedPanel({ payload }: ServerProps) {
  const [services, posts, faqs] = await Promise.all([
    payload.count({ collection: 'services' }),
    payload.count({ collection: 'posts' }),
    payload.count({ collection: 'faqs' }),
  ])
  if (services.totalDocs === 0) return <SeedButton />
  return (
    <RefreshButton
      summary={`${services.totalDocs} examens · ${faqs.totalDocs} questions · ${posts.totalDocs} articles`}
    />
  )
}
