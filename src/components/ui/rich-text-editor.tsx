'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Link
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Nhập nội dung bài viết...',
  className = ''
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value
    }
  }, [])

  const handleContentChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const execCommand = (command: string, value = '') => {
    document.execCommand(command, false, value)
    handleContentChange()
    editorRef.current?.focus()
  }

  return (
    <div className={`border rounded-md overflow-hidden ${isFocused ? 'ring-2 ring-ring' : ''} ${className}`}>
      <div className='flex flex-wrap items-center gap-0.5 p-1 border-b bg-muted/50'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='sm' className='h-8 w-8 p-0' onClick={() => execCommand('bold')}>
                <Bold className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>In đậm</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='sm' className='h-8 w-8 p-0' onClick={() => execCommand('italic')}>
                <Italic className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>In nghiêng</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='sm' className='h-8 w-8 p-0' onClick={() => execCommand('underline')}>
                <Underline className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Gạch chân</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className='h-6 w-px bg-border mx-1' />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                className='h-8 w-8 p-0'
                onClick={() => execCommand('insertUnorderedList')}
              >
                <List className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Danh sách không thứ tự</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                className='h-8 w-8 p-0'
                onClick={() => execCommand('insertOrderedList')}
              >
                <ListOrdered className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Danh sách có thứ tự</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className='h-6 w-px bg-border mx-1' />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='sm' className='h-8 w-8 p-0' onClick={() => execCommand('justifyLeft')}>
                <AlignLeft className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Căn trái</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='sm' className='h-8 w-8 p-0' onClick={() => execCommand('justifyCenter')}>
                <AlignCenter className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Căn giữa</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='ghost' size='sm' className='h-8 w-8 p-0' onClick={() => execCommand('justifyRight')}>
                <AlignRight className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Căn phải</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className='h-6 w-px bg-border mx-1' />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                className='h-8 w-8 p-0'
                onClick={() => execCommand('formatBlock', '<h1>')}
              >
                <Heading1 className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tiêu đề lớn</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                className='h-8 w-8 p-0'
                onClick={() => execCommand('formatBlock', '<h2>')}
              >
                <Heading2 className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tiêu đề nhỏ</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                className='h-8 w-8 p-0'
                onClick={() => {
                  const url = prompt('Nhập URL liên kết:')
                  if (url) execCommand('createLink', url)
                }}
              >
                <Link className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chèn liên kết</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div
        ref={editorRef}
        contentEditable
        className='min-h-[200px] p-3 focus:outline-none'
        onInput={handleContentChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        dangerouslySetInnerHTML={{ __html: value || '' }}
      />
    </div>
  )
}
