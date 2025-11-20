import type { RouteObject } from "react-router-dom"
import { BudgetsPage, BudgetDetailPage } from "@features/budgets"
import { ProtectedRoute } from "../guards/ProtectedRoute"
// import { RoleGuard } from "../guards/RoleGuard"

export const budgetRoutes: RouteObject[] = [
  {
    path: "budgets",
    element: (
      <ProtectedRoute>
        {/* <RoleGuard allowedRoles={["admin"]}> */}
          <BudgetsPage />
        {/* </RoleGuard> */}
      </ProtectedRoute>
    ),
  },
  {
    path: "budgets/:id",
    element: (
      <ProtectedRoute>
        <BudgetDetailPage />
      </ProtectedRoute>
    ),
  },
]

