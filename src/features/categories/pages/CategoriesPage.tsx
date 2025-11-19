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

export const CategoriesPage = () => {
  const { categories, refetch } = useCategories()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

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

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      categoryService.delete(id)
      refetch()
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Manage your income and expense categories
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
          <CardDescription>
            Organize your transactions with categories
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                onDelete={handleDelete}
              />
            </TabsContent>
            <TabsContent value="income" className="mt-4">
              <CategoryList
                categories={incomeCategories}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </TabsContent>
            <TabsContent value="expense" className="mt-4">
              <CategoryList
                categories={expenseCategories}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <CategoryFormModal
        open={isModalOpen}
        onOpenChange={handleOpenChange}
        onSubmit={editingCategory ? handleUpdate : handleCreate}
        category={editingCategory}
      />
    </div>
  )
}

