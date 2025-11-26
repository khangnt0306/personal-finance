import { Navigate, useLocation } from "react-router-dom"
import type { ReactElement } from "react"
import { useAppSelector } from "@store/hooks"

interface ProtectedRouteProps {
  children: ReactElement
  redirectTo?: string
}

export const ProtectedRoute = ({ children, redirectTo = "/unauthorized" }: ProtectedRouteProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  return children
}

