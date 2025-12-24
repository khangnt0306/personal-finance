import { injectCRUD } from "@store/api/base.api"
export interface MoneySource {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export const moneySourceApi = injectCRUD<MoneySource>({
  entityName: "money-sources",
  tagType: "MoneySource",
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const moneySourceEndpoints = (moneySourceApi as any).endpoints

export const useGetMoneySourcesQuery = moneySourceEndpoints.getAllMoneySource.useQuery   
export const useCreateMoneySourceMutation = moneySourceEndpoints.createMoneySource.useMutation
export const useUpdateMoneySourceMutation = moneySourceEndpoints.updateMoneySource.useMutation
export const useDeleteMoneySourceMutation = moneySourceEndpoints.removeMoneySource.useMutation


