import { useMemo } from 'react'
import { motion } from 'framer-motion'
import './HomePage.css'

const IMAGES = [
  { id: 1, src: '/images/home/home-1.png', width: 14.6, height: 10.9 },
  { id: 2, src: '/images/home/home-2.png', width: 8.9, height: 14.0 },
  { id: 3, src: '/images/home/home-3.png', width: 11.0, height: 11.0 },
  { id: 4, src: '/images/home/home-4.png', width: 11.0, height: 9.9 },
  { id: 5, src: '/images/home/home-5.png', width: 14.6, height: 8.8 },
  { id: 6, src: '/images/home/home-6.png', width: 14.6, height: 9.7 },
  { id: 7, src: '/images/home/home-7.png', width: 14.6, height: 9.7 },
  { id: 8, src: '/images/home/home-8.png', width: 14.6, height: 9.7 },
  { id: 9, src: '/images/home/home-9.png', width: 14.6, height: 9.8 },
  { id: 10, src: '/images/home/home-10.png', width: 14.6, height: 11.2 },
  { id: 11, src: '/images/home/home-11.png', width: 10.4, height: 14.0 },
  { id: 12, src: '/images/home/home-12.png', width: 11.0, height: 11.0 },
  { id: 13, src: '/images/home/home-13.png', width: 11.0, height: 10.9 },
  { id: 14, src: '/images/home/home-14.png', width: 14.6, height: 8.8 },
  { id: 15, src: '/images/home/home-15.png', width: 14.6, height: 9.7 },
  { id: 16, src: '/images/home/home-16.png', width: 14.6, height: 9.7 },
  { id: 17, src: '/images/home/home-17.png', width: 11.0, height: 11.0 },
  { id: 18, src: '/images/home/home-18.png', width: 14.6, height: 10.1 },
  { id: 19, src: '/images/home/home-19.png', width: 14.6, height: 10.3 },
  { id: 20, src: '/images/home/home-20.png', width: 14.6, height: 9.6 },
  { id: 21, src: '/images/home/home-21.png', width: 12.0, height: 14.0 },
  { id: 22, src: '/images/home/home-22.png', width: 14.6, height: 10.4 },
  { id: 23, src: '/images/home/home-23.png', width: 11.0, height: 11.6 },
  { id: 24, src: '/images/home/home-24.png', width: 14.6, height: 10.7 },
  { id: 25, src: '/images/home/home-25.png', width: 10.1, height: 14.0 },
  { id: 26, src: '/images/home/home-26.png', width: 10.1, height: 14.0 },
  { id: 27, src: '/images/home/home-27.png', width: 14.6, height: 11.0 },
  { id: 28, src: '/images/home/home-28.png', width: 14.6, height: 10.5 },
  { id: 29, src: '/images/home/home-29.png', width: 8.2, height: 14.0 },
  { id: 30, src: '/images/home/home-30.png', width: 9.2, height: 14.0 },
  { id: 31, src: '/images/home/home-31.png', width: 14.6, height: 11.0 },
  { id: 32, src: '/images/home/home-32.png', width: 11.3, height: 14.0 },
  { id: 33, src: '/images/home/home-33.png', width: 14.6, height: 9.5 },
  { id: 34, src: '/images/home/home-34.png', width: 14.6, height: 6.4 },
  { id: 35, src: '/images/home/home-35.png', width: 14.6, height: 9.4 },
  { id: 36, src: '/images/home/home-36.png', width: 14.6, height: 8.1 },
  { id: 37, src: '/images/home/home-37.png', width: 10.7, height: 14.0 },
  { id: 38, src: '/images/home/home-38.png', width: 11.0, height: 11.0 },
  { id: 39, src: '/images/home/home-39.png', width: 14.6, height: 9.7 },
  { id: 40, src: '/images/home/home-40.png', width: 14.6, height: 10.0 },
  { id: 41, src: '/images/home/home-41.png', width: 11.0, height: 9.0 },
  { id: 42, src: '/images/home/home-42.png', width: 11.0, height: 12.2 },
  { id: 43, src: '/images/home/home-43.png', width: 14.6, height: 8.2 },
  { id: 44, src: '/images/home/home-44.png', width: 14.6, height: 8.2 },
  { id: 45, src: '/images/home/home-45.png', width: 14.6, height: 7.3 },
  { id: 46, src: '/images/home/home-46.png', width: 11.0, height: 11.0 },
  { id: 47, src: '/images/home/home-47.png', width: 11.0, height: 11.0 },
  { id: 48, src: '/images/home/home-48.png', width: 11.0, height: 9.8 },
  { id: 49, src: '/images/home/home-49.png', width: 14.6, height: 10.2 },
  { id: 50, src: '/images/home/home-50.png', width: 14.6, height: 7.5 },
  { id: 51, src: '/images/home/home-51.png', width: 14.6, height: 11.0 },
  { id: 52, src: '/images/home/home-52.png', width: 12.1, height: 14.0 },
  { id: 53, src: '/images/home/home-53.png', width: 11.0, height: 9.7 },
  { id: 54, src: '/images/home/home-54.png', width: 14.6, height: 8.2 },
  { id: 55, src: '/images/home/home-55.png', width: 14.6, height: 11.2 },
  { id: 56, src: '/images/home/home-56.png', width: 14.6, height: 8.9 },
  { id: 57, src: '/images/home/home-57.png', width: 12.5, height: 14.0 },
  { id: 58, src: '/images/home/home-58.png', width: 11.0, height: 12.1 },
  { id: 59, src: '/images/home/home-59.png', width: 11.0, height: 10.4 },
  { id: 60, src: '/images/home/home-60.png', width: 14.6, height: 9.7 },
  { id: 61, src: '/images/home/home-61.png', width: 14.6, height: 10.4 },
  { id: 62, src: '/images/home/home-62.png', width: 10.7, height: 14.0 },
  { id: 63, src: '/images/home/home-63.png', width: 11.0, height: 8.5 },
  { id: 64, src: '/images/home/home-64.png', width: 14.6, height: 11.1 },
  { id: 65, src: '/images/home/home-65.png', width: 14.6, height: 9.8 },
  { id: 66, src: '/images/home/home-66.png', width: 14.6, height: 10.7 },
  { id: 67, src: '/images/home/home-67.png', width: 14.6, height: 9.7 },
  { id: 68, src: '/images/home/home-68.png', width: 14.6, height: 10.7 },
  { id: 69, src: '/images/home/home-69.png', width: 11.0, height: 11.0 },
  { id: 70, src: '/images/home/home-70.png', width: 11.0, height: 9.9 },
  { id: 71, src: '/images/home/home-71.png', width: 14.6, height: 6.7 },
  { id: 72, src: '/images/home/home-72.png', width: 11.0, height: 9.9 },
  { id: 73, src: '/images/home/home-73.png', width: 12.2, height: 14.0 },
  { id: 74, src: '/images/home/home-74.png', width: 11.0, height: 8.7 },
]

const PARALLAX_LANES = [
  { speed: 32.4,  y: '4%',  opacity: 1, scale: 0.76, zIndex: 0 },
  { speed: 42,    y: '20%', opacity: 1, scale: 0.97, zIndex: 1 },
  { speed: 30,    y: '70%', opacity: 1, scale: 0.99, zIndex: 1 },
  { speed: 36,    y: '86%', opacity: 1, scale: 0.77, zIndex: 0 },
]

function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function shuffleImages(seed) {
  const rand = seededRandom(seed)
  const shuffled = [...IMAGES]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const SHUFFLED_IMAGES = shuffleImages(777)

function buildLaneItems(laneIndex, baseScale, startIndex) {
  const rand = seededRandom(laneIndex * 1000 + 42)
  const items = []
  const count = 4 + Math.floor(rand() * 3)
  let cursor = rand() * 5.2

  for (let i = 0; i < count; i++) {
    const img = SHUFFLED_IMAGES[(startIndex + i) % SHUFFLED_IMAGES.length]
    const sizeVariation = 0.8 + rand() * 0.4
    const itemScale = baseScale * sizeVariation
    const itemWidth = img.width * itemScale
    const gap = 4.2 + rand() * 8.3

    const offsetY = (rand() - 0.5) * 20

    items.push({
      ...img,
      key: `lane${laneIndex}-${i}`,
      offsetX: cursor,
      offsetY,
      itemScale,
    })

    cursor += itemWidth + gap
  }

  return { items, totalWidth: cursor }
}

function ParallaxLane({ lane, laneIndex, startIndex }) {
  const { items, totalWidth } = useMemo(
    () => buildLaneItems(laneIndex, lane.scale, startIndex),
    [laneIndex, lane.scale, startIndex]
  )

  return (
    <div
      className="parallax-lane"
      style={{ top: lane.y, zIndex: lane.zIndex }}
    >
      <div
        className="parallax-track"
        style={{
          animationDuration: `${lane.speed}s`,
          width: `${totalWidth * 2}vh`,
        }}
      >
        {[0, 1].map((copy) =>
          items.map((item) => (
            <img
              key={`${item.key}-${copy}`}
              src={item.src}
              alt=""
              className="parallax-image"
              style={{
                width: `${item.width * item.itemScale}vh`,
                height: `${item.height * item.itemScale}vh`,
                left: `${item.offsetX + copy * totalWidth}vh`,
                top: `${item.offsetY}%`,
              }}
            />
          ))
        )}
      </div>
    </div>
  )
}

const LANE_START_INDICES = [0, 7, 14, 21]

function FloatingImages() {
  return (
    <div className="floating-images">
      {PARALLAX_LANES.map((lane, i) => (
        <ParallaxLane key={i} lane={lane} laneIndex={i} startIndex={LANE_START_INDICES[i]} />
      ))}
    </div>
  )
}

export default function HomePage({ onExplore, onStart }) {
  return (
    <motion.div
      className="home-page"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -60 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <FloatingImages />

      <div className="home-content">
        <motion.div
          className="home-title-block"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h2 className="home-subtitle">
            Looking back,<br />moving forward:
          </h2>
          <h1 className="home-title">
            50 Years<br />at ABB Oy
          </h1>
        </motion.div>

        <motion.div
          className="home-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        >
          <button className="btn btn-outline" onClick={onExplore}>
            Explore freely
          </button>
          <button className="btn btn-primary" onClick={onStart}>
            Start from the beginning
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}
