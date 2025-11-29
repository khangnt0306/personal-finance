export interface DailyTransaction {
  id: string
  planId: string
  planItemId: string
  date: string
  label: string
  amount: string
  createdAt: string
}

export interface DefaultTransaction {
  id: string
  planId: string
  planItemId: string
  label: string
  amount: string
  enabled: boolean
  createdAt: string
}

export interface DailyTransactionDay {
  date: string
  transactions: DailyTransaction[]
}

export interface DailyTransactionsResponse {
  days: DailyTransactionDay[]
  pagination: {
    total: number
    skip: number
    limit: number
    totalPages: number
    currentPage: number
  }
}

export interface DefaultTransactionsResponse {
  defaultTransactions: DefaultTransaction[]
  pagination: {
    total: number
    skip: number
    limit: number
  }
}

export interface DailyTransactionFormData {
  date: string
  label: string
  amount: string
}

