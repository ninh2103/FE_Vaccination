'use client'

import type React from 'react'

import { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageUploadProps {
  onImageUpload: (file: File) => void
  onImageRemove: () => void
  previewUrl?: string
}

export function ImageUpload({ onImageUpload, onImageRemove, previewUrl }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string | undefined>(previewUrl)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      handleFile(file)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      handleFile(file)
    }
  }

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      alert('Vui lòng chọn một tệp hình ảnh')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreview(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)

    // Pass file to parent
    onImageUpload(file)
  }

  const removeImage = () => {
    setPreview(undefined)
    if (inputRef.current) inputRef.current.value = ''
    onImageRemove()
  }

  return (
    <div className='w-full'>
      {!preview ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
            dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input ref={inputRef} type='file' className='hidden' accept='image/*' onChange={handleChange} />
          <div className='flex flex-col items-center justify-center gap-2'>
            <div className='p-2 rounded-full bg-muted'>
              <Upload className='h-6 w-6 text-muted-foreground' />
            </div>
            <p className='text-sm font-medium'>Kéo thả hoặc nhấp để tải lên</p>
            <p className='text-xs text-muted-foreground'>Hỗ trợ JPG, PNG, GIF</p>
          </div>
        </div>
      ) : (
        <div className='relative rounded-lg overflow-hidden border'>
          <img src={preview || '/placeholder.svg'} alt='Preview' className='w-full h-48 object-cover' />
          <Button
            variant='destructive'
            size='icon'
            className='absolute top-2 right-2 h-8 w-8 rounded-full'
            onClick={(e) => {
              e.stopPropagation()
              removeImage()
            }}
          >
            <X className='h-4 w-4' />
          </Button>
        </div>
      )}
    </div>
  )
}
