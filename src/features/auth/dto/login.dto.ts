import type { UserRole } from "@store/slices/auth/auth.props"

export interface LoginRequest {
    email: string
    password: string
    remember?: boolean
  }
  
  export interface LoginResponse {
    accessToken: string
    user: {
      full_name: string
      email: string
      avatar?: string
      role: UserRole
    }
  }