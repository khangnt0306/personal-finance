import type { RouteObject } from "react-router-dom"
import { authRoutes } from "./authRoutes"
import { fallbackRoutes } from "./fallbackRoutes"

export const publicRoutes: RouteObject[] = [...authRoutes, ...fallbackRoutes]


