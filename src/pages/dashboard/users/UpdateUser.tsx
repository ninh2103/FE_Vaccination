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
import { useUpdateRoleMutation } from '@/queries/useAuth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateRoleBody, UpdateRoleBodyType } from '@/schemaValidator/user.schema'
import { toast } from 'sonner'
import { useRoleListQuery } from '@/queries/useRole'
import { useDetailUserQuery } from '@/queries/useUser'
import type { User } from './UserTable'

interface UpdateUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  isLoading: boolean
  selectedUser: User | null
}

export function UpdateUserDialog({ open, onOpenChange, isLoading, selectedUser }: UpdateUserDialogProps) {
  const { mutate: updateRole, isPending: isUpdatingRole } = useUpdateRoleMutation()
  const { data: roles } = useRoleListQuery()
  const { data: user } = useDetailUserQuery(selectedUser?.id?.toString() ?? '')

  const form = useForm<UpdateRoleBodyType>({
    resolver: zodResolver(UpdateRoleBody),
    defaultValues: {
      roleId: roles?.data.find((role) => role.name === user?.role.name)?.id ?? ''
    }
  })

  const onSubmit = (data: UpdateRoleBodyType) => {
    if (!selectedUser?.id) return

    updateRole(
      { id: selectedUser.id.toString(), body: data },
      {
        onSuccess: () => {
          toast.success('User role has been updated successfully.')
          onOpenChange(false)
        }
      }
    )
  }

  if (!selectedUser) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Update User Role</DialogTitle>
          <DialogDescription>Change the role for {selectedUser.name}</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4'>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='role'>Role</Label>
            <Select value={form.watch('roleId')} onValueChange={(value) => form.setValue('roleId', value)}>
              <SelectTrigger>
                {roles?.data.find((role) => role.id === form.watch('roleId'))?.name || user?.role.name}
              </SelectTrigger>

              <SelectContent>
                {roles?.data.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type='button' variant='outline' onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type='submit' disabled={isLoading || isUpdatingRole}>
              {isLoading || isUpdatingRole ? <LoadingSpinner className='mr-2 h-4 w-4' /> : null}
              {isLoading || isUpdatingRole ? 'Updating...' : 'Update Role'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
