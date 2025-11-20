import type { RouteObject } from "react-router-dom"
import { BudgetsPage, BudgetDetailPage } from "@features/budgets"

export const budgetRoutes: RouteObject[] = [
  {
    path: "budgets",
    element: <BudgetsPage />,
  },
  {
    path: "budgets/:id",
    element: <BudgetDetailPage />,
  },
]

