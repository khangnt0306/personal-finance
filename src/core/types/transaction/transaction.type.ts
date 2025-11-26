
export type TransactionType = "INCOME" | "EXPENSE"

export interface Transaction {
    id: string
    type: TransactionType
    amount: number
    categoryId: string
    description: string
    date: string
    createdAt: string
    updatedAt: string
  }