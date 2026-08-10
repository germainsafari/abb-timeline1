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
          <svg viewBox="0 0 92 92" fill="none">
            <rect width="92" height="92" rx="46" fill="#D2D2D2"/>
            <path d="M33.8662 56.3636C33.378 56.8518 33.3779 57.6432 33.8661 58.1314C34.3542 58.6196 35.1457 58.6196 35.6338 58.1315L45.9988 47.7674L56.3662 58.1339C56.8543 58.6221 57.6458 58.622 58.1339 58.1338C58.6221 57.6457 58.622 56.8542 58.1338 56.3661L47.7681 46.0011L58.1338 35.6362C58.622 35.1481 58.6221 34.3566 58.1339 33.8684C57.6458 33.3803 56.8543 33.3802 56.3662 33.8684L46.0012 44.2325L35.6338 33.8659C35.1457 33.3778 34.3542 33.3778 33.8661 33.866C33.3779 34.3542 33.378 35.1456 33.8662 35.6338L44.2319 45.9987L33.8662 56.3636Z" fill="#0F0F0F"/>
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
