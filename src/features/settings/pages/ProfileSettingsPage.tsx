import { SecuritySettingsForm } from "../components/SecuritySettingsForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Input } from "@components/ui/input"
import { Button } from "@components/ui/button"

export const ProfileSettingsPage = () => {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Settings</p>
        <h1 className="text-3xl font-semibold text-white">Profile & security</h1>
        <p className="text-muted-foreground">Curate your workspace identity and guard the perimeter.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update name and contact signals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 text-sm">
              <span className="text-muted-foreground">Full name</span>
              <Input defaultValue="Jordan Wells" />
            </label>
            <label className="space-y-1 text-sm">
              <span className="text-muted-foreground">Email</span>
              <Input defaultValue="jordan@aurora.money" />
            </label>
          </div>
          <Button className="w-full sm:w-auto">Save profile</Button>
        </CardContent>
      </Card>

      <SecuritySettingsForm />
    </div>
  )
}
