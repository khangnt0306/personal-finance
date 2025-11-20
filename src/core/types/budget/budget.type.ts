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
  