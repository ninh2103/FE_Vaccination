import { clsx, type ClassValue } from 'clsx'
import { UseFormReturn, UseFormSetError } from 'react-hook-form'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import { Path } from 'react-hook-form'

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

export const handleErrorApi = <T extends Record<string, unknown>>({
  error,
  setError,
  duration
}: {
  error: ApiError
  setError: UseFormSetError<T>
  duration?: number
}) => {
  if (error.response?.data?.errors) {
    error.response.data.errors.forEach(({ field, message }) => {
      setError?.(field as Path<T>, {
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
export const formatVND = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

export function convertDateFormat(inputDate: string): string {
  const dateParts = inputDate.split('-')
  if (dateParts.length !== 3) {
    throw new Error('Ngày không hợp lệ. Định dạng đúng là YYYY-MM-DD')
  }

  const [year, month, day] = dateParts
  return `${day}/${month}/${year}`
}
export const handleEditorChange = (content: string, form: UseFormReturn<any>) => {
  form.setValue('content', content, { shouldValidate: true })
}
