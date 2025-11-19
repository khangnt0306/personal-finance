import { createBrowserRouter, type RouteObject } from "react-router-dom"
import { DashboardLayout } from "@layouts/DashboardLayout"
import { appRoutes } from "./routes/appRoutes"
import { transactionRoutes } from "./routes/transactionRoutes"
import { categoryRoutes } from "./routes/categoryRoutes"
import { budgetRoutes } from "./routes/budgetRoutes"
import { fallbackRoutes } from "./routes/fallbackRoutes"
import { planRoutes } from "./routes/planRoutes"
import { authRoutes } from "./routes/authRoutes"

const childRoutes: RouteObject[] = [
  ...appRoutes,
  ...transactionRoutes,
  ...categoryRoutes,
  ...budgetRoutes,
  ...planRoutes,
]

const routes: RouteObject[] = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: childRoutes,
  },
  ...authRoutes,
  ...fallbackRoutes,
]

export const router = createBrowserRouter(routes)
