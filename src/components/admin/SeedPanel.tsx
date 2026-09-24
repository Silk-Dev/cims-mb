import type { ServerProps } from 'payload'

import { SeedButton } from './SeedButton'

/** Dashboard card offering to import the starter content, shown only while the site is empty. */
export async function SeedPanel({ payload }: ServerProps) {
  const { totalDocs } = await payload.count({ collection: 'services' })
  if (totalDocs > 0) return null
  return <SeedButton />
}
