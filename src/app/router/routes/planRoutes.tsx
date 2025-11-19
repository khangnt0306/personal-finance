import type { RouteObject } from "react-router-dom"
import { PlansPage } from "@features/plans"
import { ProtectedRoute } from "../guards/ProtectedRoute"

export const planRoutes: RouteObject[] = [
  {
    path: "plans",
    element: (
      <ProtectedRoute>
        <PlansPage />
      </ProtectedRoute>
    ),
  },
]

