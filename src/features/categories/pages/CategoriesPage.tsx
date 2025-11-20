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

  const incomeCategories = categories.filter((cat) => cat.type === "income")
  const expenseCategories = categories.filter((cat) => cat.type === "expense")

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
            <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
            <p className="text-muted-foreground">
              Manage your income and expense categories
            </p>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create a new income or expense category</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Categories</CardTitle>
                <CardDescription>
                  Organize your transactions with categories
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{incomeCategories.length} Income</Badge>
                <Separator orientation="vertical" className="h-4" />
                <Badge variant="outline">{expenseCategories.length} Expense</Badge>
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
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="income">Income</TabsTrigger>
                  <TabsTrigger value="expense">Expense</TabsTrigger>
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
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the category and may affect associated transactions.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
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

