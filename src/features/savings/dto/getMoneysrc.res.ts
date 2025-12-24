import type { MoneySource } from "../api/money-source.api"

export interface GetMoneySourceResponse {
  moneySources: MoneySource[]
  pagination: {
    total: number
    skip: number
    limit: number
    totalPages: number
    currentPage: number
  }
}