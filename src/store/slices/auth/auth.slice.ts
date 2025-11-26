import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { authService } from "@features/auth/services/auth.service"
import { type AuthState, defaultUser, type UserProfile, type LoginPayload, UserRole } from "./auth.props"
import { TOKEN_STORAGE_KEY,USER_STORAGE_KEY } from "@features/auth/services/auth.service"

const baseState: AuthState = {
  isAuthenticated: false,
  role: UserRole.USER,
  user: defaultUser,
  token: null,
}

const sanitizeUser = (user?: Partial<UserProfile>): UserProfile => ({
  full_name: user?.full_name?.trim() || defaultUser.full_name,
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
    const stored = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (!stored) {
      return { ...baseState, isAuthenticated: hasToken, token: token ?? null }
    }

    const parsed = JSON.parse(stored) as Omit<AuthState, "token">
    const currentToken = authService.getToken()

    return {
      isAuthenticated: hasToken,
      role: parsed.role === UserRole.ADMIN || parsed.role === UserRole.USER ? parsed.role : baseState.role,
      user: sanitizeUser(parsed.user),
      token: currentToken,
    }
  } catch {
    return { ...baseState, isAuthenticated: hasToken, token }
  }
}

const initialState: AuthState = readStoredState()

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      const { token, role = UserRole.USER, profile } = action.payload
      
      authService.saveToken(token)
      
      state.isAuthenticated = true
      state.role = role
      state.user = sanitizeUser({ ...state.user, ...profile })
      state.token = token

      if (typeof window !== "undefined") {
        localStorage.setItem(
          USER_STORAGE_KEY,
          JSON.stringify({
            isAuthenticated: true,
            role: state.role,
            user: state.user,
          })
        )
      }
    },
    logout: (state) => {
      authService.clearToken()
      state.isAuthenticated = false
      state.role = baseState.role
      state.user = baseState.user
      state.token = null

      if (typeof window !== "undefined") {
        localStorage.removeItem(TOKEN_STORAGE_KEY)
      }
    },
    updateUser: (state, action: PayloadAction<Partial<UserProfile>>) => {
      state.user = sanitizeUser({ ...state.user, ...action.payload })
      
      if (typeof window !== "undefined") {
        localStorage.setItem(
          TOKEN_STORAGE_KEY,
          JSON.stringify({
            isAuthenticated: state.isAuthenticated,
            role: state.role,
            user: state.user,
          })
        )
      }
    },
    switchRole: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload
      
      if (typeof window !== "undefined") {
        localStorage.setItem(
          TOKEN_STORAGE_KEY,
          JSON.stringify({
            isAuthenticated: state.isAuthenticated,
            role: state.role,
            user: state.user,
          })
        )
      }
    },
  },
})

export const { login, logout, updateUser, switchRole } = authSlice.actions
export default authSlice.reducer

