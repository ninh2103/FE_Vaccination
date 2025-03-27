'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Supplier } from './types'

interface UpdateSupplierProps {
  supplier: Supplier
  onUpdate: (supplier: Supplier) => void
  onCancel: () => void
}

export function UpdateSupplier({ supplier, onUpdate, onCancel }: UpdateSupplierProps) {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    established: '',
    contactPerson: '',
    status: 'Active' as Supplier['status'],
    leadTime: '',
    rating: '4.5',
    products: ''
  })

  useEffect(() => {
    setFormData({
      name: supplier.name,
      country: supplier.country,
      address: supplier.address,
      phone: supplier.phone,
      email: supplier.email,
      website: supplier.website,
      established: supplier.established,
      contactPerson: supplier.contactPerson,
      status: supplier.status,
      leadTime: supplier.leadTime,
      rating: supplier.rating.toString(),
      products: supplier.products.join(', ')
    })
  }, [supplier])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const updatedSupplier: Supplier = {
      ...supplier,
      name: formData.name,
      country: formData.country,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      website: formData.website,
      established: formData.established,
      contactPerson: formData.contactPerson,
      status: formData.status,
      leadTime: formData.leadTime,
      rating: Number.parseFloat(formData.rating),
      products: formData.products
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean)
    }
    onUpdate(updatedSupplier)
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Supplier</DialogTitle>
        <DialogDescription>Edit the supplier details below.</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='name'>Supplier Name</Label>
              <Input
                id='name'
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='country'>Country</Label>
              <Input
                id='country'
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                required
              />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='address'>Address</Label>
            <Textarea
              id='address'
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='phone'>Phone Number</Label>
              <Input
                id='phone'
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='website'>Website</Label>
              <Input
                id='website'
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='established'>Established Year</Label>
              <Input
                id='established'
                value={formData.established}
                onChange={(e) => setFormData({ ...formData, established: e.target.value.replace(/[^0-9]/g, '') })}
                placeholder='yyyy'
                maxLength={4}
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='contact-person'>Contact Person</Label>
              <Input
                id='contact-person'
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='status'>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Supplier['status']) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Active'>Active</SelectItem>
                  <SelectItem value='Inactive'>Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='lead-time'>Lead Time</Label>
              <Input
                id='lead-time'
                value={formData.leadTime}
                onChange={(e) => setFormData({ ...formData, leadTime: e.target.value })}
                required
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='rating'>Rating</Label>
              <Select value={formData.rating} onValueChange={(value) => setFormData({ ...formData, rating: value })}>
                <SelectTrigger>
                  <SelectValue placeholder='Select rating' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='5.0'>5.0</SelectItem>
                  <SelectItem value='4.5'>4.5</SelectItem>
                  <SelectItem value='4.0'>4.0</SelectItem>
                  <SelectItem value='3.5'>3.5</SelectItem>
                  <SelectItem value='3.0'>3.0</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='products'>Products (comma separated)</Label>
            <Input
              id='products'
              value={formData.products}
              onChange={(e) => setFormData({ ...formData, products: e.target.value })}
              required
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={onCancel}>
            Cancel
          </Button>
          <Button type='submit'>Update Supplier</Button>
        </DialogFooter>
      </form>
    </>
  )
}
