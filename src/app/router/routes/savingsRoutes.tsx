import type { RouteObject } from "react-router-dom"
import { SavingsPage } from "@features/savings"

export const savingsRoutes: RouteObject[] = [
  {
    path: "savings",
    element: <SavingsPage />,
  },
]

