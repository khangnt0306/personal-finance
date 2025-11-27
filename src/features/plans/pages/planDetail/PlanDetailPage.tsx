import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@components/ui/button"
import { Card, CardContent } from "@components/ui/card"
import { Skeleton } from "@components/ui/skeleton"
import { Switch } from "@components/ui/switch"
import { Label } from "@components/ui/label"
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
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { PageHeader } from "@components/molecules"
import { PlanFormModal } from "../../components/plan-form-modal"
import { PlanItemFormModal } from "../../components/plan-item-form-modal"
import { DailyTransactionsDrawer } from "../../components/daily-transactions-drawer"
import { PlanInfoSection } from "../../components/plan-info-section"
import { PlanItemsSection } from "../../components/plan-items-section"
import {
  useGetPlanByIdQuery,
  useUpdatePlanMutation,
  useDeletePlanMutation,
  useUpdatePlanStatusMutation,
} from "../../api/plan.api"
import {
  useGetPlanItemsQuery,
  useCreatePlanItemMutation,
  useUpdatePlanItemMutation,
  useDeletePlanItemMutation,
} from "../../api/plan-item.api"
import type { PlanFormData } from "../../validation/plan.schemas"
import type { PlanItemFormData } from "../../validation/plan.schemas"
import type { PlanItem } from "../../types"
import { useGetSelfCategoriesQuery } from "@features/categories"
import {
  handleNavigateBack,
  handleStatusToggle as handleStatusToggleLogic,
  handlePlanDeleteConfirm,
  handlePlanUpdate,
  handlePlanItemDelete,
  handlePlanItemSubmit,
  handleViewTransactions as handleViewTransactionsLogic,
} from "./PlanDetailPage.handler"

export const PlanDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: plan, isLoading, refetch } = useGetPlanByIdQuery(id!)
  const { data: planItemsResponse, isLoading: isLoadingItems } = useGetPlanItemsQuery(id!)
  const { data: categoriesResponse } = useGetSelfCategoriesQuery()
  const [updatePlan, { isLoading: isUpdating }] = useUpdatePlanMutation()
  const [deletePlan] = useDeletePlanMutation()
  const [updatePlanStatus, { isLoading: isUpdatingStatus }] = useUpdatePlanStatusMutation()
  const [createPlanItem, { isLoading: isCreatingItem }] = useCreatePlanItemMutation()
  const [updatePlanItem, { isLoading: isUpdatingItem }] = useUpdatePlanItemMutation()
  const [deletePlanItem] = useDeletePlanItemMutation()
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isItemModalOpen, setIsItemModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<PlanItem | null>(null)
  const [isTransactionsDrawerOpen, setIsTransactionsDrawerOpen] = useState(false)
  const [selectedItemForTransactions, setSelectedItemForTransactions] = useState<PlanItem | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const planItems = planItemsResponse?.planItems || []
  const categories = categoriesResponse?.categories || []

  const handleBack = () => {
    handleNavigateBack(navigate)
  }

  const handleEdit = () => {
    setIsEditModalOpen(true)
  }

  const handleDelete = () => {
    setIsDeleteDialogOpen(true)
  }

  const handleStatusToggle = async (checked: boolean) => {
    await handleStatusToggleLogic(
      plan,
      checked,
      {
        updatePlanStatus: (payload) => updatePlanStatus(payload).unwrap(),
        refetchPlan: refetch,
      }
    )
  }

  const handleDeleteConfirm = async () => {
    await handlePlanDeleteConfirm(
      plan,
      {
        deletePlan: (planId) => deletePlan(planId).unwrap(),
        navigate,
      },
      () => setIsDeleteDialogOpen(false)
    )
  }

  const planId = id!

  const handleUpdate = async (payload: PlanFormData) => {
    await handlePlanUpdate(
      plan,
      payload,
      {
        updatePlan: (args) => updatePlan(args).unwrap(),
        refetchPlan: refetch,
      },
      () => setIsEditModalOpen(false)
    )
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
    await handlePlanItemDelete(planId, item, {
      deletePlanItem: (args) => deletePlanItem(args).unwrap(),
    })
  }

  const handleViewTransactions = (item: PlanItem) => {
    handleViewTransactionsLogic(item, (selected) => {
      setSelectedItemForTransactions(selected)
      setIsTransactionsDrawerOpen(true)
    })
  }

  const handleItemSubmit = async (data: PlanItemFormData) => {
    await handlePlanItemSubmit(
      planId,
      data,
      editingItem,
      {
        createPlanItem: (args) => createPlanItem(args).unwrap(),
        updatePlanItem: (args) => updatePlanItem(args).unwrap(),
      },
      () => {
        setIsItemModalOpen(false)
        setEditingItem(null)
      }
    )
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
      className="relative overflow-hidden border border-white/40 bg-white/70 shadow-soft-xl backdrop-blur-xl"
        title={plan.name}
        description={plan.description || "Chi tiết kế hoạch tài chính"}
        breadcrumbs={[
          { label: "Bảng điều khiển", href: "/" },
          { label: "Kế hoạch", href: "/plans" },
          { label: plan.name },
        ]}
        actions={
          <div className="h-full">
            <div className="flex  items-center gap-3 absolute right-0 top-0">
              <Label htmlFor="plan-status" className="text-sm font-medium text-muted-foreground">
                {plan.status === "ACTIVE" ? "Đang hoạt động" : "Không hoạt động"}
              </Label>
              <Switch
                id="plan-status"
                checked={plan.status === "ACTIVE"}
                onCheckedChange={handleStatusToggle}
                disabled={isUpdatingStatus}
                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-400"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={handleEdit} className="p-4 border hover:scale-110 transition-all duration-200">
                <Edit className="text-blue-600 h-4 w-4" />
              </Button>
              <Button variant="ghost" className="p-4 text-destructive hover:text-destructive hover:scale-110 transition-all duration-200" onClick={handleDelete}>
                <Trash2 className="text-destructive h-4 w-4" />
              </Button>
            </div>
          </div>
        }
      />

      <PlanInfoSection plan={plan} />

      <PlanItemsSection
        plan={plan}
        planItems={planItems}
        categories={categories}
        isLoading={isLoadingItems}
        onCreateItem={handleCreateItem}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteItem}
        onViewTransactions={handleViewTransactions}
      />

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

      {/* Delete Plan Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn muốn xóa kế hoạch?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn đang chuẩn bị xóa kế hoạch "{plan.name}". Thao tác này không thể hoàn tác và sẽ xóa vĩnh viễn kế hoạch cùng tất cả các hạng mục liên quan khỏi dữ liệu của bạn.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

