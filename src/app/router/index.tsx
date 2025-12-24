import { createBrowserRouter, type RouteObject } from "react-router-dom"
import { DashboardLayout } from "@layouts/DashboardLayout"
import { appRoutes } from "./routes/appRoutes"
import { transactionRoutes } from "./routes/transactionRoutes"
import { categoryRoutes } from "./routes/categoryRoutes"
import { budgetRoutes } from "./routes/budgetRoutes"
import { fallbackRoutes } from "./routes/fallbackRoutes"

const childRoutes: RouteObject[] = [
  ...appRoutes,
  ...transactionRoutes,
  ...categoryRoutes,
  ...budgetRoutes,
]

const routes: RouteObject[] = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: childRoutes,
  },
  ...fallbackRoutes,
]

export const router = createBrowserRouter(routes)
