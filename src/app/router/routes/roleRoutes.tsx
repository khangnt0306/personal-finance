import type { RouteObject } from "react-router-dom"
import type { UserRole } from "../guards/AuthProvider"
import { TransactionDetailPage } from "@features/transactions/pages/TransactionDetailPage"

type RoleRouteMap = Partial<Record<UserRole, RouteObject[]>>

export const roleRoutes: RoleRouteMap = {
  admin: [
    {
      path: "transactions/:id",
      element: <TransactionDetailPage />,
    },
  ],
}


