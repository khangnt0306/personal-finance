import type { RouteObject } from "react-router-dom"
import { IncomeExpenseReportPage, SpendingAnalysisPage } from "@features/reports"

export const reportRoutes: RouteObject[] = [
  {
    path: "reports",
    element: <IncomeExpenseReportPage />,
  },
  {
    path: "reports/spending-analysis",
    element: <SpendingAnalysisPage />,
  },
]

