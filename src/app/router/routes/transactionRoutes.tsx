import type { RouteObject } from "react-router-dom"
import { TransactionsPage } from "@features/transactions"
import { TransactionDetailPage } from "@features/transactions/pages/TransactionDetailPage"
import { ProtectedRoute } from "../guards/ProtectedRoute"
import { RoleGuard } from "../guards/RoleGuard"

export const transactionRoutes: RouteObject[] = [
  {
    path: "transactions",
    element: (
      <ProtectedRoute>
        <TransactionsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "transactions/:id",
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles="admin">
          <TransactionDetailPage />
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
]

