import { revalidatePath } from 'next/cache'
import type { Endpoint } from 'payload'

/** POST /api/revalidate — admin-only: purge every cached page (e.g. after a CLI seed). */
export const revalidateEndpoint: Endpoint = {
  path: '/revalidate',
  method: 'post',
  handler: async (req) => {
    if (!req.user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
    revalidatePath('/', 'layout')
    return Response.json({ ok: true })
  },
}
