import type { RouteObject } from "react-router-dom"
import { PlansPage } from "@features/plans"

export const planRoutes: RouteObject[] = [
  {
    path: "plans",
    element: <PlansPage />,
  },
]

