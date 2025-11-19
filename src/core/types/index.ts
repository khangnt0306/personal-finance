export type TransactionType = "income" | "expense"

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

export interface Category {
  id: string
  name: string
  type: TransactionType
  icon?: string
  color?: string
  createdAt: string
  updatedAt: string
}

export interface Budget {
  id: string
  categoryId: string
  amount: number
  period: "monthly" | "yearly"
  startDate: string
  endDate: string
  createdAt: string
  updatedAt: string
}

export interface Summary {
  totalIncome: number
  totalExpense: number
  balance: number
  period: {
    start: string
    end: string
  }
}

