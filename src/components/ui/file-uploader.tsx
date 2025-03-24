'use client'

import type React from 'react'
import { useState, useRef } from 'react'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/core/lib/utils'

interface FileUploaderProps {
  onFileUpload: (file: File) => void
  currentImage: string | null
  accept?: string
  maxSize?: number // in MB
  className?: string
}

export function FileUploader({
  onFileUpload,
  currentImage,
  accept = 'image/*',
  maxSize = 5, // Default 5MB
  className
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const validateFile = (file: File): boolean => {
    // Check file type
    if (accept !== '*' && !file.type.match(accept.replace('*', ''))) {
      setError(`Invalid file type. Please upload ${accept.replace('*', '')} files.`)
      return false
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit.`)
      return false
    }

    setError(null)
    return true
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (validateFile(file)) {
        onFileUpload(file)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (validateFile(file)) {
        onFileUpload(file)
      }
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleRemoveImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onFileUpload(new File([''], 'empty.png', { type: 'image/png' }))
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {currentImage ? (
        <div className='relative w-fit'>
          <img
            src={currentImage || '/placeholder.svg'}
            alt='Preview'
            className='h-32 w-32 rounded-md object-cover border'
          />
          <Button
            variant='destructive'
            size='icon'
            className='absolute -right-2 -top-2 h-6 w-6 rounded-full'
            onClick={handleRemoveImage}
          >
            <X className='h-4 w-4' />
          </Button>
        </div>
      ) : (
        <div
          className={cn(
            'flex flex-col items-center justify-center rounded-md border-2 border-dashed p-6 transition-colors',
            isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25',
            'cursor-pointer'
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <Upload className='mb-2 h-8 w-8 text-muted-foreground' />
          <p className='mb-1 text-sm font-medium'>Drag & drop or click to upload</p>
          <p className='text-xs text-muted-foreground'>
            Supports {accept.replace('*', '')} (Max {maxSize}MB)
          </p>
        </div>
      )}
      {error && <p className='text-sm text-destructive'>{error}</p>}
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className='hidden'
        aria-label='File upload'
      />
    </div>
  )
}
