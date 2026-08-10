import { useState, useEffect, useRef, useCallback, useContext } from 'react'
import { ContainerContext } from '../App'
import { API_BASE, resolveAssetSrc } from '../config'
import EditableImage from './EditableImage'
import './YearContent.css'

const API = `${API_BASE}/api`

export default function YearContent({ year, isEditing }) {
  const container = useContext(ContainerContext)
  const [data, setData] = useState(null)
  const [saving, setSaving] = useState(false)
  const fileInputRef = useRef(null)
  const funfactFileRef = useRef(null)
  const saveTimeout = useRef(null)

  useEffect(() => {
    fetch(`/data/${year}/content.json`)
      .then((r) => {
        if (!r.ok) throw new Error('Not found')
        return r.json()
      })
      .then(setData)
      .catch(() => {
        fetch(`${API}/years/${year}`)
          .then((r) => r.json())
          .then(setData)
          .catch(() => {
            setData({ title: '', text: '', funFact: '', funFactSource: '', images: [] })
          })
      })
  }, [year])

  const persistData = useCallback((updated) => {
    setData(updated)
    clearTimeout(saveTimeout.current)
    saveTimeout.current = setTimeout(() => {
      setSaving(true)
      fetch(`${API}/years/${year}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      }).finally(() => setSaving(false))
    }, 500)
  }, [year])

  const updateField = useCallback((field, value) => {
    const updated = { ...data, [field]: value }
    persistData(updated)
  }, [data, persistData])

  const updateImage = useCallback((imageId, changes) => {
    const updated = {
      ...data,
      images: data.images.map((img) =>
        img.id === imageId ? { ...img, ...changes } : img
      ),
    }
    persistData(updated)
  }, [data, persistData])

  const deleteImage = useCallback((imageId) => {
    fetch(`${API}/years/${year}/images/${imageId}`, { method: 'DELETE' })
    const updated = {
      ...data,
      images: data.images.filter((img) => img.id !== imageId),
    }
    persistData(updated)
  }, [data, year, persistData])

  const handleUpload = useCallback(async (e) => {
    const file = e.target.files?.[0]
    if (!file || !container.width) return

    const dims = await new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const maxPxW = container.width * 0.35
        const scale = img.naturalWidth > maxPxW ? maxPxW / img.naturalWidth : 1
        const pxW = img.naturalWidth * scale
        const pxH = img.naturalHeight * scale
        resolve({
          width: (pxW / container.width) * 100,
          height: (pxH / container.height) * 100,
        })
        URL.revokeObjectURL(img.src)
      }
      img.src = URL.createObjectURL(file)
    })

    const formData = new FormData()
    formData.append('image', file)
    formData.append('width', dims.width)
    formData.append('height', dims.height)
    const res = await fetch(`${API}/years/${year}/images`, {
      method: 'POST',
      body: formData,
    })
    const newImage = await res.json()
    setData((prev) => ({ ...prev, images: [...prev.images, newImage] }))
    e.target.value = ''
  }, [year, container])

  const handleFunfactUpload = useCallback(async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append('image', file)
    const res = await fetch(`${API}/years/${year}/funfact-image`, {
      method: 'POST',
      body: formData,
    })
    const { src } = await res.json()
    setData((prev) => ({ ...prev, funFactImage: src }))
    e.target.value = ''
  }, [year])

  if (!data) return null

  return (
    <div className="year-content">
      {saving && <div className="save-indicator">Saving...</div>}

      <div className="yc-top-section">
        {/* Year number */}
        <div className="yc-year-number">
          {String(year).split('').map((digit, i) => (
            <span key={i}>{digit}</span>
          ))}
        </div>

        {/* Title — multiline */}
        <div className="yc-title-section">
          {isEditing ? (
            <textarea
              className="yc-editable-textarea yc-title-input"
              value={data.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Title for this year..."
              rows={3}
            />
          ) : (
            data.title && (
              <h2 className="yc-title">
                {data.title.split('\n').map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </h2>
            )
          )}
        </div>

        {/* Main text — starts right after the title */}
        <div className="yc-text-section">
          {isEditing ? (
            <textarea
              className="yc-editable-textarea"
              value={data.text}
              onChange={(e) => updateField('text', e.target.value)}
              placeholder="Main text for this year..."
              rows={6}
            />
          ) : (
            data.text && <p className="yc-text">{data.text}</p>
          )}
        </div>
      </div>

      {/* Fun Fact — anchored to bottom, above timeline nav */}
      <div className="yc-funfact-section">
        {isEditing ? (
          <div className="yc-funfact-edit">
            <span className="yc-funfact-label">FUN FACT!</span>
            <textarea
              className="yc-editable-textarea yc-funfact-textarea"
              value={data.funFact}
              onChange={(e) => updateField('funFact', e.target.value)}
              placeholder="Fun fact text..."
              rows={3}
            />
            {data.funFactImage && (
              <div className="yc-funfact-image">
                <img src={resolveAssetSrc(data.funFactImage)} alt="" />
              </div>
            )}
            <button
              className="yc-funfact-upload-btn"
              onClick={() => funfactFileRef.current?.click()}
            >
              {data.funFactImage ? 'Replace image' : '+ Add image'}
              <input
                ref={funfactFileRef}
                type="file"
                accept="image/*"
                onChange={handleFunfactUpload}
                style={{ display: 'none' }}
              />
            </button>
            <input
              type="text"
              className="yc-editable-input yc-source-input"
              value={data.funFactSource}
              onChange={(e) => updateField('funFactSource', e.target.value)}
              placeholder="Source: ..."
            />
          </div>
        ) : (
          data.funFact && (
            <div className="yc-funfact">
              <span className="yc-funfact-label">FUN FACT!</span>
              <p className="yc-funfact-text">{data.funFact}</p>
              {data.funFactImage && (
                <div className="yc-funfact-image">
                  <img src={resolveAssetSrc(data.funFactImage)} alt="" />
                </div>
              )}
              {data.funFactSource && (
                <span className="yc-funfact-source">{data.funFactSource}</span>
              )}
            </div>
          )
        )}
      </div>

      {/* Positioned images */}
      <div className="yc-images-layer">
        {data.images.map((img) => (
          <EditableImage
            key={img.id}
            image={img}
            isEditing={isEditing}
            onUpdate={(changes) => updateImage(img.id, changes)}
            onDelete={() => deleteImage(img.id)}
          />
        ))}
      </div>

      {/* Upload button in edit mode */}
      {isEditing && (
        <button
          className="yc-upload-btn"
          onClick={() => fileInputRef.current?.click()}
        >
          + Add Image
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            style={{ display: 'none' }}
          />
        </button>
      )}
    </div>
  )
}
