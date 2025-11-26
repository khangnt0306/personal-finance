import { baseApi } from "@store/api/base.api"
import type { PlanItem } from "../types"
import type { PlanItemFormData } from "../validation/plan.schemas"

interface BaseResponse<T> {
  data: T
  message?: string
  success: boolean
}

interface PlanItemsResponse {
  planItems: PlanItem[]
  pagination: {
    total: number
    skip: number
    limit: number
    totalPages: number
    currentPage: number
  }
}

export const planItemApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPlanItems: build.query<PlanItemsResponse, string>({
      query: (planId) => `/plans/${planId}/items`,
      providesTags: (result, _error, planId) =>
        result
          ? [
              ...result.planItems.map(({ id }) => ({ type: "Plan" as const, id: `item-${id}` })),
              { type: "Plan", id: `items-${planId}` },
            ]
          : [{ type: "Plan", id: `items-${planId}` }],
    }),

    createPlanItem: build.mutation<
      BaseResponse<PlanItem>,
      { planId: string; data: PlanItemFormData }
    >({
      query: ({ planId, data }) => ({
        url: `/plans/${planId}/items`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { planId }) => [
        { type: "Plan", id: `items-${planId}` },
        { type: "Plan", id: planId },
      ],
    }),

    updatePlanItem: build.mutation<
      BaseResponse<PlanItem>,
      { planId: string; itemId: string; data: PlanItemFormData }
    >({
      query: ({ planId, itemId, data }) => ({
        url: `/plans/${planId}/items/${itemId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { planId, itemId }) => [
        { type: "Plan", id: `item-${itemId}` },
        { type: "Plan", id: `items-${planId}` },
        { type: "Plan", id: planId },
      ],
    }),

    deletePlanItem: build.mutation<
      BaseResponse<{ id: string }>,
      { planId: string; itemId: string }
    >({
      query: ({ planId, itemId }) => ({
        url: `/plans/${planId}/items/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { planId, itemId }) => [
        { type: "Plan", id: `item-${itemId}` },
        { type: "Plan", id: `items-${planId}` },
        { type: "Plan", id: planId },
      ],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetPlanItemsQuery,
  useCreatePlanItemMutation,
  useUpdatePlanItemMutation,
  useDeletePlanItemMutation,
} = planItemApi

