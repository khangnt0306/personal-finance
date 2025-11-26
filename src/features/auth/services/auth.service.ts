

export const TOKEN_STORAGE_KEY = "pf_auth_token"
export const USER_STORAGE_KEY = "pf_auth_user"
export const REMEMBER_EMAIL_KEY = "fink-email"
export const REMEMBER_PASSWORD_KEY = "fink-password"
const isBrowser = typeof window !== "undefined"


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

  // Remember Me functionality
  saveRememberedCredentials: (email: string, password: string) => {
    if (!isBrowser) return
    try {
      // Encode để bảo mật cơ bản (không phải encryption thực sự)
      const encodedEmail = btoa(email)
      const encodedPassword = btoa(password)
      localStorage.setItem(REMEMBER_EMAIL_KEY, encodedEmail)
      localStorage.setItem(REMEMBER_PASSWORD_KEY, encodedPassword)
    } catch (error) {
      console.error("Failed to save remembered credentials:", error)
    }
  },

  getRememberedCredentials: (): { email: string; password: string } | null => {
    if (!isBrowser) return null
    try {
      const encodedEmail = localStorage.getItem(REMEMBER_EMAIL_KEY)
      const encodedPassword = localStorage.getItem(REMEMBER_PASSWORD_KEY)

      if (!encodedEmail || !encodedPassword) return null

      return {
        email: atob(encodedEmail),
        password: atob(encodedPassword),
      }
    } catch (error) {
      console.error("Failed to get remembered credentials:", error)
      return null
    }
  },

  clearRememberedCredentials: () => {
    if (!isBrowser) return
    localStorage.removeItem(REMEMBER_EMAIL_KEY)
    localStorage.removeItem(REMEMBER_PASSWORD_KEY)
  },

  hasRememberedCredentials: (): boolean => {
    if (!isBrowser) return false
    return Boolean(
      localStorage.getItem(REMEMBER_EMAIL_KEY) && 
      localStorage.getItem(REMEMBER_PASSWORD_KEY)
    )
  },

}

