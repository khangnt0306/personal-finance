import { Link } from "react-router-dom"
import { Button } from "@components/ui/button"

export const UnauthorizedPage = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 text-center">
      <span className="text-4xl">🔒</span>
      <div>
        <h1 className="text-2xl font-semibold">Access restricted</h1>
        <p className="mt-2 text-muted-foreground">
          You don&apos;t have permission to view this page. Please switch to an authorized account or return
          to the dashboard.
        </p>
      </div>
      <Button asChild>
        <Link to="/">Back to dashboard</Link>
      </Button>
    </div>
  )
}

