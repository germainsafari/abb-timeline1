// In production the Express server serves /data and /api on the same origin.
// In dev, Vite serves static files from public/ and the API runs on port 3001.
export const API_BASE = import.meta.env.DEV ? 'http://localhost:3001' : ''

export function resolveAssetSrc(src) {
  if (!src) return ''
  if (src.startsWith('http')) return src
  return `${API_BASE}${src}`
}
