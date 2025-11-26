import { type UseFormSetError } from "react-hook-form"
import type { NavigateFunction } from "react-router-dom"
import type { AppDispatch } from "@store/index"
import { login } from "@store/slices/auth/auth.slice"
import { UserRole } from "@store/slices/auth/auth.props"
import { showSuccess } from "@lib/toast"
import { authService } from "@features/auth/services"
import type { LoginFormValues } from "@features/auth/validation"
import type { BaseResponse } from "src/types"
import type { LoginRequest, LoginResponse } from "@features/auth/dto/login.dto"

interface LoginHandlerDependencies {
  loginMutation: (credentials: LoginRequest) => Promise<LoginResponse>
  dispatch: AppDispatch
  navigate: NavigateFunction
  setError: UseFormSetError<LoginFormValues>
}

/**
 * Handle login form submission
 * Processes authentication, dispatches login action, and navigates on success
 */
export const handleLoginSubmit = async (
  values: LoginFormValues,
  dependencies: LoginHandlerDependencies
) => {
  const { loginMutation, dispatch, navigate, setError } = dependencies

  try {
    const response = await loginMutation({
      email: values.email,
      password: values.password,
    })

    // Handle Remember Me functionality
    if (values.remember) {
      authService.saveRememberedCredentials(values.email, values.password)
    } else {
      authService.clearRememberedCredentials()
    }

    // Dispatch login action to update Redux store
    console.log("response", response.accessToken)
    dispatch(
      login({
        token: response.accessToken,
        role: UserRole.USER,
        profile: response.user,
      })
    )

    // Show success notification
    showSuccess(`Welcome back, ${response.user.full_name}! 👋`)

    // Navigate to dashboard
    navigate("/", { replace: true })
  } catch (error) {
    console.error("Login error:", error)

    // Extract error message from response
    const errorMessage =
      (error as unknown as BaseResponse<{ message: string }>).data?.message ||
      "Unable to sign in. Please try again."

    // Set form error
    setError("root", { message: errorMessage })
  }
}

/**
 * Handle redirect if already authenticated
 */
export const handleAuthenticatedRedirect = (
  isAuthenticated: boolean,
  navigate: NavigateFunction
) => {
  if (isAuthenticated) {
    navigate("/", { replace: true })
  }
}

/**
 * Load remembered credentials from localStorage
 * Returns the remembered credentials or default empty values
 */
export const loadRememberedCredentials = (): {
  email: string
  password: string
  remember: boolean
} => {
  const remembered = authService.getRememberedCredentials()
  if (remembered) {
    return {
      email: remembered.email,
      password: remembered.password,
      remember: true,
    }
  }

  return {
    email: "",
    password: "",
    remember: false,
  }
}

