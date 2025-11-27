    
import type { Plan } from "@features/plans/types"
import type { PlanFormData } from "@features/plans/validation/plan.schemas"

export interface PlansStats {
  total: number
  withAutoRepeat: number
  withAutoAdjust: number
  monthly: number
  yearly: number
}

export interface PlansHandlerDependencies {
  createPlan: (payload: PlanFormData) => Promise<unknown>
  updatePlan: (params: { id: string; data: PlanFormData & { id: string } }) => Promise<unknown>
  deletePlan: (id: string) => Promise<unknown>
  refetch: () => Promise<unknown>
}

/**
 * Calculate statistics from plans list
 */
export const calculatePlansStats = (plans: Plan[]): PlansStats => {
  const withAutoRepeat = plans.filter((plan: Plan) => plan.autoRepeat).length
  const withAutoAdjust = plans.filter((plan: Plan) => plan.autoAdjustEnabled).length
  const monthly = plans.filter((plan: Plan) => plan.planType === "MONTHLY").length
  const yearly = plans.filter((plan: Plan) => plan.planType === "YEARLY").length
  
  return {
    total: plans.length,
    withAutoRepeat,
    withAutoAdjust,
    monthly,
    yearly,
  }
}

/**
 * Handle plan form submission (create or update)
 */
export const handlePlanSubmit = async (
  payload: PlanFormData,
  editingPlan: Plan | null,
  dependencies: PlansHandlerDependencies,
  onSuccess: () => void
) => {
  const { createPlan, updatePlan, refetch } = dependencies

  try {
    if (editingPlan) {
      await updatePlan({ id: editingPlan.id, data: { ...payload, id: editingPlan.id } })
    } else {
      await createPlan(payload)
    }
    await refetch()
    onSuccess()
  } catch (error) {
    console.error("Lưu kế hoạch thất bại", error)
    throw error
  }
}

/**
 * Handle plan deletion
 */
export const handlePlanDelete = async (
  plan: Plan,
  dependencies: PlansHandlerDependencies
) => {
  const { deletePlan, refetch } = dependencies
  const confirmed = window.confirm(`Xóa kế hoạch "${plan.name}"?`)
  
  if (!confirmed) return

  try {
    await deletePlan(plan.id)
    await refetch()
  } catch (error) {
    console.error("Xóa kế hoạch thất bại", error)
    throw error
  }
}

