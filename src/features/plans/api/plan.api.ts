import { injectCRUD } from "@store/api/base.api"
import type { Plan } from "../types"
import type { PlanQueryParams, PlanResponse } from "./plan.api.props"

export const planApi = injectCRUD<Plan>({
  entityName: "plans",
  tagType: "Plan",

  extraEndpoints: (build) => ({
    getSelfPlans: build.query<PlanResponse, PlanQueryParams | undefined>({
      query: (params) => {
        const queryParams = new URLSearchParams()
        if (params?.textSearch) queryParams.append("textSearch", params.textSearch)
        if (params?.name) queryParams.append("name", params.name)
        if (params?.filter?.planType) queryParams.append("filter[planType]", params.filter.planType)
        if (params?.filter?.name) queryParams.append("filter[name]", params.filter.name)
        if (params?.skip !== undefined) queryParams.append("skip", params.skip.toString())
        if (params?.limit !== undefined) queryParams.append("limit", params.limit.toString())
        
        const queryString = queryParams.toString()
        return `/plans/self${queryString ? `?${queryString}` : ""}`
      },
      providesTags: [{ type: "Plan", id: "LIST" }],
    }),
    updatePlanStatus: build.mutation<Plan, { id: string; status: "ACTIVE" | "INACTIVE" }>({
      query: ({ id, status }) => ({
        url: `/plans/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, _error, { id }) =>
        result
          ? [
              { type: "Plan", id },
              { type: "Plan", id: "LIST" },
            ]
          : [{ type: "Plan", id: "LIST" }],
    }),
  }),
})

export const {
  useGetAllQuery: useGetPlansQuery,
  useGetByIdQuery: useGetPlanByIdQuery,
  useCreateMutation: useCreatePlanMutation,
  useUpdateMutation: useUpdatePlanMutation,
  useRemoveMutation: useDeletePlanMutation,
} = planApi

// Export custom endpoint hooks manually
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useGetSelfPlansQuery = (planApi as any).endpoints.getSelfPlans.useQuery
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useUpdatePlanStatusMutation = (planApi as any).endpoints.updatePlanStatus.useMutation

