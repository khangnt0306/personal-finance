import { createBrowserRouter, type RouteObject } from "react-router-dom"
import { DashboardLayout } from "@layouts/DashboardLayout"
import { ProtectedRoute } from "./guards/ProtectedRoute"
import { RoleGuard } from "./guards/RoleGuard"
import { UserRole } from "@store/slices/auth/auth.props"
import { publicRoutes } from "./routes/publicRoutes"
import { privateRoutes } from "./routes/privateRoutes"
import { roleRoutes } from "./routes/roleRoutes"

const publicTree: RouteObject = {
  id: "public-routes",
  children: publicRoutes,
}

const privateTree: RouteObject = {
  path: "/",
  element: (
    <ProtectedRoute redirectTo="/auth/login">
      <DashboardLayout />
    </ProtectedRoute>
  ),
  children: privateRoutes,
}

const roleTrees: RouteObject[] = Object.entries(roleRoutes).flatMap(([role, routes]) => {
  if (!routes || routes.length === 0) {
    return []
  }

  return [
    {
      path: "/",
      element: (
        <ProtectedRoute redirectTo="/auth/login">
          <RoleGuard allowedRoles={role as UserRole}>
            <DashboardLayout />
          </RoleGuard>
        </ProtectedRoute>
      ),
      children: routes,
    },
  ]
})

const routes: RouteObject[] = [publicTree, privateTree, ...roleTrees]

export const router = createBrowserRouter(routes)
