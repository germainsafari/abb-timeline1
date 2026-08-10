import { useState, useRef, useCallback, useEffect, createContext } from 'react'
import { AnimatePresence } from 'framer-motion'
import HomePage from './pages/HomePage'
import TimelinePage from './pages/TimelinePage'
import ExplorePage from './pages/ExplorePage'
import './App.css'

export const ContainerContext = createContext({ width: 0, height: 0 })

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [activeYear, setActiveYear] = useState(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const containerRef = useRef(null)

  const updateSize = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setContainerSize({ width: rect.width, height: rect.height })
    }
  }, [])

  useEffect(() => {
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [updateSize])

  const handleSelectYear = useCallback((year) => {
    setActiveYear(year)
    setCurrentView('timeline')
  }, [])

  return (
    <div className="app-wrapper">
      <div className="app" ref={containerRef}>
        <ContainerContext.Provider value={containerSize}>
          <AnimatePresence mode="wait">
            {currentView === 'home' && (
              <HomePage
                key="home"
                onExplore={() => setCurrentView('explore')}
                onStart={() => setCurrentView('timeline')}
              />
            )}
            {currentView === 'explore' && (
              <ExplorePage
                key="explore"
                onClose={() => setCurrentView('home')}
                onSelectYear={handleSelectYear}
              />
            )}
            {currentView === 'timeline' && (
              <TimelinePage
                key="timeline"
                initialYear={activeYear}
                onClose={() => setCurrentView('home')}
              />
            )}
          </AnimatePresence>
        </ContainerContext.Provider>
      </div>
    </div>
  )
}

export default App
