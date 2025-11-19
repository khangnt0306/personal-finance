import type { RouteObject } from "react-router-dom"
import { CategoriesPage } from "@features/categories"
import { ProtectedRoute } from "../guards/ProtectedRoute"

export const categoryRoutes: RouteObject[] = [
  {
    path: "categories",
    element: (
      <ProtectedRoute>
        <CategoriesPage />
      </ProtectedRoute>
    ),
  },
]

