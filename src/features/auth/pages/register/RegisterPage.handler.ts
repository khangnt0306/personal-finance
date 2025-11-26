import { type UseFormSetError } from "react-hook-form"
import type { NavigateFunction } from "react-router-dom"
import { showSuccess } from "@lib/toast"
import type { RegisterFormValues } from "../../validation/auth.schemas"
import type { RegisterRequest, RegisterResponse } from "../../dto/register.dto"
import type { BaseResponse } from "src/types"

interface RegisterHandlerDependencies {
  registerMutation: (credentials: RegisterRequest) => Promise<RegisterResponse>
  navigate: NavigateFunction
  setError: UseFormSetError<RegisterFormValues>
}

/**
 * Handle registration form submission
 * Processes user registration, dispatches login action, and navigates on success
 */
export const handleRegisterSubmit = async (
  values: RegisterFormValues,
  dependencies: RegisterHandlerDependencies
) => {
  const { registerMutation, navigate, setError } = dependencies

  try {
    const response = await registerMutation({
      full_name: values.full_name,
      email: values.email,
      password: values.password,
    })
    // Show success notification
    showSuccess(`Account created successfully! Welcome, ${response.full_name}! 🎉`)

    // Navigate to dashboard
    navigate("/auth/login", { replace: true })
  } catch (error) {
    console.error("Registration error:", error)

    // Extract error message
    const errorMessage =
      (error as unknown as BaseResponse<{ message: string[] }>).data?.message[0] || "Account creation failed. Try again."

    // Set form error
    setError("root", { message: errorMessage })
  }
}

