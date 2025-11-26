import { useState, useEffect } from "react"
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
  FormDescription,
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
import { Switch } from "@components/ui/switch"
import { FolderOpen } from "lucide-react"
import { planItemSchema, type PlanItemFormData } from "../validation/plan.schemas"
import type { PlanItem } from "../types"
import type { Category } from "@core/types"
import { CategorySelectModal } from "./category-select-modal"
import { useGetSelfCategoriesQuery } from "@features/categories"
import { formatNumber, parseFormattedNumber } from "@core/utils/format"

interface PlanItemFormModalProps {
  open: boolean
  planId: string
  item?: PlanItem | null
  onOpenChange: (open: boolean) => void
  onSubmit: (data: PlanItemFormData) => void
  isSubmitting?: boolean
}

export const PlanItemFormModal = ({
  open,
  item,
  onOpenChange,
  onSubmit,
  isSubmitting = false,
}: PlanItemFormModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

  const { data: categoriesResponse } = useGetSelfCategoriesQuery(undefined, {
    skip: !open,
  })

  const form = useForm<PlanItemFormData>({
    resolver: zodResolver(planItemSchema) as Resolver<PlanItemFormData>,
    defaultValues: {
      name: "",
      amount: 0,
      description: "",
      type: "EXPENSE",
      excludeType: "FIXED",
      categoryId: "",
      isDailyBased: false,
      minimumPercentage: undefined,
    },
  })

  const watchType = form.watch("type")
  const watchExcludeType = form.watch("excludeType")
  const showMinimumPercentage = watchType === "EXPENSE" && watchExcludeType === "FLEXIBLE"

  // Load category when form opens or item changes
  useEffect(() => {
    if (open) {
      if (item) {
        form.reset({
          name: item.name,
          amount: typeof item.amount === "string" ? parseFloat(item.amount) : item.amount,
          description: item.description || "",
          type: item.type,
          excludeType: item.excludeType,
          categoryId: item.categoryId,
          isDailyBased: item.isDailyBased,
          minimumPercentage: item.minimumPercentage ? 
            (typeof item.minimumPercentage === "string" ? parseFloat(item.minimumPercentage) : item.minimumPercentage) 
            : undefined,
        })
        // Load category from API response
        if (categoriesResponse?.categories) {
          const category = categoriesResponse.categories.find((c) => c.id === item.categoryId)
          setSelectedCategory(category || null)
        }
      } else {
        form.reset({
          name: "",
          amount: 0,
          description: "",
          type: "EXPENSE",
          excludeType: "FIXED",
          categoryId: "",
          isDailyBased: false,
          minimumPercentage: undefined,
        })
        setSelectedCategory(null)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, item, categoriesResponse])

  // Clear minimumPercentage when conditions change
  useEffect(() => {
    if (!showMinimumPercentage) {
      form.setValue("minimumPercentage", undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMinimumPercentage])

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category)
    form.setValue("categoryId", category.id)
    form.clearErrors("categoryId")
  }

  const handleSubmit = (data: PlanItemFormData) => {
    onSubmit(data)
  }

  const getFilterType = (): "income" | "expense" | undefined => {
    if (watchType === "INCOME") return "income"
    if (watchType === "EXPENSE") return "expense"
    return undefined
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{item ? "Edit Plan Item" : "Create Plan Item"}</DialogTitle>
            <DialogDescription>
              {item
                ? "Update the plan item details"
                : "Add a new item to your financial plan"}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Monthly Salary, Rent, Groceries" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Amount */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="0"
                        value={formatNumber(field.value)}
                        onChange={(e) => {
                          const numericValue = parseFormattedNumber(e.target.value)
                          field.onChange(numericValue)
                        }}
                        onBlur={field.onBlur}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Type and Exclude Type */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
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
                  name="excludeType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exclude Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select exclude type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="FIXED">Fixed</SelectItem>
                          <SelectItem value="FLEXIBLE">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Daily Based Switch */}
              <FormField
                control={form.control}
                name="isDailyBased"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Daily Based</FormLabel>
                      <FormDescription>
                        Track this item on a daily basis
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Category Selection */}
              <FormField
                control={form.control}
                name="categoryId"
                render={() => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => setIsCategoryModalOpen(true)}
                        >
                          <FolderOpen className="mr-2 h-4 w-4" />
                          {selectedCategory ? "Change Category" : "Select Category"}
                        </Button>
                        {selectedCategory && (
                          <Card>
                            <CardContent className="flex items-center gap-3 p-3">
                              {selectedCategory.Icon && (
                                <div className="text-sm font-medium text-muted-foreground">
                                  {selectedCategory.Icon}
                                </div>
                              )}
                              <div className="flex-1">
                                <p className="font-medium">{selectedCategory.name}</p>
                                {selectedCategory.description && (
                                  <p className="text-xs text-muted-foreground">
                                    {selectedCategory.description}
                                  </p>
                                )}
                                <div className="flex gap-2 mt-1">
                                  <Badge variant="outline">
                                    {selectedCategory.type}
                                  </Badge>
                                  <Badge variant={selectedCategory.status === "ACTIVE" ? "default" : "secondary"}>
                                    {selectedCategory.status}
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Minimum Percentage - Conditional */}
              {showMinimumPercentage && (
                <FormField
                  control={form.control}
                  name="minimumPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Percentage</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0-100"
                          min={0}
                          max={100}
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => {
                            const value = e.target.value
                            field.onChange(value ? parseFloat(value) : undefined)
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Minimum percentage of budget for this flexible expense (required)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add additional details..."
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : item ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Category Select Modal */}
      <CategorySelectModal
        open={isCategoryModalOpen}
        onOpenChange={setIsCategoryModalOpen}
        onSelect={handleCategorySelect}
        filterType={getFilterType()}
      />
    </>
  )
}

