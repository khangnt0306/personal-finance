export type PlanStatus = "not_started" | "in_progress" | "completed" | "on_hold"
export type PlanPriority = "low" | "medium" | "high"

export interface Plan {
  id: string
  name: string
  description?: string
  targetAmount: number
  currentAmount: number
  startDate: string
  endDate: string
  status: PlanStatus
  priority: PlanPriority
  createdAt: string
  updatedAt: string
}

