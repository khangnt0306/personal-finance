import type { RouteObject } from "react-router-dom"
import { ProfileSettingsPage, NotificationsSettingsPage, PreferencesPage } from "@features/settings"
import { ProtectedRoute } from "../guards/ProtectedRoute"

export const settingsRoutes: RouteObject[] = [
  {
    path: "settings",
    element: (
      <ProtectedRoute>
        <ProfileSettingsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "settings/notifications",
    element: (
      <ProtectedRoute>
        <NotificationsSettingsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "settings/preferences",
    element: (
      <ProtectedRoute>
        <PreferencesPage />
      </ProtectedRoute>
    ),
  },
]

