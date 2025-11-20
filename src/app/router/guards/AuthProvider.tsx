import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { authService } from "@features/auth/services/auth.service"

const STORAGE_KEY = "pf_auth_state"

export type UserRole = "admin" | "user"

export interface UserProfile {
  name: string
  email: string
  avatar?: string
}

interface AuthState {
  isAuthenticated: boolean
  role: UserRole
  user: UserProfile
}

interface LoginOptions {
  token: string
  role?: UserRole
  profile?: Partial<UserProfile>
}

interface AuthContextValue extends AuthState {
  login: (options: LoginOptions) => void
  logout: () => void
  switchRole: (role: UserRole) => void
  updateUser: (profile: Partial<UserProfile>) => void
}

const defaultUser: UserProfile = {
  name: "Jordan Wells",
  email: "jordan.wells@example.com",
  avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Jordan%20Wells",
}

const baseState: AuthState = {
  isAuthenticated: false,
  role: "user",
  user: defaultUser,
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const sanitizeUser = (user?: Partial<UserProfile>): UserProfile => ({
  name: user?.name?.trim() || defaultUser.name,
  email: user?.email?.trim().toLowerCase() || defaultUser.email,
  avatar: user?.avatar || defaultUser.avatar,
})

const readStoredState = (): AuthState => {
  const token = authService.getToken()
  const hasToken = Boolean(token)

  if (typeof window === "undefined") {
    return { ...baseState }
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return { ...baseState, isAuthenticated: hasToken }
    }

    const parsed = JSON.parse(stored) as AuthState

    return {
      isAuthenticated: hasToken,
      role: parsed.role === "admin" || parsed.role === "user" ? parsed.role : baseState.role,
      user: sanitizeUser(parsed.user),
    }
  } catch {
    return { ...baseState, isAuthenticated: hasToken }
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(() => readStoredState())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authState))
  }, [authState])

  const login = useCallback(({ token, role = "user", profile }: LoginOptions) => {
    authService.saveToken(token)
    setAuthState((prev) => ({
      isAuthenticated: true,
      role,
      user: sanitizeUser({ ...prev.user, ...profile }),
    }))
  }, [])

  const logout = useCallback(() => {
    authService.clearToken()
    setAuthState({ ...baseState })
  }, [])

  const switchRole = useCallback((role: UserRole) => {
    setAuthState((prev) => ({ ...prev, role }))
  }, [])

  const updateUser = useCallback((profile: Partial<UserProfile>) => {
    setAuthState((prev) => ({ ...prev, user: sanitizeUser({ ...prev.user, ...profile }) }))
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      ...authState,
      login,
      logout,
      switchRole,
      updateUser,
    }),
    [authState, login, logout, switchRole, updateUser]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

