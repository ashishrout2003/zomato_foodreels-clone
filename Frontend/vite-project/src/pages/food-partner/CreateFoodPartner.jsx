import React, { useState, useRef } from 'react'
import './CreateFoodPartner.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateFood = () => {
  const [videoName, setVideoName] = useState('')
  const [previewUrl, setPreviewUrl] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const fileInputRef = useRef(null)
  const navigate = useNavigate();

  function handleVideoChange(e) {
    const file = e.target.files && e.target.files[0]
    if (file) {
      setVideoName(file.name)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setSelectedFile(file)
    } else {
      setVideoName('')
      setPreviewUrl(null)
      setSelectedFile(null)
    }
  }

  function handleDrop(e) {
    e.preventDefault()
    const file = e.dataTransfer.files && e.dataTransfer.files[0]
    if (file) {
      setVideoName(file.name)
      setPreviewUrl(URL.createObjectURL(file))
      setSelectedFile(file)
    }
    e.currentTarget.classList.remove('dragover')
  }

  function handleDragOver(e) {
    e.preventDefault()
    e.currentTarget.classList.add('dragover')
  }

  function handleDragLeave(e) {
    e.currentTarget.classList.remove('dragover')
  }

  function clearVideo() {
    setVideoName('')
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = null
    }
    setSelectedFile(null)
  }

  async function handleSubmit (e) {
    e.preventDefault();

    // prefer selectedFile from state (works for drag/drop and input)
    const file = selectedFile || (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0])
    if (!file) {
      alert('Please select a video file before submitting.')
      return
    }

    const formData = new FormData();
    formData.append('name', name)
    formData.append('description', description)
    formData.append('video', file)

    try{
      const response = await axios.post('http://localhost:3000/api/food', formData, {
        withCredentials: true,
      })
      console.log('Create response', response.data)
      alert('Food created')
      // reset form
      setName('')
      setDescription('')
      clearVideo()
      navigate('/')
    }catch(err){
      console.error('Create food error', err)
      const msg = err?.response?.data?.message || err.message || 'Request failed'
      alert('Error: ' + msg)
    }
  }

  return (
    <div className="cfp-page">
      <form className="cfp-card" onSubmit={handleSubmit}>
        <h2 className="cfp-title">Create Food Video</h2>

        <label className="cfp-label">Upload video</label>

        <div
          className="cfp-file-drop"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          role="button"
          tabIndex={0}
        >
          <svg className="cfp-file-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" aria-hidden>
            <path fill="currentColor" d="M4 6a2 2 0 0 1 2-2h8l4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z" opacity="0.12"/>
            <path fill="currentColor" d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path fill="currentColor" d="M10 13.5l4-2.5v6l-4-2.5z" />
          </svg>
          <div className="cfp-file-drop-text">Click or drag a video here</div>
          <div className="cfp-file-drop-sub">MP4, MOV — small preview shown</div>
        </div>

        <input
          ref={fileInputRef}
          className="cfp-input-file"
          id="video"
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          style={{ display: 'none' }}
        />

        {videoName && (
          <div className="cfp-filename-row">
            <div className="cfp-filename">Selected: {videoName}</div>
            <button type="button" className="cfp-clear" onClick={clearVideo} aria-label="Clear video">
              <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        )}

        {previewUrl && (
          <div className="cfp-preview">
            <video src={previewUrl} controls />
          </div>
        )}

        <label className="cfp-label" htmlFor="name">Name</label>
        <input
          id="name"
          className="cfp-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Dish or video title"
        />

        <label className="cfp-label" htmlFor="description">Description</label>
        <textarea
          id="description"
          className="cfp-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description"
          rows={4}
        />

        <button type="submit" className="cfp-button">Create</button>
      </form>
    </div>
  )
}

export default CreateFood