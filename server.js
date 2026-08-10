import express from 'express'
import multer from 'multer'
import cors from 'cors'
import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import {
  DATA_DIR,
  ensureDir,
  resolveDataPath,
  seedPersistentDataIfNeeded,
} from './lib/persistent-data.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST_DIR = join(__dirname, 'dist')
const PORT = process.env.PORT || 3001

seedPersistentDataIfNeeded()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/data', express.static(DATA_DIR))

function yearDir(year) {
  return join(DATA_DIR, String(year))
}

function dataFile(year) {
  return join(yearDir(year), 'content.json')
}

function loadYearData(year) {
  const file = dataFile(year)
  if (existsSync(file)) {
    return JSON.parse(readFileSync(file, 'utf-8'))
  }
  return {
    title: '',
    text: '',
    funFact: '',
    funFactSource: '',
    images: [],
  }
}

function saveYearData(year, data) {
  ensureDir(yearDir(year))
  writeFileSync(dataFile(year), JSON.stringify(data, null, 2))
}

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    dataDir: DATA_DIR,
    persistent: Boolean(process.env.PERSISTENT_DATA_DIR),
  })
})

app.get('/api/years/:year', (req, res) => {
  res.json(loadYearData(req.params.year))
})

app.put('/api/years/:year', (req, res) => {
  saveYearData(req.params.year, req.body)
  res.json({ ok: true })
})

const storage = multer.diskStorage({
  destination(req, _file, cb) {
    const dir = join(yearDir(req.params.year), 'images')
    ensureDir(dir)
    cb(null, dir)
  },
  filename(_req, file, cb) {
    const unique = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`
    cb(null, unique)
  },
})
const upload = multer({ storage })

app.post('/api/years/:year/images', upload.single('image'), (req, res) => {
  const year = req.params.year
  const data = loadYearData(year)
  const filename = req.file.filename
  const newImage = {
    id: `img-${Date.now()}`,
    src: `/data/${year}/images/${filename}`,
    x: parseFloat(req.body.width) ? 50 : 40,
    y: 25,
    width: parseFloat(req.body.width) || 25,
    height: parseFloat(req.body.height) || 15,
    caption: '',
  }
  data.images.push(newImage)
  saveYearData(year, data)
  res.json(newImage)
})

const funfactStorage = multer.diskStorage({
  destination(req, _file, cb) {
    const dir = join(yearDir(req.params.year), 'images', 'funfact')
    ensureDir(dir)
    cb(null, dir)
  },
  filename(_req, file, cb) {
    const ext = file.originalname.split('.').pop()
    cb(null, `funfact.${ext}`)
  },
})
const funfactUpload = multer({ storage: funfactStorage })

app.post('/api/years/:year/funfact-image', funfactUpload.single('image'), (req, res) => {
  const year = req.params.year
  const data = loadYearData(year)
  if (data.funFactImage) {
    const oldPath = resolveDataPath(data.funFactImage)
    if (oldPath && existsSync(oldPath) && !oldPath.endsWith(req.file.filename)) {
      unlinkSync(oldPath)
    }
  }
  data.funFactImage = `/data/${year}/images/funfact/${req.file.filename}`
  saveYearData(year, data)
  res.json({ src: data.funFactImage })
})

const EXPLORE_POS_FILE = join(DATA_DIR, 'explore', 'positions.json')

function loadExplorePositions() {
  if (existsSync(EXPLORE_POS_FILE)) {
    return JSON.parse(readFileSync(EXPLORE_POS_FILE, 'utf-8'))
  }
  return {}
}

function saveExplorePositions(positions) {
  ensureDir(join(DATA_DIR, 'explore'))
  writeFileSync(EXPLORE_POS_FILE, JSON.stringify(positions, null, 2))
}

app.get('/api/explore/positions', (_req, res) => {
  res.json(loadExplorePositions())
})

app.put('/api/explore/positions', (req, res) => {
  saveExplorePositions(req.body)
  res.json({ ok: true })
})

app.delete('/api/years/:year/images/:imageId', (req, res) => {
  const { year, imageId } = req.params
  const data = loadYearData(year)
  const img = data.images.find((i) => i.id === imageId)
  if (img) {
    const filePath = resolveDataPath(img.src)
    if (filePath && existsSync(filePath)) unlinkSync(filePath)
    data.images = data.images.filter((i) => i.id !== imageId)
    saveYearData(year, data)
  }
  res.json({ ok: true })
})

if (existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR))
  app.get(/^(?!\/api|\/data).*/, (_req, res) => {
    res.sendFile(join(DIST_DIR, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Timeline data directory: ${DATA_DIR}`)
})
