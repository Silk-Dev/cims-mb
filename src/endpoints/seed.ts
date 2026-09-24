import { revalidatePath } from 'next/cache'
import type { Endpoint } from 'payload'

import { seed } from '../seed'

/**
 * POST /api/seed — imports the initial FR/AR content. Admin-only, and refused once
 * services exist so it can never overwrite the clinic's edits.
 */
export const seedEndpoint: Endpoint = {
  path: '/seed',
  method: 'post',
  handler: async (req) => {
    if (!req.user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
    const existing = await req.payload.count({ collection: 'services' })
    if (existing.totalDocs > 0) {
      return Response.json({ error: 'Content already exists' }, { status: 409 })
    }
    await seed(req.payload)
    revalidatePath('/', 'layout')
    return Response.json({ ok: true })
  },
}
