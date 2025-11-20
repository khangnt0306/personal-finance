import type { RouteObject } from "react-router-dom"
import { ProfileSettingsPage, NotificationsSettingsPage, PreferencesPage } from "@features/settings"

export const settingsRoutes: RouteObject[] = [
  {
    path: "settings",
    element: <ProfileSettingsPage />,
  },
  {
    path: "settings/notifications",
    element: <NotificationsSettingsPage />,
  },
  {
    path: "settings/preferences",
    element: <PreferencesPage />,
  },
]

