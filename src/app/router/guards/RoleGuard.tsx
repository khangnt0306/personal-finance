import { Navigate } from "react-router-dom"
import type { ReactElement } from "react"
import { useAppSelector } from "@store/hooks"
import { UserRole } from "@store/slices/auth/auth.props"

interface RoleGuardProps {
  allowedRoles: UserRole | UserRole[]
  children: ReactElement
  fallback?: ReactElement
}

export const RoleGuard = ({ allowedRoles, children, fallback }: RoleGuardProps) => {
  const userRole = useAppSelector((state) => state.auth.role)
  
  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    const allowedRolesArray = Array.isArray(roles) ? roles : [roles]
    return allowedRolesArray.includes(userRole)
  }

  if (!hasRole(allowedRoles)) {
    if (fallback) {
      return fallback
    }
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

