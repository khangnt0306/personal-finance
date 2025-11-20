import type { RouteObject } from "react-router-dom"
import { CategoriesPage } from "@features/categories"

export const categoryRoutes: RouteObject[] = [
  {
    path: "categories",
    element: <CategoriesPage />,
  },
]

