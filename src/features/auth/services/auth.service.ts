const TOKEN_STORAGE_KEY = "pf_auth_token"
const isBrowser = typeof window !== "undefined"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

interface LoginRequest {
  email: string
  password: string
  remember?: boolean
}

interface LoginResponse {
  token: string
  user: {
    name: string
    email: string
    avatar?: string
  }
}

const mockUserProfiles = [
  {
    name: "Jordan Wells",
    email: "jordan.wells@example.com",
    avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Jordan%20Wells",
  },
  {
    name: "Avery Chen",
    email: "avery.chen@example.com",
    avatar: "https://api.dicebear.com/9.x/micah/svg?seed=Avery%20Chen",
  },
]

const getMockUserByEmail = (email: string) => {
  const normalized = email.trim().toLowerCase()
  return mockUserProfiles.find((user) => user.email === normalized) ?? {
    ...mockUserProfiles[0],
    email: normalized,
    name: normalized.split("@")[0] || mockUserProfiles[0].name,
  }
}

export const authService = {
  TOKEN_STORAGE_KEY,

  saveToken: (token: string) => {
    if (!isBrowser) return
    localStorage.setItem(TOKEN_STORAGE_KEY, token)
  },

  getToken: () => {
    if (!isBrowser) return null
    return localStorage.getItem(TOKEN_STORAGE_KEY)
  },

  clearToken: () => {
    if (!isBrowser) return
    localStorage.removeItem(TOKEN_STORAGE_KEY)
  },

  async login(payload: LoginRequest): Promise<LoginResponse> {
    await delay(600)

    if (!payload.email || !payload.password) {
      throw new Error("Email and password are required")
    }

    // Mocked credential check; replace with real API call when available.
    if (payload.password.length < 4) {
      throw new Error("Invalid email or password")
    }

    const user = getMockUserByEmail(payload.email)

    return {
      token: `mock-token-${crypto.randomUUID()}`,
      user,
    }
  },
}

export type { LoginRequest, LoginResponse }

