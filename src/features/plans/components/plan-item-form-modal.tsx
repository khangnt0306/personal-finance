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
                        <DialogTitle>{item ? "Chỉnh sửa hạng mục" : "Tạo hạng mục mới"}</DialogTitle>
                        <DialogDescription>
                            {item
                                ? "Cập nhật thông tin chi tiết cho hạng mục kế hoạch"
                                : "Thêm hạng mục mới vào kế hoạch tài chính của bạn"}
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
                                        <FormLabel>Tên hạng mục</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ví dụ: Lương tháng, Tiền thuê nhà, Mua sắm" {...field} />
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
                                        <FormLabel>Số tiền</FormLabel>
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
                                            <FormLabel>Loại hạng mục</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Chọn loại" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="INCOME">Thu nhập</SelectItem>
                                                    <SelectItem value="EXPENSE">Chi tiêu</SelectItem>
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
                                            <FormLabel>Loại loại trừ</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Chọn loại loại trừ" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="FIXED">Cố định</SelectItem>
                                                    <SelectItem value="FLEXIBLE">Linh hoạt</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* Category Selection */}
                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Danh mục</FormLabel>
                                        <FormControl>
                                            <div className="space-y-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="w-full justify-start"
                                                    onClick={() => setIsCategoryModalOpen(true)}
                                                >
                                                    <FolderOpen className="mr-2 h-4 w-4" />
                                                    {selectedCategory ? "Đổi danh mục" : "Chọn danh mục"}
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
                                                                        {selectedCategory.type === "INCOME" ? "Thu nhập" : "Chi tiêu"}
                                                                    </Badge>
                                                                    <Badge variant={selectedCategory.status === "ACTIVE" ? "default" : "secondary"}>
                                                                        {selectedCategory.status === "ACTIVE" ? "Đang hoạt động" : "Tạm dừng"}
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
                                            <FormLabel>Tỷ lệ tối thiểu</FormLabel>
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
                                                Tỷ lệ tối thiểu của ngân sách cho khoản chi linh hoạt này (bắt buộc)
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
                                        <FormLabel>Mô tả (không bắt buộc)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Thêm mô tả chi tiết..."
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
                                    Hủy
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Đang lưu..." : item ? "Cập nhật" : "Tạo mới"}
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

