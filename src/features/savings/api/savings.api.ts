import { injectCRUD } from "@store/api/base.api"
import type { SavingGoal } from "../types"
    
export const savingGoalApi = injectCRUD<SavingGoal>({
  entityName: "saving-goals",
  tagType: "SavingsGoal",
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const savingGoalEndpoints = (savingGoalApi as any).endpoints

export const useGetSavingGoalsQuery = savingGoalEndpoints.getAllSavingsGoal.useQuery
export const useGetSavingGoalByIdQuery = savingGoalEndpoints.getSavingsGoalById.useQuery
export const useCreateSavingGoalMutation = savingGoalEndpoints.createSavingsGoal.useMutation
export const useUpdateSavingGoalMutation = savingGoalEndpoints.updateSavingsGoal.useMutation
export const useDeleteSavingGoalMutation = savingGoalEndpoints.removeSavingsGoal.useMutation

