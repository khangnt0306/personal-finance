import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Badge } from "@components/ui/badge"
import { Skeleton } from "@components/ui/skeleton"
import { Progress } from "@components/ui/progress"
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Plus,
  TrendingUp,
  TrendingDown,
  Wallet,
  PiggyBank,
  Calendar,
} from "lucide-react"
import { PageHeader } from "@components/molecules"
import { PlanTypeBadge } from "../components/plan-status-badge"
import { PlanFormModal } from "../components/plan-form-modal"
import { PlanItemFormModal } from "../components/plan-item-form-modal"
import { DailyTransactionsDrawer } from "../components/daily-transactions-drawer"
import {
  useGetPlanByIdQuery,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} from "../api/plan.api"
import {
  useGetPlanItemsQuery,
  useCreatePlanItemMutation,
  useUpdatePlanItemMutation,
  useDeletePlanItemMutation,
} from "../api/plan-item.api"
import type { PlanFormData } from "../validation/plan.schemas"
import type { PlanItemFormData } from "../validation/plan.schemas"
import type { PlanItem, ExcludeType } from "../types"
import { format } from "date-fns"
import { showSuccess, showError } from "@lib/toast"
import { useGetSelfCategoriesQuery } from "@features/categories"
import { formatCurrency } from "@core/utils/format"

export const PlanDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: plan, isLoading, refetch } = useGetPlanByIdQuery(id!)
  const { data: planItemsResponse, isLoading: isLoadingItems } = useGetPlanItemsQuery(id!)
  const { data: categoriesResponse } = useGetSelfCategoriesQuery()
  const [updatePlan, { isLoading: isUpdating }] = useUpdatePlanMutation()
  const [deletePlan] = useDeletePlanMutation()
  const [createPlanItem, { isLoading: isCreatingItem }] = useCreatePlanItemMutation()
  const [updatePlanItem, { isLoading: isUpdatingItem }] = useUpdatePlanItemMutation()
  const [deletePlanItem] = useDeletePlanItemMutation()
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isItemModalOpen, setIsItemModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<PlanItem | null>(null)
  const [isTransactionsDrawerOpen, setIsTransactionsDrawerOpen] = useState(false)
  const [selectedItemForTransactions, setSelectedItemForTransactions] = useState<PlanItem | null>(null)

  const planItems = planItemsResponse?.planItems || []
  const categories = categoriesResponse?.categories || []
  const planStatusLabel: Record<string, string> = {
    ACTIVE: "Đang hoạt động",
    INACTIVE: "Không hoạt động",
  }
  const excludeTypeLabel: Record<ExcludeType, string> = {
    FIXED: "Cố định",
    FLEXIBLE: "Linh hoạt",
  }

  const handleBack = () => {
    navigate("/plans")
  }

  const handleEdit = () => {
    setIsEditModalOpen(true)
  }

  const handleDelete = async () => {
    if (!plan) return
    const confirmed = window.confirm(`Bạn có chắc chắn muốn xóa kế hoạch "${plan.name}"?`)
    if (!confirmed) return
    
    try {
      await deletePlan(plan.id).unwrap()
      showSuccess("Xóa kế hoạch thành công!")
      navigate("/plans")
    } catch (error) {
      console.error("Xóa kế hoạch thất bại", error)
      showError("Không thể xóa kế hoạch. Vui lòng thử lại.")
    }
  }

  const handleUpdate = async (payload: PlanFormData) => {
    if (!plan) return
    
    try {
      await updatePlan({ id: plan.id, data: { ...payload, id: plan.id } }).unwrap()
      await refetch()
      setIsEditModalOpen(false)
      showSuccess("Cập nhật kế hoạch thành công!")
    } catch (error) {
      console.error("Cập nhật kế hoạch thất bại", error)
      showError("Không thể cập nhật kế hoạch. Vui lòng thử lại.")
    }
  }

  const handleCreateItem = () => {
    setEditingItem(null)
    setIsItemModalOpen(true)
  }

  const handleEditItem = (item: PlanItem) => {
    setEditingItem(item)
    setIsItemModalOpen(true)
  }

  const handleDeleteItem = async (item: PlanItem) => {
    const confirmed = window.confirm(`Bạn có chắc chắn muốn xóa hạng mục "${item.name}"?`)
    if (!confirmed) return
    
    try {
      await deletePlanItem({ planId: id!, itemId: item.id }).unwrap()
      showSuccess("Đã xóa hạng mục kế hoạch!")
    } catch (error) {
      console.error("Xóa hạng mục kế hoạch thất bại", error)
      showError("Không thể xóa hạng mục. Vui lòng thử lại.")
    }
  }

  const handleViewTransactions = (item: PlanItem) => {
    setSelectedItemForTransactions(item)
    setIsTransactionsDrawerOpen(true)
  }

  const handleItemSubmit = async (data: PlanItemFormData) => {
    try {
      if (editingItem) {
        await updatePlanItem({
          planId: id!,
          itemId: editingItem.id,
          data,
        }).unwrap()
        showSuccess("Đã cập nhật hạng mục kế hoạch!")
      } else {
        await createPlanItem({
          planId: id!,
          data,
        }).unwrap()
        showSuccess("Tạo hạng mục kế hoạch thành công!")
      }
      setIsItemModalOpen(false)
      setEditingItem(null)
    } catch (error) {
      console.error("Lưu hạng mục kế hoạch thất bại", error)
      showError("Không thể lưu hạng mục. Vui lòng thử lại.")
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  if (!plan) {
    return (
      <div className="space-y-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <p className="text-lg text-muted-foreground">Không tìm thấy kế hoạch</p>
            <Button onClick={handleBack} variant="outline" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại danh sách
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={plan.name}
        description={plan.description || "Chi tiết kế hoạch tài chính"}
        breadcrumbs={[
          { label: "Bảng điều khiển", href: "/" },
          { label: "Kế hoạch", href: "/plans" },
          { label: plan.name },
        ]}
        actions={
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Button>
            <Button variant="outline" onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Chỉnh sửa
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Xóa
            </Button>
          </div>
        }
      />

      {/* Timeline Card - Moved to top */}
      <Card>
        <CardHeader>
          <CardTitle>Dòng thời gian</CardTitle>
          <CardDescription>Lịch sử tạo & cập nhật</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Ngày tạo</span>
            <span className="text-sm font-medium">
              {format(new Date(plan.createdAt), "PPP 'at' p")}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Cập nhật lần cuối</span>
            <span className="text-sm font-medium">
              {format(new Date(plan.updatedAt), "PPP 'at' p")}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Plan Info and Settings Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Plan Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin kế hoạch</CardTitle>
            <CardDescription>Thông tin cơ bản</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tiền tệ</span>
              <Badge variant="outline">{plan.currency}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Loại kế hoạch</span>
              <PlanTypeBadge planType={plan.planType} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Trạng thái</span>
              <Badge variant={plan.status === "ACTIVE" ? "default" : "outline"}>
                {planStatusLabel[plan.status] ?? plan.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Ngân sách tổng</span>
              <span className="font-semibold">{formatCurrency(plan.totalBudget, plan.currency)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Automation Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle>Tự động hóa</CardTitle>
            <CardDescription>Hành vi tự động</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tự lặp</span>
              {plan.autoRepeat ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tự điều chỉnh</span>
              {plan.autoAdjustEnabled ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Limits & Warnings Card */}
        <Card>
          <CardHeader>
            <CardTitle>Giới hạn & cảnh báo</CardTitle>
            <CardDescription>Ngưỡng ngân sách</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Giới hạn tối thiểu/ngày</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{plan.dailyMinLimit}%</span>
                <span className="text-xs text-muted-foreground">
                  ({formatCurrency(plan.dailyMinLimitValue, plan.currency)})
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Cảnh báo vàng</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                  {plan.warnLevelYellow}%
                </Badge>
                <span className="text-xs text-muted-foreground">
                  ({formatCurrency(plan.warnLevelYellowValue, plan.currency)})
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Cảnh báo đỏ</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
                  {plan.warnLevelRed}%
                </Badge>
                <span className="text-xs text-muted-foreground">
                  ({formatCurrency(plan.warnLevelRedValue, plan.currency)})
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Plan Item Button */}
      <div className="flex justify-center">
        <Button onClick={handleCreateItem} size="lg" className="w-full max-w-md">
          <Plus className="mr-2 h-5 w-5" />
          Tạo hạng mục kế hoạch
        </Button>
      </div>

      {/* Plan Items Section */}
      <Card>
        <CardHeader>
          <CardTitle>Hạng mục kế hoạch</CardTitle>
          <CardDescription>
            {isLoadingItems ? "Đang tải hạng mục..." : `${planItems.length} hạng mục trong kế hoạch này`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingItems ? (
            <div className="space-y-2">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : (
            <div className="space-y-3">
              {planItems.map((item) => {
                const category = categories.find((c) => c.id === item.categoryId)
                const totalAmount = typeof item.amount === "string" ? parseFloat(item.amount) : item.amount
                const spentPercentage = totalAmount > 0 ? (item.spentAmount / totalAmount) * 100 : 0
                const savedPercentage = totalAmount > 0 ? (item.savedAmount / totalAmount) * 100 : 0
                
                return (
                  <Card
                    key={item.id}
                    className="border border-border/60 hover:border-primary/50 transition-all cursor-pointer overflow-hidden"
                    onClick={() => handleViewTransactions(item)}
                  >
                    <CardContent className="p-0">
                      {/* Header Section */}
                      <div className="p-4 pb-3 border-b border-border/40">
                        <div className="flex items-start justify-between gap-4">
                          {/* Left: Icon and Details */}
                          <div className="flex items-start gap-3 flex-1">
                            {category?.Icon && (
                              <div className="text-sm font-medium text-muted-foreground mt-1 shrink-0">
                                {category.Icon}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-base truncate">{item.name}</h4>
                                {item.type === "INCOME" ? (
                                  <Badge className="bg-green-500/10 text-green-700 border-green-200 shrink-0">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    Thu nhập
                                  </Badge>
                                ) : (
                                  <Badge className="bg-red-500/10 text-red-700 border-red-200 shrink-0">
                                    <TrendingDown className="h-3 w-3 mr-1" />
                                    Chi tiêu
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-2 text-sm mb-2">
                                {category && (
                                  <Badge variant="outline" className="text-xs">
                                    {category.name}
                                  </Badge>
                                )}
                                <Badge variant="outline" className="text-xs">
                                  {excludeTypeLabel[item.excludeType] ?? item.excludeType}
                                </Badge>
                                {item.isDailyBased && (
                                  <Badge variant="outline" className="text-xs">
                                    Theo ngày
                                  </Badge>
                                )}
                                {item.minimumPercentage !== undefined && (
                                  <Badge variant="outline" className="text-xs">
                                    Tối thiểu: {item.minimumPercentage}%
                                  </Badge>
                                )}
                              </div>

                              {item.description && (
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Right: Actions */}
                          <div className="flex gap-1 shrink-0">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEditItem(item)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteItem(item)
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Stats Section */}
                      <div className="p-4 bg-muted/20">
                        <div className="grid grid-cols-3 gap-4 mb-3">
                          {/* Budget */}
                          <div className="flex items-center gap-2">
                            <Wallet className="h-4 w-4 text-primary" />
                            <div>
                              <p className="text-xs text-muted-foreground">Ngân sách</p>
                              <p className="font-bold text-sm">
                                {formatCurrency(totalAmount, plan.currency)}
                              </p>
                            </div>
                          </div>

                          {/* Spent */}
                          <div className="flex items-center gap-2">
                            <TrendingDown className="h-4 w-4 text-red-500" />
                            <div>
                              <p className="text-xs text-muted-foreground">Đã chi</p>
                              <p className="font-bold text-sm text-red-600">
                                {formatCurrency(item.spentAmount, plan.currency)}
                              </p>
                            </div>
                          </div>

                          {/* Saved */}
                          <div className="flex items-center gap-2">
                            <PiggyBank className="h-4 w-4 text-green-500" />
                            <div>
                              <p className="text-xs text-muted-foreground">Đã tiết kiệm</p>
                              <p className="font-bold text-sm text-green-600">
                                {formatCurrency(item.savedAmount, plan.currency)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">
                              Đã chi: {spentPercentage.toFixed(1)}%
                            </span>
                            <span className="text-muted-foreground">
                              Tiết kiệm: {savedPercentage.toFixed(1)}%
                            </span>
                          </div>
                          <Progress 
                            value={spentPercentage} 
                            className="h-2"
                          />
                        </div>

                        {/* Average Daily */}
                        {item.averageDaily > 0 && (
                          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/40">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div className="flex-1">
                              <p className="text-xs text-muted-foreground">Chi tiêu trung bình/ngày</p>
                              <p className="font-semibold text-sm">
                                {formatCurrency(item.averageDaily, plan.currency)}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Plan Modal */}
      <PlanFormModal
        open={isEditModalOpen}
        plan={plan}
        onOpenChange={setIsEditModalOpen}
        onSubmit={handleUpdate}
        isSubmitting={isUpdating}
      />

      {/* Plan Item Form Modal */}
      <PlanItemFormModal
        open={isItemModalOpen}
        planId={id!}
        item={editingItem}
        onOpenChange={setIsItemModalOpen}
        onSubmit={handleItemSubmit}
        isSubmitting={isCreatingItem || isUpdatingItem}
      />

      {/* Daily Transactions Drawer */}
      <DailyTransactionsDrawer
        open={isTransactionsDrawerOpen}
        onOpenChange={setIsTransactionsDrawerOpen}
        planId={id!}
        planItem={selectedItemForTransactions}
        currency={plan?.currency || "VND"}
      />
    </div>
  )
}

