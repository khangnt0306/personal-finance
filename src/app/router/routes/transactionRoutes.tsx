import type { RouteObject } from "react-router-dom"
import { TransactionsPage } from "@features/transactions"

export const transactionRoutes: RouteObject[] = [
  {
    path: "transactions",
    element: <TransactionsPage />,
  },
  // Detail route is now exported via roleRoutes to enforce role guards centrally
]

