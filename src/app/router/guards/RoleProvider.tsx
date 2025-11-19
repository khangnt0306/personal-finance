import { createContext, useContext, useMemo, type ReactNode } from "react"
import { useAuth, type UserRole } from "./AuthProvider"

interface RoleContextValue {
  role: UserRole
  hasRole: (roles: UserRole | UserRole[]) => boolean
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined)

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const { role } = useAuth()

  const value = useMemo<RoleContextValue>(
    () => ({
      role,
      hasRole: (roles: UserRole | UserRole[]) => {
        const allowedRoles = Array.isArray(roles) ? roles : [roles]
        return allowedRoles.includes(role)
      },
    }),
    [role]
  )

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}

export const useRole = () => {
  const context = useContext(RoleContext)
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider")
  }
  return context
}

