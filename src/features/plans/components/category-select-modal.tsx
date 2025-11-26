import { useState, useEffect, useMemo } from "react"
import { useForm, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Textarea } from "@components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select"
import { Badge } from "@components/ui/badge"
import { Card, CardContent } from "@components/ui/card"
import { Skeleton } from "@components/ui/skeleton"
import { Search, Plus, Edit2, X } from "lucide-react"
import { categorySchema, type CategoryFormData } from "@core/validation/schemas"
import {
  useGetSelfCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@features/categories"
import type { Category } from "@core/types"
import { showSuccess, showError } from "@lib/toast"

interface CategorySelectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (category: Category) => void
  filterType?: "income" | "expense"
}

export const CategorySelectModal = ({
  open,
  onOpenChange,
  onSelect,
  filterType,
}: CategorySelectModalProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const { data: categoriesResponse, isLoading } = useGetSelfCategoriesQuery(undefined, {
    skip: !open,
  })
  const [createCategory, { isLoading: isCreating_API }] = useCreateCategoryMutation()
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation()

  const categories = useMemo(
    () => categoriesResponse?.categories || [],
    [categoriesResponse]
  )

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema) as Resolver<CategoryFormData>,
    defaultValues: {
      name: "",
      description: "",
      status: "ACTIVE",
      type: filterType ? filterType.toUpperCase() as "INCOME" | "EXPENSE" : "EXPENSE",
      Icon: "",
    },
  })

  useEffect(() => {
    if (open) {
      setIsCreating(false)
      setEditingCategory(null)
      form.reset({
        name: "",
        description: "",
        status: "ACTIVE",
        type: filterType ? filterType.toUpperCase() as "INCOME" | "EXPENSE" : "EXPENSE",
        Icon: "",
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, filterType])

  // Update form when editing
  useEffect(() => {
    if (editingCategory) {
      form.reset({
        name: editingCategory.name,
        description: editingCategory.description || "",
        status: editingCategory.status,
        type: editingCategory.type.toUpperCase() as "INCOME" | "EXPENSE",
        Icon: editingCategory.Icon || "",
      })
      setIsCreating(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingCategory])

  // Filter categories
  const filteredCategories = useMemo(() => {
    return categories.filter((cat: Category) => {
      const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = !filterType || cat.type.toLowerCase() === filterType.toLowerCase()
      return matchesSearch && matchesType
    })
  }, [categories, searchQuery, filterType])

  const handleCreateNew = () => {
    setEditingCategory(null)
    form.reset({
      name: "",
      description: "",
      status: "ACTIVE",
      type: filterType ? filterType.toUpperCase() as "INCOME" | "EXPENSE" : "EXPENSE",
      Icon: "",
    })
    setIsCreating(true)
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
  }

  const handleCancelForm = () => {
    setIsCreating(false)
    setEditingCategory(null)
    form.reset()
  }

  const handleSubmit = async (data: CategoryFormData) => {
    try {
      if (editingCategory) {
        // Update existing category
        await updateCategory({ id: editingCategory.id, data }).unwrap()
        showSuccess("Category updated successfully")
        handleCancelForm()
      } else {
        // Create new category
        await createCategory(data).unwrap()
        showSuccess("Category created successfully")
        handleCancelForm()
      }
    } catch (error) {
      console.error("Error saving category:", error)
      showError("Failed to save category")
    }
  }

  const handleSelectCategory = (category: Category) => {
    onSelect(category)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Category</DialogTitle>
          <DialogDescription>
            Choose a category or create a new one
            {filterType && ` (${filterType} categories only)`}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4">
          {/* Search */}
          {!isCreating && (
            <>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              {isLoading && (
                <div className="space-y-2">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              )}
            </>
          )}

          {/* Create/Edit Form */}
          {isCreating && (
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">
                        {editingCategory ? "Edit Category" : "Create New Category"}
                      </h3>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleCancelForm}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Category name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Category description"
                              rows={2}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              disabled={!!filterType}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="INCOME">Income</SelectItem>
                                <SelectItem value="EXPENSE">Expense</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ACTIVE">Active</SelectItem>
                                <SelectItem value="INACTIVE">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="Icon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Icon Name (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., wallet, shopping-cart" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-2 justify-end">
                      <Button type="button" variant="outline" onClick={handleCancelForm}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isCreating_API || isUpdating}>
                        {isCreating_API || isUpdating
                          ? "Saving..."
                          : editingCategory
                          ? "Update"
                          : "Create"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Categories List */}
          {!isCreating && !isLoading && (
            <>
              <Button
                onClick={handleCreateNew}
                className="w-full"
                variant="outline"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create New Category
              </Button>

              <div className="space-y-2">
                {filteredCategories.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    {searchQuery
                      ? "No categories found"
                      : "No categories available. Create one!"}
                  </p>
                ) : (
                  filteredCategories.map((category) => (
                    <Card
                      key={category.id}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleSelectCategory(category)}
                    >
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {category.Icon && (
                            <div className="text-sm font-medium text-muted-foreground shrink-0">
                              {category.Icon}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{category.name}</p>
                            {category.description && (
                              <p className="text-xs text-muted-foreground truncate">
                                {category.description}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">
                                {category.type}
                              </Badge>
                              <Badge 
                                variant={category.status === "ACTIVE" ? "default" : "secondary"}
                              >
                                {category.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEdit(category)
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </>
          )}
        </div>

        {!isCreating && (
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

