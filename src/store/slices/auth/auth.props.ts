export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export interface UserProfile {
  full_name: string
  email: string
  avatar?: string
}

export interface LoginPayload {
  token: string
  role?: UserRole
  profile?: Partial<UserProfile>
}

export interface AuthState {
  isAuthenticated: boolean
  role: UserRole
  user: UserProfile
  token: string | null
}

export const defaultUser: UserProfile = {
  full_name: "Jordan Wells",
  email: "jordan.wells@example.com",
  avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Jordan%20Wells",
}