import { useState } from "react"
import { SecuritySettingsForm } from "../components/SecuritySettingsForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Input } from "@components/ui/input"
import { Button } from "@components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar"
import { Switch } from "@components/ui/switch"
import { Slider } from "@components/ui/slider"
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert"
import { Separator } from "@components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion"
import { Label } from "@components/ui/label"
import { CheckCircle2, Upload } from "lucide-react"

export const ProfileSettingsPage = () => {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [autoSync, setAutoSync] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState([30])
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Settings</p>
        <h1 className="text-3xl font-semibold text-white">Profile & security</h1>
        <p className="text-muted-foreground">Curate your workspace identity and guard the perimeter.</p>
      </header>

      {saved && (
        <Alert variant="success">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Settings Saved</AlertTitle>
          <AlertDescription>Your profile settings have been updated successfully.</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update name and contact signals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback>JW</AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Upload Photo
              </Button>
              <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF. Max size 2MB</p>
            </div>
          </div>
          <Separator />
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
          <Button className="w-full sm:w-auto" onClick={handleSave}>Save profile</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize your application experience</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="notifications">
              <AccordionTrigger>Notification Settings</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Get real-time alerts on your device</p>
                    </div>
                    <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="sync">
              <AccordionTrigger>Sync Settings</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto Sync</Label>
                      <p className="text-sm text-muted-foreground">Automatically sync data across devices</p>
                    </div>
                    <Switch checked={autoSync} onCheckedChange={setAutoSync} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="security">
              <AccordionTrigger>Security Settings</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label className="mb-2 block">Session Timeout (minutes)</Label>
                    <Slider
                      value={sessionTimeout}
                      onValueChange={setSessionTimeout}
                      min={5}
                      max={120}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>5 min</span>
                      <span className="font-semibold">{sessionTimeout[0]} min</span>
                      <span>120 min</span>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <SecuritySettingsForm />
    </div>
  )
}
