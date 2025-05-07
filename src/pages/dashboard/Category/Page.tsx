import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Download, RefreshCw } from 'lucide-react'
import { CategoryTable, type Category } from './CategoryTable'
import { AddCategory } from './AddCategory'
import { UpdateCategory } from './UpdateCategory'
import * as XLSX from 'xlsx'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useDeleteCategoryMutation, useListCategoryQuery } from '@/queries/useCategory'
import { toast } from 'sonner'
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DialogContent } from '@/components/ui/dialog'

export const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(10)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isExporting, setIsExporting] = useState(false)
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    refetch
  } = useListCategoryQuery({
    page: currentPage,
    items_per_page: rowsPerPage,
    search: searchQuery
  })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [openViewDialog, setOpenViewDialog] = useState(false)

  const { mutate: deleteCategory } = useDeleteCategoryMutation()

  useEffect(() => {
    if (categoriesData?.data) {
      const transformedCategories = categoriesData.data.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description
      }))
      setCategories(transformedCategories)
    }
  }, [categoriesData])

  const handleAddCategory = (newCategory: Omit<Category, 'id'>) => {
    const category: Category = {
      ...newCategory,
      id: Date.now().toString()
    }
    setCategories((prev) => [...prev, category])
    setIsAddDialogOpen(false)
  }

  const handleDeleteCategory = (id: string) => {
    const category = categories.find((c) => c.id === id)
    if (category) {
      setSelectedCategory(category)
      setOpenDeleteDialog(true)
    }
  }

  const handleConfirmDelete = () => {
    if (!selectedCategory) return
    deleteCategory(selectedCategory.id, {
      onSuccess: () => {
        setCategories(categories.filter((category) => category.id !== selectedCategory.id))
        setOpenDeleteDialog(false)
        setSelectedCategory(null)
        toast.success('Danh mục đã được xóa thành công.')
      }
    })
  }

  const handleViewCategory = (id: string) => {
    const category = categoriesData?.data.find((c) => c.id === id)
    if (category) {
      setSelectedCategory(category)
      setOpenViewDialog(true)
    }
  }

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category)
    setIsUpdateDialogOpen(true)
  }

  const handleExportExcel = () => {
    setIsExporting(true)
    setTimeout(() => {
      const exportData = categories.map((category) => ({
        Name: category.name,
        Description: category.description
      }))

      const ws = XLSX.utils.json_to_sheet(exportData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Categories')
      XLSX.writeFile(wb, 'categories.xlsx')
      setIsExporting(false)
      toast.success('Xuất dữ liệu thành công.')
    }, 1000)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    refetch().finally(() => {
      setSearchQuery('')
      setCurrentPage(1)
      setIsRefreshing(false)
      toast.success('Dữ liệu mới đã được cập nhật.')
    })
  }

  const totalPages = Math.ceil((categoriesData?.total ?? 0) / rowsPerPage)
  const totalItems = categoriesData?.total ?? 0
  const startIndex = (currentPage - 1) * rowsPerPage + 1
  const endIndex = Math.min(startIndex + rowsPerPage - 1, totalItems)

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-500 to-teal-500'>
            Loại vắc xin
          </h1>
          <p className='text-muted-foreground'>Quản lý và theo dõi loại vắc xin trong hệ thống.</p>
        </div>
      </div>

      <div className='mb-6 py-6 flex items-center justify-between'>
        <div className='flex items-center gap-4 w-full'>
          <div className='relative w-full max-w-sm'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Tìm kiếm...'
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
              }}
              className='w-full'
              type='search'
            />
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='h-9' onClick={handleExportExcel} disabled={isExporting}>
            {isExporting ? <LoadingSpinner className='mr-2 h-4 w-4' /> : <Download className='mr-2 h-4 w-4' />}
            Xuất dữ liệu
          </Button>
          <Button variant='outline' size='sm' className='h-9' onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? <LoadingSpinner className='mr-2 h-4 w-4' /> : <RefreshCw className='mr-2 h-4 w-4' />}
            Cập nhật
          </Button>
          <Button size='sm' onClick={() => setIsAddDialogOpen(true)}>
            <Plus className='mr-2 h-4 w-4' />
            Thêm mới
          </Button>
        </div>
      </div>

      <div className='space-y-4'>
        <CategoryTable
          categories={categories}
          onView={handleViewCategory}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
          isLoading={isLoadingCategories}
        />

        {totalPages > 1 && (
          <div className='flex items-center justify-between px-2'>
            <div className='flex-1 text-sm text-muted-foreground'>
              Hiển thị {startIndex} đến {endIndex} của {totalItems} mục
            </div>
            <div className='flex items-center space-x-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Trang trước
              </Button>
              <div className='flex items-center gap-1'>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => setCurrentPage(page)}
                    className='min-w-[2.5rem]'
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Trang tiếp
              </Button>
            </div>
          </div>
        )}
      </div>

      <AddCategory open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onSubmit={handleAddCategory} />

      <UpdateCategory open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen} id={selectedCategory?.id ?? ''} />

      <Dialog open={openViewDialog} onOpenChange={setOpenViewDialog}>
        <DialogContent className='sm:max-w-[600px]'>
          <DialogHeader>
            <DialogTitle>Chi tiết loại vắc xin</DialogTitle>
          </DialogHeader>
          <div className='py-4'>
            {selectedCategory && (
              <div className='space-y-4'>
                <div>
                  <h3 className='text-sm font-medium text-muted-foreground'>Tên</h3>
                  <p className='text-lg font-medium'>{selectedCategory.name}</p>
                </div>
                <div>
                  <h3 className='text-sm font-medium text-muted-foreground'>Mô tả</h3>
                  <p className='text-lg'>{selectedCategory.description}</p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenViewDialog(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Xóa danh mục</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa danh mục này không? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <div className='py-4'>
            {selectedCategory && (
              <div className='flex items-center gap-4'>
                <div>
                  <p className='font-medium'>{selectedCategory.name}</p>
                  <p className='text-sm text-muted-foreground'>{selectedCategory.description}</p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setOpenDeleteDialog(false)} disabled={isLoadingCategories}>
              Hủy bỏ
            </Button>
            <Button variant='destructive' onClick={handleConfirmDelete} disabled={isLoadingCategories}>
              {isLoadingCategories ? <LoadingSpinner className='mr-2 h-4 w-4' /> : null}
              {isLoadingCategories ? 'Đang xóa...' : 'Xóa'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
