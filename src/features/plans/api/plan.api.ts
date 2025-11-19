import { injectCRUD } from "@store/api/base.api"
import type { Plan } from "../types"

export const planApi = injectCRUD<Plan>({
  entityName: "plans",
  tagType: "Plan",


  /**
   * Custom endpoints
   */
//   extraEndpoints: (build) => ({
//     ...createCustomApi<Transaction, { reason?: string }, { id: string }>({
//       name: "approveTransaction",
//       url: "/transactions/:id/approve",
//       method: "POST",
//       tags: ["Transactions"],
//     }, build),
//   }),
  
})

export const {
  useGetAllQuery: useGetPlansQuery,
  useGetByIdQuery: useGetPlanByIdQuery,
  useCreateMutation: useCreatePlanMutation,
  useUpdateMutation: useUpdatePlanMutation,
  useRemoveMutation: useDeletePlanMutation,
} = planApi

