import { clsx, type ClassValue } from 'clsx'
import { UseFormSetError } from 'react-hook-form'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ApiError extends Error {
  response?: {
    data?: {
      errors?: { field: string; message: string }[]
      message?: string
    }
  }
}

export const handleErrorApi = ({
  error,
  setError,
  duration
}: {
  error: ApiError
  setError?: UseFormSetError<Record<string, string>>
  duration?: number
}) => {
  if (error.response?.data?.errors) {
    error.response.data.errors.forEach(({ field, message }) => {
      setError?.(field, {
        type: 'server',
        message
      })
    })
  } else if (error.response?.data?.message) {
    toast.error(error.response.data.message, { duration: duration ?? 5000 })
  } else {
    toast.error('Đã xảy ra lỗi! Vui lòng thử lại sau.', { duration: duration ?? 5000 })
  }
}
