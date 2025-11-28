import type { Plan, PlanItem, ExcludeType } from "@features/plans/types"
import type { Category } from "@core/types"

export interface ExpensePlanItemCardProps {
  item: PlanItem
  plan: Plan
  category?: Category
  onEdit: (item: PlanItem) => void
  onDelete: (item: PlanItem) => void
  onViewTransactions: (item: PlanItem) => void
}

export interface CardStatusProps {
  isDanger: boolean
  isWarning: boolean
  isSafe: boolean
}

export const excludeTypeLabel: Record<ExcludeType, string> = {
  FIXED: "Cố định",
  FLEXIBLE: "Linh hoạt",
}

