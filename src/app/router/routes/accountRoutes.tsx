import type { RouteObject } from "react-router-dom"
import { LinkedAccountsPage } from "@features/accounts"
import { ProtectedRoute } from "../guards/ProtectedRoute"

export const accountRoutes: RouteObject[] = [
  {
    path: "accounts",
    element: (
      <ProtectedRoute>
        <LinkedAccountsPage />
      </ProtectedRoute>
    ),
  },
]

