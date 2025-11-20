import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Switch } from "@components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion"
import { Separator } from "@components/ui/separator"
import { Label } from "@components/ui/label"
import { Button } from "@components/ui/button"
import { CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert"

export const NotificationsSettingsPage = () => {
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [pushEnabled, setPushEnabled] = useState(false)
  const [smsEnabled, setSmsEnabled] = useState(false)
  const [budgetAlerts, setBudgetAlerts] = useState(true)
  const [transactionAlerts, setTransactionAlerts] = useState(true)
  const [goalAlerts, setGoalAlerts] = useState(true)
  const [frequency, setFrequency] = useState("realtime")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Settings</p>
        <h1 className="text-3xl font-semibold text-white">Notifications</h1>
        <p className="text-muted-foreground">Manage how and when you receive notifications.</p>
      </header>

      {saved && (
        <Alert variant="success">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Settings Saved</AlertTitle>
          <AlertDescription>Your notification preferences have been updated.</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
          <CardDescription>Choose how you want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="channels">
              <AccordionTrigger>Channel Settings</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Get real-time push notifications</p>
                    </div>
                    <Switch checked={pushEnabled} onCheckedChange={setPushEnabled} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive text message alerts</p>
                    </div>
                    <Switch checked={smsEnabled} onCheckedChange={setSmsEnabled} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alert Types</CardTitle>
          <CardDescription>Configure what triggers notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Budget Alerts</Label>
              <p className="text-sm text-muted-foreground">Notify when budgets are exceeded or approaching limits</p>
            </div>
            <Switch checked={budgetAlerts} onCheckedChange={setBudgetAlerts} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Transaction Alerts</Label>
              <p className="text-sm text-muted-foreground">Get notified of large or unusual transactions</p>
            </div>
            <Switch checked={transactionAlerts} onCheckedChange={setTransactionAlerts} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Goal Alerts</Label>
              <p className="text-sm text-muted-foreground">Receive updates on goal progress and milestones</p>
            </div>
            <Switch checked={goalAlerts} onCheckedChange={setGoalAlerts} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Frequency</CardTitle>
          <CardDescription>How often should we send notifications?</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={frequency} onValueChange={setFrequency}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="realtime" id="realtime" />
              <Label htmlFor="realtime" className="cursor-pointer">
                Real-time - Get notified immediately
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily" className="cursor-pointer">
                Daily digest - Summary once per day
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly" className="cursor-pointer">
                Weekly summary - Once per week
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Preferences</Button>
      </div>
    </div>
  )
}

