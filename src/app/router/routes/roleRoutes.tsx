import type { RouteObject } from "react-router-dom"
import { UserRole } from "@store/slices/auth/auth.props"
import { TransactionDetailPage } from "@features/transactions/pages/TransactionDetailPage"

type RoleRouteMap = Partial<Record<UserRole, RouteObject[]>>

export const roleRoutes: RoleRouteMap = {
  [UserRole.ADMIN]: [
    {
      path: "transactions/:id",
      element: <TransactionDetailPage />,
    },
  ],
}


