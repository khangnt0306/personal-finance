export type SavingsFundStatus = "active" | "completed" | "paused" | "cancelled"

export type SavingGoalStatus = "active" | "completed" | "paused" | "cancelled"

// Raw shape returned by the API
export interface SavingGoal {
  id: string
  userId: string
  name: string
  description?: string
  targetAmount: string
  currentAmount: number
  startDate?: string
  expectedFinishDate?: string
  status: SavingGoalStatus
  progressPercentage?: number
  createdAt: string
  updatedAt: string
}

export interface SavingsGoalsResponse {
  savingGoals: SavingGoal[]
  pagination: {
    total: number
    skip: number
    limit: number
    totalPages: number
    currentPage: number
  }
}

// Normalized structure used throughout the UI
export interface SavingsFund {
  id: string
  name: string
  description?: string
  targetAmount: number
  currentAmount: number
  currency: string
  status: SavingsFundStatus
  createdAt: string
  updatedAt: string
  deadline?: string
  monthlyContribution?: number
  icon?: string
  color?: string
  progressPercentage?: number
}

export interface SavingsFundStats {
  totalFunds: number
  activeFunds: number
  completedFunds: number
  totalTarget: number
  totalCurrent: number
  totalProgress: number
}

