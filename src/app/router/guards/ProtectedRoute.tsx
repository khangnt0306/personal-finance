import { Navigate, useLocation } from "react-router-dom"
import type { ReactElement } from "react"
import { useAuth } from "./AuthProvider"

interface ProtectedRouteProps {
  children: ReactElement
  redirectTo?: string
}

export const ProtectedRoute = ({ children, redirectTo = "/unauthorized" }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  return children
}

