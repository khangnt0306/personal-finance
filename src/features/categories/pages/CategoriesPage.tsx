import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Button } from "@components/ui/button"
import { Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"
import { CategoryList } from "../components/category-list"
import { CategoryFormModal } from "../components/category-form-modal"
import { useCategories } from "../hooks/useCategories"
import { categoryService } from "../services/category.service"
import type { CategoryFormData } from "@core/validation/schemas"
import type { Category } from "@core/types"
import { Skeleton } from "@components/ui/skeleton"
import { Badge } from "@components/ui/badge"
import { Separator } from "@components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@components/ui/alert-dialog"

export const CategoriesPage = () => {
  const { categories, refetch, loading } = useCategories()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)

  const incomeCategories = categories.filter((cat) => cat.type === "INCOME")
  const expenseCategories = categories.filter((cat) => cat.type === "EXPENSE")

  const handleCreate = (data: CategoryFormData) => {
    categoryService.create(data)
    refetch()
  }

  const handleUpdate = (data: CategoryFormData) => {
    if (editingCategory) {
      categoryService.update(editingCategory.id, data)
      refetch()
      setEditingCategory(null)
    }
  }

  const handleDeleteClick = (id: string) => {
    setCategoryToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (categoryToDelete) {
      categoryService.delete(categoryToDelete)
      refetch()
      setCategoryToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setIsModalOpen(true)
  }

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open)
    if (!open) {
      setEditingCategory(null)
    }
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Danh mục</h1>
            <p className="text-muted-foreground">
              Quản lý các danh mục thu và chi của bạn
            </p>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Thêm danh mục
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tạo danh mục thu hoặc chi mới</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tất cả danh mục</CardTitle>
                <CardDescription>
                  Sắp xếp giao dịch rõ ràng bằng danh mục
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{incomeCategories.length} Thu nhập</Badge>
                <Separator orientation="vertical" className="h-4" />
                <Badge variant="outline">{expenseCategories.length} Chi tiêu</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : (
              <Tabs defaultValue="all" className="w-full">
                <TabsList>
                  <TabsTrigger value="all">Tất cả</TabsTrigger>
                  <TabsTrigger value="income">Thu nhập</TabsTrigger>
                  <TabsTrigger value="expense">Chi tiêu</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4">
                  <CategoryList
                    categories={categories}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                </TabsContent>
                <TabsContent value="income" className="mt-4">
                  <CategoryList
                    categories={incomeCategories}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                </TabsContent>
                <TabsContent value="expense" className="mt-4">
                  <CategoryList
                    categories={expenseCategories}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Bạn có chắc không?</AlertDialogTitle>
              <AlertDialogDescription>
                Hành động này không thể hoàn tác và sẽ xoá vĩnh viễn danh mục, ảnh hưởng đến các giao dịch liên quan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Huỷ</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>Xoá</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <CategoryFormModal
          open={isModalOpen}
          onOpenChange={handleOpenChange}
          onSubmit={editingCategory ? handleUpdate : handleCreate}
          category={editingCategory}
        />
      </div>
    </TooltipProvider>
  )
}

