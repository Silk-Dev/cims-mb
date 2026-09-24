import * as migration_20260924_144436_initial from './20260924_144436_initial'

export const migrations = [
  {
    up: migration_20260924_144436_initial.up,
    down: migration_20260924_144436_initial.down,
    name: '20260924_144436_initial',
  },
]
