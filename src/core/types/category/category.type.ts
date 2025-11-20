import type { TransactionType } from "../transaction/transaction.type"

export interface Category {
    id: string
    name: string
    type: TransactionType
    icon?: string
    color?: string
    createdAt: string
    updatedAt: string
  }
  