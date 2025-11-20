import type { RouteObject } from "react-router-dom"
import { GoalsPage, GoalDetailPage } from "@features/goals"

export const goalRoutes: RouteObject[] = [
  {
    path: "goals",
    element: <GoalsPage />,
  },
  {
    path: "goals/:id",
    element: <GoalDetailPage />,
  },
]

