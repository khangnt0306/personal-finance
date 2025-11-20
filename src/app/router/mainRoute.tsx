import { createBrowserRouter, type RouteObject } from "react-router-dom"
import { DashboardLayout } from "@layouts/DashboardLayout"
import { appRoutes } from "./routes/appRoutes"
import { transactionRoutes } from "./routes/transactionRoutes"
import { categoryRoutes } from "./routes/categoryRoutes"
import { budgetRoutes } from "./routes/budgetRoutes"
import { fallbackRoutes } from "./routes/fallbackRoutes"
import { planRoutes } from "./routes/planRoutes"
import { authRoutes } from "./routes/authRoutes"
import { goalRoutes } from "./routes/goalRoutes"
import { reportRoutes } from "./routes/reportRoutes"
import { accountRoutes } from "./routes/accountRoutes"
import { settingsRoutes } from "./routes/settingsRoutes"
import { ProtectedRoute } from "./guards/ProtectedRoute"

const childRoutes: RouteObject[] = [
  ...appRoutes,
  ...transactionRoutes,
  ...categoryRoutes,
  ...budgetRoutes,
  ...planRoutes,
  ...goalRoutes,
  ...reportRoutes,
  ...accountRoutes,
  ...settingsRoutes,
]

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <ProtectedRoute redirectTo="/auth/login">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: childRoutes,
  },
  ...authRoutes,
  ...fallbackRoutes,
]

export const router = createBrowserRouter(routes)
