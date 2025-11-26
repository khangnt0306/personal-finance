import { RouterProvider } from "react-router-dom"
import { ReduxProvider } from "./providers/ReduxProvider"
import { router } from "./router/mainRoute"
import { RoleProvider } from "./router/guards/RoleProvider"
import { Toaster } from "@components/ui/toaster"

function App() {
  return (
    <ReduxProvider>
      <RoleProvider>
        <RouterProvider router={router} />
        <Toaster />
      </RoleProvider>
    </ReduxProvider>
  )
}

export default App

