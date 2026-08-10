import { useRef, useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import EXPLORE_ITEMS from '../data/exploreItems'
import './ExplorePage.css'

const CANVAS_WIDTH_VH = 540
import { API_BASE } from '../config'
const YEAR_MARKERS = [
  { year: 1965, x: 0.3 },
  { year: 1982, x: 5.5 },
  { year: 1985, x: 16.2 },
  { year: 1987, x: 20.8 },
  { year: 1989, x: 24.2 },
  { year: 1995, x: 36.1 },
  { year: 2003, x: 39.6 },
  { year: 2004, x: 50.2 },
  { year: 2007, x: 53.9 },
  { year: 2009, x: 56.2 },
  { year: 2019, x: 68.2 },
  { year: 2022, x: 71.0 },
  { year: 2023, x: 82.8 },
  { year: 2024, x: 83.7 },
  { year: 2026, x: 86.8 },
]

export default function ExplorePage({ onClose, onSelectYear }) {
  const scrollRef = useRef(null)
  const canvasRef = useRef(null)
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false })
  const [isEditing, setIsEditing] = useState(false)
  const [items, setItems] = useState(EXPLORE_ITEMS)
  const [draggingId, setDraggingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const saveTimeout = useRef(null)

  useEffect(() => {
    fetch('/data/explore/positions.json')
      .then((r) => r.json())
      .then((positions) => {
        if (Object.keys(positions).length === 0) return
        setItems(EXPLORE_ITEMS.map((item) => {
          const pos = positions[item.id]
          return pos ? { ...item, ...pos } : item
        }))
      })
      .catch(() => {
        fetch(`${API_BASE}/api/explore/positions`)
          .then((r) => r.json())
          .then((positions) => {
            if (Object.keys(positions).length === 0) return
            setItems(EXPLORE_ITEMS.map((item) => {
              const pos = positions[item.id]
              return pos ? { ...item, ...pos } : item
            }))
          })
          .catch(() => {})
      })
  }, [])

  const persistPositions = useCallback((updatedItems) => {
    clearTimeout(saveTimeout.current)
    saveTimeout.current = setTimeout(() => {
      setSaving(true)
      const positions = {}
      updatedItems.forEach((item) => {
        const orig = EXPLORE_ITEMS.find((o) => o.id === item.id)
        if (orig && (item.x !== orig.x || item.y !== orig.y || item.w !== orig.w)) {
          positions[item.id] = { x: item.x, y: item.y, w: item.w }
        }
      })
      fetch(`${API_BASE}/api/explore/positions`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(positions),
      }).finally(() => setSaving(false))
    }, 400)
  }, [])

  const updateItem = useCallback((id, changes) => {
    setItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, ...changes } : item
      )
      persistPositions(updated)
      return updated
    })
  }, [persistPositions])

  // ── Auto-scroll on page enter ────────────────────────────────
  useEffect(() => {
    const el = scrollRef.current
    if (!el || isEditing) return
    let animId
    let stopped = false
    let lastTime = 0
    const pxPerSecond = 15
    const maxScroll = 400

    const step = (timestamp) => {
      if (stopped) return
      if (!lastTime) { lastTime = timestamp; animId = requestAnimationFrame(step); return }
      const dt = timestamp - lastTime
      lastTime = timestamp
      el.scrollLeft += pxPerSecond * (dt / 1000)
      if (el.scrollLeft >= maxScroll) { stopped = true; return }
      animId = requestAnimationFrame(step)
    }
    animId = requestAnimationFrame(step)

    const stopScroll = () => { stopped = true }
    el.addEventListener('mousedown', stopScroll, { once: true })
    el.addEventListener('touchstart', stopScroll, { once: true })

    return () => {
      stopped = true
      cancelAnimationFrame(animId)
      el.removeEventListener('mousedown', stopScroll)
      el.removeEventListener('touchstart', stopScroll)
    }
  }, [isEditing])

  // ── Idle timeout — return to home after 2 min ──────────────
  useEffect(() => {
    if (isEditing) return
    let timer = setTimeout(onClose, 120000)

    const resetTimer = () => {
      clearTimeout(timer)
      timer = setTimeout(onClose, 120000)
    }

    const events = ['mousedown', 'touchstart', 'mousemove', 'scroll']
    events.forEach((ev) => window.addEventListener(ev, resetTimer, { passive: true }))

    return () => {
      clearTimeout(timer)
      events.forEach((ev) => window.removeEventListener(ev, resetTimer))
    }
  }, [isEditing, onClose])

  // ── Scroll-drag (disabled during item editing) ──────────────
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onDown = (e) => {
      if (isEditing) return
      dragState.current = {
        active: true,
        startX: e.clientX ?? e.touches?.[0]?.clientX ?? 0,
        scrollLeft: el.scrollLeft,
        moved: false,
      }
      el.classList.add('dragging')
    }

    const onMove = (e) => {
      if (!dragState.current.active) return
      const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0
      const dx = clientX - dragState.current.startX
      if (Math.abs(dx) > 5) dragState.current.moved = true
      el.scrollLeft = dragState.current.scrollLeft - dx
    }

    const onUp = () => {
      dragState.current.active = false
      el.classList.remove('dragging')
    }

    const preventDrag = (e) => e.preventDefault()

    el.addEventListener('mousedown', onDown)
    el.addEventListener('touchstart', onDown, { passive: true })
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchend', onUp)
    el.addEventListener('dragstart', preventDrag)

    return () => {
      el.removeEventListener('mousedown', onDown)
      el.removeEventListener('touchstart', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchend', onUp)
      el.removeEventListener('dragstart', preventDrag)
    }
  }, [isEditing])

  // ── Item drag handler ───────────────────────────────────────
  const handleItemDragStart = useCallback((e, item) => {
    if (!isEditing) return
    e.preventDefault()
    e.stopPropagation()
    const touch = e.touches?.[0] || e
    const canvas = canvasRef.current
    const canvasW = canvas.offsetWidth
    const canvasH = canvas.offsetHeight
    const startX = touch.clientX
    const startY = touch.clientY
    const origX = item.x
    const origY = item.y
    setDraggingId(item.id)

    const handleMove = (ev) => {
      ev.preventDefault()
      const t = ev.touches?.[0] || ev
      const dx = t.clientX - startX
      const dy = t.clientY - startY
      const newX = Math.max(0, Math.min(100, origX + (dx / canvasW) * 100))
      const newY = Math.max(0, Math.min(95, origY + (dy / canvasH) * 100))
      updateItem(item.id, {
        x: Math.round(newX * 10) / 10,
        y: Math.round(newY * 10) / 10,
      })
    }
    const handleEnd = () => {
      setDraggingId(null)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('touchend', handleEnd)
    }
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleEnd)
    window.addEventListener('touchmove', handleMove, { passive: false })
    window.addEventListener('touchend', handleEnd)
  }, [isEditing, updateItem])

  // ── Item resize handler ─────────────────────────────────────
  const handleResizeStart = useCallback((e, item) => {
    e.preventDefault()
    e.stopPropagation()
    const touch = e.touches?.[0] || e
    const startX = touch.clientX
    const vh = window.innerHeight / 100
    const origW = item.w
    setDraggingId(item.id)

    const handleMove = (ev) => {
      ev.preventDefault()
      const t = ev.touches?.[0] || ev
      const dx = t.clientX - startX
      const newW = Math.max(2, origW + dx / vh)
      updateItem(item.id, { w: Math.round(newW * 10) / 10 })
    }
    const handleEnd = () => {
      setDraggingId(null)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('touchend', handleEnd)
    }
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleEnd)
    window.addEventListener('touchmove', handleMove, { passive: false })
    window.addEventListener('touchend', handleEnd)
  }, [updateItem])

  const handleItemClick = useCallback((item) => {
    if (isEditing) return
    if (dragState.current.moved) return
    onSelectYear(item.year)
  }, [isEditing, onSelectYear])

  return (
    <motion.div
      className="explore-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="explore-hint">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
          <path d="M8 4.5v4M8 10.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        {isEditing ? 'Drag items to reposition, drag corner to resize' : 'Drag to explore and click to select the image'}
      </div>

      <button
        className={`explore-edit-toggle ${isEditing ? 'active' : ''}`}
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? 'Exit Edit Mode' : 'Edit Mode'}
      </button>

      {saving && <div className="explore-save-indicator">Saving...</div>}

      <img src="/images/explore/bgpagina.svg" alt="" className="explore-bg-watermark" />

      <div className={`explore-scroll ${isEditing ? 'editing' : ''}`} ref={scrollRef}>
        <div className="explore-canvas" ref={canvasRef} style={{ width: `${CANVAS_WIDTH_VH}vh` }}>
          {items.map((item) => (
            <div
              key={item.id}
              className={`explore-item ${isEditing ? 'editing' : ''} ${draggingId === item.id ? 'dragging-item' : ''}`}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                width: `${item.w}vh`,
              }}
              onClick={() => handleItemClick(item)}
              onMouseDown={isEditing ? (e) => handleItemDragStart(e, item) : undefined}
              onTouchStart={isEditing ? (e) => handleItemDragStart(e, item) : undefined}
            >
              <div className="explore-item-img-wrap">
                <img
                  src={`/images/explore/${item.img}`}
                  alt={item.desc}
                  draggable={false}
                />
              </div>
              <p className="explore-item-desc">{item.desc}</p>
              <div className="explore-item-year">
                <svg className="explore-year-icon" viewBox="0 0 42 42" fill="none">
                  <path d="M8.57129 20.5715C8.57129 13.9441 13.9439 8.57153 20.5713 8.57153C27.1987 8.57153 32.5713 13.9441 32.5713 20.5715C32.5713 27.1989 27.1987 32.5715 20.5713 32.5715C13.9439 32.5715 8.57129 27.1989 8.57129 20.5715Z" fill="#EE0000"/>
                  <path d="M20.1425 26.0258C20.1425 26.2625 20.3344 26.4544 20.5711 26.4544C20.8078 26.4544 20.9997 26.2625 20.9997 26.0258L20.9999 21.0003L26.0265 21.0001C26.2632 21.0001 26.4551 20.8082 26.4551 20.5716C26.4551 20.3349 26.2632 20.143 26.0265 20.143L21.0006 20.1432L21.0008 15.1173C21.0008 14.8806 20.809 14.6887 20.5723 14.6887C20.3356 14.6887 20.1437 14.8806 20.1437 15.1173L20.1435 20.1428L15.1168 20.143C14.8801 20.143 14.6883 20.3349 14.6883 20.5716C14.6883 20.8082 14.8802 21.0001 15.1169 21.0001L20.1427 20.9999L20.1425 26.0258Z" fill="white"/>
                </svg>
                {item.year}
              </div>

              {isEditing && (
                <>
                  <div className="explore-item-coords">
                    x:{item.x} y:{item.y} w:{item.w}
                  </div>
                  <div
                    className="explore-item-resize"
                    onMouseDown={(e) => handleResizeStart(e, item)}
                    onTouchStart={(e) => handleResizeStart(e, item)}
                  />
                </>
              )}
            </div>
          ))}

        </div>
      </div>

      <button className="explore-close" onClick={onClose}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <line x1="4" y1="4" x2="16" y2="16" stroke="#0F0F0F" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="4" x2="4" y2="16" stroke="#0F0F0F" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </motion.div>
  )
}
