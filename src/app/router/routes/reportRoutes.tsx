import type { RouteObject } from "react-router-dom"
import { IncomeExpenseReportPage, SpendingAnalysisPage } from "@features/reports"
import { ProtectedRoute } from "../guards/ProtectedRoute"

export const reportRoutes: RouteObject[] = [
  {
    path: "reports",
    element: (
      <ProtectedRoute>
        <IncomeExpenseReportPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "reports/spending-analysis",
    element: (
      <ProtectedRoute>
        <SpendingAnalysisPage />
      </ProtectedRoute>
    ),
  },
]

