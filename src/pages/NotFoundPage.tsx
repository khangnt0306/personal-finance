import { Link } from "react-router-dom"
import { Button } from "@components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"

export const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-4xl">404</CardTitle>
          <CardDescription>Page not found</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            The page you are looking for does not exist.
          </p>
          <Button asChild>
            <Link to="/">Go back home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

