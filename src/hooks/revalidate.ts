import { revalidatePath } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

/** Purge the cached pages so edits made in the admin are visible immediately. */
const purge = () => {
  try {
    revalidatePath('/', 'layout')
  } catch {
    // Outside a Next.js request (e.g. `pnpm seed`): nothing to purge.
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  purge()
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  purge()
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc }) => {
  purge()
  return doc
}
