import type { NavigateFunction } from "react-router-dom"
import { showSuccess, showError } from "@lib/toast"
import type { Plan, PlanItem } from "../../types"
import type { PlanFormData, PlanItemFormData } from "../../validation/plan.schemas"

type UpdatePlanFn = (payload: { id: string; data: PlanFormData }) => Promise<unknown>
type DeletePlanFn = (id: string) => Promise<unknown>
type UpdateStatusFn = (payload: { id: string; status: "ACTIVE" | "INACTIVE" }) => Promise<unknown>
type CreatePlanItemFn = (payload: { planId: string; data: PlanItemFormData }) => Promise<unknown>
type UpdatePlanItemFn = (payload: { planId: string; itemId: string; data: PlanItemFormData }) => Promise<unknown>
type DeletePlanItemFn = (payload: { planId: string; itemId: string }) => Promise<unknown>
type RefetchFn = () => Promise<unknown>

export const handleNavigateBack = (navigate: NavigateFunction) => {
  navigate("/plans")
}

export const handleStatusToggle = async (
  plan: Plan | undefined,
  checked: boolean,
  deps: { updatePlanStatus: UpdateStatusFn; refetchPlan: RefetchFn }
) => {
  if (!plan) return

  try {
    await deps.updatePlanStatus({
      id: plan.id,
      status: checked ? "ACTIVE" : "INACTIVE",
    })
    await deps.refetchPlan()
    showSuccess(`Kế hoạch đã được ${checked ? "kích hoạt" : "tắt"} thành công!`)
  } catch (error) {
    console.error("Cập nhật trạng thái kế hoạch thất bại", error)
    showError("Không thể cập nhật trạng thái. Vui lòng thử lại.")
  }
}

export const handlePlanUpdate = async (
  plan: Plan | undefined,
  payload: PlanFormData,
  deps: { updatePlan: UpdatePlanFn; refetchPlan: RefetchFn },
  closeModal: () => void
) => {
  if (!plan) return

  try {
    await deps.updatePlan({ id: plan.id, data: payload })
    await deps.refetchPlan()
    closeModal()
    showSuccess("Cập nhật kế hoạch thành công!")
  } catch (error) {
    console.error("Cập nhật kế hoạch thất bại", error)
    showError("Không thể cập nhật kế hoạch. Vui lòng thử lại.")
  }
}

export const handlePlanDeleteConfirm = async (
  plan: Plan | undefined,
  deps: { deletePlan: DeletePlanFn; navigate: NavigateFunction },
  closeDialog: () => void
) => {
  if (!plan) return

  try {
    await deps.deletePlan(plan.id)
    showSuccess("Xóa kế hoạch thành công!")
    closeDialog()
    deps.navigate("/plans")
  } catch (error) {
    console.error("Xóa kế hoạch thất bại", error)
    showError("Không thể xóa kế hoạch. Vui lòng thử lại.")
  }
}

export const handlePlanItemDelete = async (
  planId: string,
  item: PlanItem,
  deps: { deletePlanItem: DeletePlanItemFn }
) => {
  const confirmed = window.confirm(`Bạn có chắc chắn muốn xóa hạng mục "${item.name}"?`)
  if (!confirmed) return

  try {
    await deps.deletePlanItem({ planId, itemId: item.id })
    showSuccess("Đã xóa hạng mục kế hoạch!")
  } catch (error) {
    console.error("Xóa hạng mục kế hoạch thất bại", error)
    showError("Không thể xóa hạng mục. Vui lòng thử lại.")
  }
}

export const handlePlanItemSubmit = async (
  planId: string,
  data: PlanItemFormData,
  editingItem: PlanItem | null,
  deps: { createPlanItem: CreatePlanItemFn; updatePlanItem: UpdatePlanItemFn },
  onFinish: () => void
) => {
  try {
    if (editingItem) {
      await deps.updatePlanItem({
        planId,
        itemId: editingItem.id,
        data,
      })
      showSuccess("Đã cập nhật hạng mục kế hoạch!")
    } else {
      await deps.createPlanItem({
        planId,
        data,
      })
      showSuccess("Tạo hạng mục kế hoạch thành công!")
    }
    onFinish()
  } catch (error) {
    console.error("Lưu hạng mục kế hoạch thất bại", error)
    showError("Không thể lưu hạng mục. Vui lòng thử lại.")
  }
}

export const handleViewTransactions = (
  item: PlanItem,
  openDrawer: (item: PlanItem) => void
) => {
  if (item.excludeType === "FIXED") return
  openDrawer(item)
}

