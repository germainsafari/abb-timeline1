import { useRef, useState, useCallback, useContext } from 'react'
import { ContainerContext } from '../App'
import { resolveAssetSrc } from '../config'
import './EditableImage.css'

export default function EditableImage({ image, isEditing, onUpdate, onDelete }) {
  const container = useContext(ContainerContext)
  const wrapperRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [resizing, setResizing] = useState(false)
  const dragStart = useRef({ x: 0, y: 0, imgX: 0, imgY: 0 })
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 })

  const pxX = (image.x / 100) * container.width
  const pxY = (image.y / 100) * container.height
  const pxW = (image.width / 100) * container.width
  const pxH = (image.height / 100) * container.height

  const handleDragStart = useCallback((e) => {
    if (!isEditing || resizing) return
    e.preventDefault()
    const touch = e.touches?.[0] || e
    dragStart.current = { x: touch.clientX, y: touch.clientY, imgX: pxX, imgY: pxY }
    setDragging(true)

    const handleMove = (ev) => {
      const t = ev.touches?.[0] || ev
      const dx = t.clientX - dragStart.current.x
      const dy = t.clientY - dragStart.current.y
      const newPxX = dragStart.current.imgX + dx
      const newPxY = dragStart.current.imgY + dy
      onUpdate({
        x: (newPxX / container.width) * 100,
        y: (newPxY / container.height) * 100,
      })
    }
    const handleEnd = () => {
      setDragging(false)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('touchend', handleEnd)
    }
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleEnd)
    window.addEventListener('touchmove', handleMove, { passive: false })
    window.addEventListener('touchend', handleEnd)
  }, [isEditing, resizing, pxX, pxY, container, onUpdate])

  const handleResizeStart = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    const touch = e.touches?.[0] || e
    resizeStart.current = { x: touch.clientX, y: touch.clientY, w: pxW, h: pxH }
    setResizing(true)

    const aspect = pxW / pxH

    const handleMove = (ev) => {
      ev.preventDefault()
      const t = ev.touches?.[0] || ev
      const dx = t.clientX - resizeStart.current.x
      const newPxW = Math.max(40, resizeStart.current.w + dx)
      const newPxH = newPxW / aspect
      onUpdate({
        width: (newPxW / container.width) * 100,
        height: (newPxH / container.height) * 100,
      })
    }
    const handleEnd = () => {
      setResizing(false)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('touchend', handleEnd)
    }
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleEnd)
    window.addEventListener('touchmove', handleMove, { passive: false })
    window.addEventListener('touchend', handleEnd)
  }, [pxW, pxH, container, onUpdate])

  return (
    <div
      ref={wrapperRef}
      className={`editable-image ${isEditing ? 'editing' : ''} ${dragging ? 'dragging' : ''}`}
      style={{
        left: `${image.x}%`,
        top: `${image.y}%`,
        width: pxW,
      }}
      onMouseDown={isEditing ? handleDragStart : undefined}
      onTouchStart={isEditing ? handleDragStart : undefined}
    >
      <img
        src={resolveAssetSrc(image.src)}
        alt={image.caption || ''}
        style={{ width: pxW, height: pxH }}
        draggable={false}
      />

      {image.caption && (
        <div className="image-caption">
          {isEditing ? (
            <input
              type="text"
              value={image.caption}
              onChange={(e) => onUpdate({ caption: e.target.value })}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className="caption-input"
            />
          ) : (
            <span>{image.caption}</span>
          )}
        </div>
      )}

      {isEditing && !image.caption && (
        <div className="image-caption">
          <input
            type="text"
            value=""
            placeholder="Add caption..."
            onChange={(e) => onUpdate({ caption: e.target.value })}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="caption-input"
          />
        </div>
      )}

      {isEditing && (
        <>
          <button
            className="img-delete-btn"
            onClick={(e) => { e.stopPropagation(); onDelete() }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            ×
          </button>
          <div
            className="img-resize-handle"
            onMouseDown={handleResizeStart}
            onTouchStart={handleResizeStart}
          />
        </>
      )}
    </div>
  )
}
