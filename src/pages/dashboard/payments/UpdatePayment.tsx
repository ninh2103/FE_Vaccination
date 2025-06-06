import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useUpdateStatusPaymentMutation } from '@/queries/useMomo'
import { cn } from '@/core/lib/utils'
import {
  PaymentResponseType,
  updateStatusPaymentBodySchema,
  UpdateStatusPaymentBodyType
} from '@/schemaValidator/momo.schema'

interface UpdatePaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  isLoading: boolean
  selectedPayment: PaymentResponseType | null
}

export function UpdatePaymentDialog({ open, onOpenChange, isLoading, selectedPayment }: UpdatePaymentDialogProps) {
  const { mutate: updateStatusPayment } = useUpdateStatusPaymentMutation()

  const form = useForm<UpdateStatusPaymentBodyType>({
    resolver: zodResolver(updateStatusPaymentBodySchema),
    defaultValues: {
      status: selectedPayment?.status ?? 'PENDING'
    }
  })

  const onSubmit = (data: UpdateStatusPaymentBodyType) => {
    if (!selectedPayment?.id) return

    updateStatusPayment(
      { id: selectedPayment.id, body: data },
      {
        onSuccess: () => {
          toast.success(`Thanh toán đã được cập nhật thành công.`)
          onOpenChange(false)
        }
      }
    )
  }

  if (!selectedPayment) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Cập nhật trạng thái thanh toán</DialogTitle>
          <DialogDescription>Thay đổi trạng thái cho {selectedPayment.orderId}</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4'>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='status'>Trạng thái</Label>
            <Select
              value={form.watch('status')}
              onValueChange={(value) => form.setValue('status', value as 'PENDING' | 'COMPLETED' | 'FAILED')}
            >
              <SelectTrigger>{form.watch('status')}</SelectTrigger>
              <SelectContent className='cursor-pointer'>
                <SelectItem value='PENDING'>PENDING</SelectItem>
                <SelectItem value='COMPLETED'>COMPLETED</SelectItem>
                <SelectItem value='FAILED'>FAILED</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)} disabled={isLoading}>
              Hủy bỏ
            </Button>

            <Button type='submit' disabled={isLoading} className={cn(isLoading ? 'opacity-50 cursor-not-allowed' : '')}>
              {isLoading ? <LoadingSpinner className='mr-2 h-4 w-4' /> : null}
              {isLoading ? 'Đang cập nhật...' : 'Cập nhật trạng thái'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
