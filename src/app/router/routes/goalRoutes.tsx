import type { RouteObject } from "react-router-dom"
import { GoalsPage, GoalDetailPage } from "@features/goals"
import { ProtectedRoute } from "../guards/ProtectedRoute"

export const goalRoutes: RouteObject[] = [
  {
    path: "goals",
    element: (
      <ProtectedRoute>
        <GoalsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "goals/:id",
    element: (
      <ProtectedRoute>
        <GoalDetailPage />
      </ProtectedRoute>
    ),
  },
]

