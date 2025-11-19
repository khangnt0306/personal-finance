import type { RouteObject } from "react-router-dom"
import { NotFoundPage } from "@pages/NotFoundPage"
import { UnauthorizedPage } from "@pages/UnauthorizedPage"

export const fallbackRoutes: RouteObject[] = [
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]

