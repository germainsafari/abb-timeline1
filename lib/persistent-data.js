import { cpSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = join(__dirname, '..')
export const BUNDLED_DATA_DIR = join(ROOT_DIR, 'public', 'data')
export const DATA_DIR = process.env.PERSISTENT_DATA_DIR || BUNDLED_DATA_DIR

export function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
}

/** Map a public URL like /data/1965/images/foo.png to a filesystem path. */
export function resolveDataPath(src) {
  if (!src) return null
  if (src.startsWith('/data/')) {
    return join(DATA_DIR, src.slice('/data/'.length))
  }
  return join(ROOT_DIR, 'public', src.replace(/^\//, ''))
}

function dirHasTimelineData(dir) {
  if (!existsSync(dir)) return false
  return readdirSync(dir).some((entry) => {
    const yearPath = join(dir, entry, 'content.json')
    return existsSync(yearPath) && statSync(join(dir, entry)).isDirectory()
  })
}

/** Copy bundled repo data onto the persistent disk only when the disk is empty. */
export function seedPersistentDataIfNeeded() {
  if (DATA_DIR === BUNDLED_DATA_DIR) {
    console.log(`Using bundled data directory: ${DATA_DIR}`)
    return
  }

  ensureDir(DATA_DIR)

  if (dirHasTimelineData(DATA_DIR)) {
    console.log(`Persistent data found at ${DATA_DIR} — skipping seed`)
    return
  }

  if (!existsSync(BUNDLED_DATA_DIR)) {
    console.warn(`No bundled data found at ${BUNDLED_DATA_DIR}`)
    return
  }

  console.log(`Seeding persistent disk from ${BUNDLED_DATA_DIR} → ${DATA_DIR}`)
  cpSync(BUNDLED_DATA_DIR, DATA_DIR, { recursive: true })
  console.log('Persistent data seed complete')
}
