import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import './TimelineNav.css'

const YEARS = [1965, 1982, 1985, 1987, 1989, 1995, 2003, 2004, 2007, 2009, 2019, 2022, 2023, 2024, 2026]

const TICKS_BETWEEN = 4

export default function TimelineNav({ activeYear, onYearChange, onClose }) {
  const trackRef = useRef(null)
  const activeIndex = YEARS.indexOf(activeYear)

  useEffect(() => {
    if (!trackRef.current) return
    const activeEl = trackRef.current.querySelector('.tl-year-slot.active')
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [activeYear])

  const prevYear = activeIndex > 0 ? YEARS[activeIndex - 1] : null
  const nextYear = activeIndex < YEARS.length - 1 ? YEARS[activeIndex + 1] : null

  return (
    <div className="timeline-nav">
      <div className="tl-track-wrapper">
        <div className="tl-track" ref={trackRef}>
          {YEARS.map((year, i) => {
            const isActive = year === activeYear
            const distFromActive = Math.abs(i - activeIndex)

            return (
              <div className="tl-year-group" key={year}>
                <div
                  className={`tl-year-slot ${isActive ? 'active' : ''}`}
                  onClick={() => onYearChange(year)}
                >
                  <div className="tl-indicator-area">
                    {isActive ? (
                      <motion.div
                        className="tl-bar-active"
                        layoutId="activeBar"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    ) : (
                      <div
                        className="tl-dot"
                        style={{
                          transform: distFromActive === 1 ? 'scale(1.3)' : 'scale(1)',
                        }}
                      />
                    )}
                  </div>
                  <span className={`tl-year-label ${isActive ? 'active' : ''}`}>
                    {year}
                  </span>
                </div>

                {i < YEARS.length - 1 && (
                  <div className="tl-ticks">
                    {Array.from({ length: TICKS_BETWEEN }).map((_, t) => {
                      const tickPos = (t + 1) / (TICKS_BETWEEN + 1)
                      const isNearActive = i === activeIndex || i === activeIndex - 1
                      let tickHeight = 11
                      if (isNearActive) {
                        const fromActive = i === activeIndex ? tickPos : 1 - tickPos
                        tickHeight = 11 + (36 - 11) * Math.max(0, 1 - fromActive * 1.8)
                      }
                      return (
                        <div
                          key={t}
                          className="tl-tick"
                          style={{ height: tickHeight }}
                        />
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="tl-controls">
        <button
          className="tl-btn-arrow tl-btn-prev"
          onClick={() => prevYear && onYearChange(prevYear)}
          disabled={!prevYear}
        >
          <svg className="tl-arrow-icon tl-arrow-left" viewBox="0 0 21 22" fill="none">
            <path d="M21 12.3889V9.61111H5.09091L12.3826 1.97222L10.5 0L0 11L10.5 22L12.3826 20.0278L5.09091 12.3889H21Z" fill="currentColor" />
          </svg>
          PREV
        </button>

        <button className="tl-btn-close" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <line x1="4" y1="4" x2="16" y2="16" stroke="#0F0F0F" strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="4" x2="4" y2="16" stroke="#0F0F0F" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <button
          className="tl-btn-arrow tl-btn-next"
          onClick={() => nextYear && onYearChange(nextYear)}
          disabled={!nextYear}
        >
          NEXT
          <svg className="tl-arrow-icon" viewBox="0 0 21 22" fill="none">
            <path d="M0 9.61111V12.3889H15.9091L8.61742 20.0278L10.5 22L21 11L10.5 0L8.61742 1.97222L15.9091 9.61111H0Z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export { YEARS }
