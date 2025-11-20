import type { RouteObject } from "react-router-dom"
import { LinkedAccountsPage } from "@features/accounts"

export const accountRoutes: RouteObject[] = [
  {
    path: "accounts",
    element: <LinkedAccountsPage />,
  },
]

