'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface AlertDialogProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const AlertDialog = ({ children, open, onOpenChange }: AlertDialogProps) => {
  return open ? (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='relative w-full max-w-lg'>{children}</div>
    </div>
  ) : null
}

interface AlertDialogContentProps {
  children: React.ReactNode
  className?: string
}

const AlertDialogContent = ({ children, className }: AlertDialogContentProps) => {
  return (
    <div className={cn('bg-white rounded-lg shadow-lg p-6 w-full max-h-[90vh] overflow-y-auto', className)}>
      {children}
    </div>
  )
}

interface AlertDialogHeaderProps {
  children: React.ReactNode
  className?: string
}

const AlertDialogHeader = ({ children, className }: AlertDialogHeaderProps) => {
  return <div className={cn('flex flex-col space-y-2', className)}>{children}</div>
}

interface AlertDialogTitleProps {
  children: React.ReactNode
  className?: string
}

const AlertDialogTitle = ({ children, className }: AlertDialogTitleProps) => {
  return <h2 className={cn('text-lg font-semibold text-gray-900', className)}>{children}</h2>
}

interface AlertDialogDescriptionProps {
  children: React.ReactNode
  className?: string
}

const AlertDialogDescription = ({ children, className }: AlertDialogDescriptionProps) => {
  return <div className={cn('text-sm text-gray-500', className)}>{children}</div>
}

interface AlertDialogFooterProps {
  children: React.ReactNode
  className?: string
}

const AlertDialogFooter = ({ children, className }: AlertDialogFooterProps) => {
  return <div className={cn('flex justify-end space-x-2 mt-4', className)}>{children}</div>
}

interface AlertDialogActionProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

const AlertDialogAction = ({ children, onClick, disabled, className }: AlertDialogActionProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50',
        className
      )}
    >
      {children}
    </button>
  )
}

interface AlertDialogCancelProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

const AlertDialogCancel = ({ children, onClick, disabled, className }: AlertDialogCancelProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50',
        className
      )}
    >
      {children}
    </button>
  )
}

export {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel
}
