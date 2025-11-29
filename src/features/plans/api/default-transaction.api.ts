import { baseApi } from "@store/api/base.api"
import type { 
  DailyTransaction,
  DefaultTransactionsResponse 
} from "../types/daily-transaction.types"
import type { DefaultTransactionPayload } from "../validation/daily-transaction.schemas"

interface BaseResponse<T> {
  data: T
  message?: string
  success: boolean
}

export const defaultTransactionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDefaultTransactions: build.query<
      DefaultTransactionsResponse,
      { planId: string; itemId: string; skip?: number; limit?: number }
    >({
      query: ({ planId, itemId, skip = 0, limit = 100 }) => {
        const params = new URLSearchParams()
        params.append("skip", skip.toString())
        params.append("limit", limit.toString())
        return `/plans/${planId}/items/${itemId}/defaultTransactions?${params.toString()}`
      },
      providesTags: (_result, _error, { planId, itemId }) => [
        { type: "Plan", id: `default-transactions-${planId}-${itemId}` },
      ],
    }),

    createDefaultTransaction: build.mutation<
      BaseResponse<DailyTransaction>,
      { planId: string; itemId: string; data: DefaultTransactionPayload }
    >({
      query: ({ planId, itemId, data }) => ({
        url: `/plans/${planId}/items/${itemId}/defaultTransactions`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { planId, itemId }) => [
        { type: "Plan", id: `daily-transactions-${planId}-${itemId}` },
        { type: "Plan", id: `default-transactions-${planId}-${itemId}` },
        { type: "Plan", id: `items-${planId}` },
        { type: "Plan", id: planId },
      ],
    }),

    updateDefaultTransaction: build.mutation<
      BaseResponse<DailyTransaction>,
      {
        planId: string
        itemId: string
        transactionId: string
        data: DefaultTransactionPayload
      }
    >({
      query: ({ planId, itemId, transactionId, data }) => ({
        url: `/plans/${planId}/items/${itemId}/defaultTransactions/${transactionId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { planId, itemId }) => [
        { type: "Plan", id: `daily-transactions-${planId}-${itemId}` },
        { type: "Plan", id: `default-transactions-${planId}-${itemId}` },
        { type: "Plan", id: `items-${planId}` },
        { type: "Plan", id: planId },
      ],
    }),

    deleteDefaultTransaction: build.mutation<
      BaseResponse<void>,
      { planId: string; itemId: string; transactionId: string }
    >({
      query: ({ planId, itemId, transactionId }) => ({
        url: `/plans/${planId}/items/${itemId}/defaultTransactions/${transactionId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { planId, itemId }) => [
        { type: "Plan", id: `daily-transactions-${planId}-${itemId}` },
        { type: "Plan", id: `default-transactions-${planId}-${itemId}` },
        { type: "Plan", id: `items-${planId}` },
        { type: "Plan", id: planId },
      ],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetDefaultTransactionsQuery,
  useCreateDefaultTransactionMutation,
  useUpdateDefaultTransactionMutation,
  useDeleteDefaultTransactionMutation,
} = defaultTransactionApi

