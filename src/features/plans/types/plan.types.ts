export type PlanType = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"
export type Currency = "VND" | "USD" | "EUR"
export type PlanStatus = "ACTIVE" | "INACTIVE"
export type PlanItemType = "INCOME" | "EXPENSE"
export type ExcludeType = "FIXED" | "FLEXIBLE"

export interface Plan {
  id: string
  name: string
  description?: string
  currency: Currency
  planType: PlanType
  autoRepeat: boolean
  autoAdjustEnabled: boolean
  dailyMinLimit: number
  warnLevelYellow: number
  warnLevelRed: number
  totalBudget: number
  totalIncome: number
  totalExpense: number
  status: PlanStatus
  dailyMinLimitValue: number
  warnLevelYellowValue: number
  warnLevelRedValue: number
  items: PlanItem[]
  createdAt: string
  updatedAt: string
}

export interface PlanItem {
  id: string
  planId: string
  categoryId: string
  type: PlanItemType
  name: string
  amount: string | number
  description?: string
  excludeType: ExcludeType
  minimumPercentage?: string | number
  createdAt: string
  updatedAt: string
  spentAmount: number
  savedAmount: number
  averageDaily: number
}