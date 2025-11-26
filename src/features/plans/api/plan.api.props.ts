import type { Plan, PlanType } from "../types"

export interface PlanQueryParams {
    textSearch?: string
    name?: string
    skip?: number
    limit?: number
    filter?: {
        planType?: PlanType
        name?: string
    }
  }
  
  export interface PlanResponse {
    plans: Plan[]
    pagination: {
      total: number
      skip: number
      limit: number
      totalPages: number
      currentPage: number
    }
}