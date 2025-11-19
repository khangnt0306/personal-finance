import type { RouteObject } from "react-router-dom"
import { LoginPage } from "@features/auth/pages/LoginPage"
import { RegisterPage } from "@features/auth/pages/RegisterPage"
import { ForgotPasswordPage } from "@features/auth/pages/ForgotPasswordPage"

export const authRoutes: RouteObject[] = [
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPasswordPage />,
  },
]

