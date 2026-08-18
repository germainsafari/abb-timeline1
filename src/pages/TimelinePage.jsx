import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import TimelineNav, { YEARS } from '../components/TimelineNav'
import YearContent from '../components/YearContent'
import './TimelinePage.css'

export default function TimelinePage({ onClose, initialYear }) {
  const [activeYear, setActiveYear] = useState(
    initialYear && YEARS.includes(initialYear) ? initialYear : YEARS[0]
  )
  const [isEditing, setIsEditing] = useState(false)
  const activeIndex = YEARS.indexOf(activeYear)
  const hasPrev = activeIndex > 0
  const hasNext = activeIndex < YEARS.length - 1

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

  return (
    <motion.div
      className="timeline-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <button
        className={`edit-toggle ${isEditing ? 'active' : ''}`}
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? 'Exit Edit Mode' : 'Edit Mode'}
      </button>

      <button
        className={`side-nav side-nav-prev ${hasPrev ? '' : 'disabled'}`}
        onClick={() => hasPrev && setActiveYear(YEARS[activeIndex - 1])}
      >
        <svg viewBox="0 0 20 20" fill="none" style={{ transform: 'scaleX(-1)' }}>
          <path d="M2.72727 9.28029V11.1742H13.5744L8.60279 16.3826L9.88636 17.7273L17.0455 10.2273L9.88636 2.72726L8.60279 4.07196L13.5744 9.28029H2.72727Z" fill="currentColor"/>
        </svg>
      </button>

      <button
        className={`side-nav side-nav-next ${hasNext ? '' : 'disabled'}`}
        onClick={() => hasNext && setActiveYear(YEARS[activeIndex + 1])}
      >
        <svg viewBox="0 0 20 20" fill="none">
          <path d="M2.72727 9.28029V11.1742H13.5744L8.60279 16.3826L9.88636 17.7273L17.0455 10.2273L9.88636 2.72726L8.60279 4.07196L13.5744 9.28029H2.72727Z" fill="currentColor"/>
        </svg>
      </button>

      <motion.div
        className="timeline-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <YearContent key={activeYear} year={activeYear} isEditing={isEditing} />
      </motion.div>

      <motion.div
        className="timeline-nav-wrapper"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <TimelineNav
          activeYear={activeYear}
          onYearChange={setActiveYear}
          onClose={onClose}
        />
      </motion.div>
    </motion.div>
  )
}
