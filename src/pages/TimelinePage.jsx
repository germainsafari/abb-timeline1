import { useState } from 'react'
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
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        className={`side-nav side-nav-next ${hasNext ? '' : 'disabled'}`}
        onClick={() => hasNext && setActiveYear(YEARS[activeIndex + 1])}
      >
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
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
