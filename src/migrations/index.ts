import * as migration_20260924_144436_initial from './20260924_144436_initial'
import * as migration_20260924_150237_service_list_update from './20260924_150237_service_list_update'
import * as migration_20260924_153241_vercel_blob from './20260924_153241_vercel_blob'

export const migrations = [
  {
    up: migration_20260924_144436_initial.up,
    down: migration_20260924_144436_initial.down,
    name: '20260924_144436_initial',
  },
  {
    up: migration_20260924_150237_service_list_update.up,
    down: migration_20260924_150237_service_list_update.down,
    name: '20260924_150237_service_list_update',
  },
  {
    up: migration_20260924_153241_vercel_blob.up,
    down: migration_20260924_153241_vercel_blob.down,
    name: '20260924_153241_vercel_blob',
  },
]
