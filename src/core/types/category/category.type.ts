import type { TransactionType } from "../transaction/transaction.type"
export type CategoryStatus = "ACTIVE" | "INACTIVE"

export interface Category {
    id: string
    createdAt: string
    updatedAt: string
    name: string
    description?: string
    status: CategoryStatus
    type: TransactionType
    Icon?: string
    isDefault: boolean
  }
  