import { baseApi } from "@store/api/base.api"
import type { QueryParams } from "@utils/queryBuilder"
import { buildQueryParams } from "@utils/queryBuilder"

export interface Contribution {
  id: string
  savingGoalId: string
  amount: string
  type: "deposit" | "withdrawal"
  note?: string
  transactionDate: string
  createdAt: string
  updatedAt: string
}

export interface ContributionsResponse {
  transactions: Contribution[]
  pagination: {
    total: number
    skip: number
    limit: number
    totalPages: number
    currentPage: number
  }
}

export interface CreateContributionPayload {
  amount: string
  type: "deposit"
  note?: string
  transactionDate: string
}

export const contributionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getContributions: build.query<
      ContributionsResponse,
      { savingGoalId: string } & QueryParams
    >({
      query: ({ savingGoalId, ...params }) => ({
        url: `/saving-goals/${savingGoalId}/transactions${buildQueryParams(params || { page: 1, limit: 20 })}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.transactions.map(({ id }) => ({
                type: "SavingsGoal" as const,
                id: `transaction-${id}`,
              })),
              { type: "SavingsGoal", id: "LIST" },
            ]
          : [{ type: "SavingsGoal", id: "LIST" }],
    }),

    createContribution: build.mutation<
      Contribution,
      { savingGoalId: string; data: CreateContributionPayload }
    >({
      query: ({ savingGoalId, data }) => ({
        url: `/saving-goals/${savingGoalId}/transactions`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { savingGoalId }) => [
        { type: "SavingsGoal", id: savingGoalId },
        { type: "SavingsGoal", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const contributionEndpoints = (contributionApi as any).endpoints

export const useGetContributionsQuery = contributionEndpoints.getContributions.useQuery
export const useCreateContributionMutation = contributionEndpoints.createContribution.useMutation

