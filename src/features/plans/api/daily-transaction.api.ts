import { baseApi } from "@store/api/base.api"
import type { DailyTransaction, DailyTransactionsResponse } from "../types/daily-transaction.types"
import type { DailyTransactionFormData } from "../validation/daily-transaction.schemas"

interface BaseResponse<T> {
  data: T
  message?: string
  success: boolean
}

export const dailyTransactionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDailyTransactions: build.query<
      DailyTransactionsResponse,
      { planId: string; itemId: string; skip?: number; limit?: number }
    >({
      query: ({ planId, itemId, skip = 0, limit = 10 }) => {
        const params = new URLSearchParams()
        params.append("skip", skip.toString())
        params.append("limit", limit.toString())
        return `/plans/${planId}/items/${itemId}/dailyTransactions?${params.toString()}`
      },
      providesTags: (_result, _error, { planId, itemId }) => [
        { type: "Plan", id: `daily-transactions-${planId}-${itemId}` },
      ],
    }),

    createDailyTransaction: build.mutation<
      BaseResponse<DailyTransaction>,
      { planId: string; itemId: string; data: DailyTransactionFormData }
    >({
      query: ({ planId, itemId, data }) => ({
        url: `/plans/${planId}/items/${itemId}/dailyTransactions`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { planId, itemId }) => [
        { type: "Plan", id: `daily-transactions-${planId}-${itemId}` },
        { type: "Plan", id: `items-${planId}` },
        { type: "Plan", id: planId },
      ],
    }),

    updateDailyTransaction: build.mutation<
      BaseResponse<DailyTransaction>,
      {
        planId: string
        itemId: string
        transactionId: string
        data: DailyTransactionFormData
      }
    >({
      query: ({ planId, itemId, transactionId, data }) => ({
        url: `/plans/${planId}/items/${itemId}/dailyTransactions/${transactionId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { planId, itemId }) => [
        { type: "Plan", id: `daily-transactions-${planId}-${itemId}` },
        { type: "Plan", id: `items-${planId}` },
        { type: "Plan", id: planId },
      ],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetDailyTransactionsQuery,
  useCreateDailyTransactionMutation,
  useUpdateDailyTransactionMutation,
} = dailyTransactionApi

