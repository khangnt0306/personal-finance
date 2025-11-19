import { Navigate } from "react-router-dom"
import type { ReactElement } from "react"
import { useRole } from "./RoleProvider"
import type { UserRole } from "./AuthProvider"

interface RoleGuardProps {
  allowedRoles: UserRole | UserRole[]
  children: ReactElement
  fallback?: ReactElement
}

export const RoleGuard = ({ allowedRoles, children, fallback }: RoleGuardProps) => {
  const { hasRole } = useRole()

  if (!hasRole(allowedRoles)) {
    if (fallback) {
      return fallback
    }
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

