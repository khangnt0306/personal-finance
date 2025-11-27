import type { RouteObject } from "react-router-dom"
import { PlansPage } from "@features/plans"
import { PlanDetailPage } from "@features/plans/pages/planDetail/PlanDetailPage"

export const planRoutes: RouteObject[] = [
  {
    path: "plans",
    element: <PlansPage />,
  },
  {
    path: "plans/:id",
    element: <PlanDetailPage />,
  },
]

