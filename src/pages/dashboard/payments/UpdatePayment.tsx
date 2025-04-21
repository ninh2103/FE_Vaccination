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
import { useDetailPaymentQuery, useUpdateStatusPaymentMutation } from '@/queries/useMomo'
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
  const { data: payment } = useDetailPaymentQuery(selectedPayment?.id ?? '')

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
          toast.success(`Payment has been updated successfully.`)
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
          <DialogTitle>Update Payment Status</DialogTitle>
          <DialogDescription>Change the status for {selectedPayment.orderId}</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4'>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='status'>Status</Label>
            <Select
              value={form.watch('status')}
              onValueChange={(value) => form.setValue('status', value as 'PENDING' | 'COMPLETED' | 'FAILED')}
            >
              <SelectTrigger>{payment?.status}</SelectTrigger>
              <SelectContent className='cursor-pointer'>
                <SelectItem value='PENDING'>PENDING</SelectItem>
                <SelectItem value='COMPLETED'>COMPLETED</SelectItem>
                <SelectItem value='FAILED'>FAILED</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>

            <Button type='submit' disabled={isLoading} className={cn(isLoading ? 'opacity-50 cursor-not-allowed' : '')}>
              {isLoading ? <LoadingSpinner className='mr-2 h-4 w-4' /> : null}
              {isLoading ? 'Updating...' : 'Update Status'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
