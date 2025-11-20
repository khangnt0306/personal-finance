import { RouterProvider } from "react-router-dom"
import { ReduxProvider } from "./providers/ReduxProvider"
import { router } from "./router/mainRoute"
import { AuthProvider } from "./router/guards/AuthProvider"
import { RoleProvider } from "./router/guards/RoleProvider"

function App() {
  return (
    <ReduxProvider>
      <AuthProvider>
        <RoleProvider>
          <RouterProvider router={router} />
        </RoleProvider>
      </AuthProvider>
    </ReduxProvider>
  )
}

export default App

