import { injectCRUD, createCustomApi } from "@store/api/base.api"
import type { Transaction } from "@core/types"

export const transactionApi = injectCRUD<Transaction>({
  entityName: "transactions",
  tagType: "Transactions",
  extraEndpoints: (build) => ({
    ...createCustomApi<Transaction, { reason?: string }, { id: string }>(
      {
        name: "approveTransaction",
        url: "/transactions/:id/approve",
        method: "POST",
        tags: ["Transactions"],
      },
      build
    ),
    ...createCustomApi<Transaction, { reason?: string }, { id: string }>(
      {
        name: "rejectTransaction",
        url: "/transactions/:id/reject",
        method: "POST",
        tags: ["Transactions"],
      },
      build
    ),
  }),
})

