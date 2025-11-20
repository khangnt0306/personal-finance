import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Switch } from "@components/ui/switch"
import { Slider } from "@components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group"
import { Label } from "@components/ui/label"
import { Button } from "@components/ui/button"
import { CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert"

export const PreferencesPage = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [compactView, setCompactView] = useState(false)
  const [autoSave, setAutoSave] = useState(true)
  const [currency, setCurrency] = useState("USD")
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY")
  const [fontSize, setFontSize] = useState([14])
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Settings</p>
        <h1 className="text-3xl font-semibold text-white">Preferences</h1>
        <p className="text-muted-foreground">Customize your application experience and appearance.</p>
      </header>

      {saved && (
        <Alert variant="success">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Preferences Saved</AlertTitle>
          <AlertDescription>Your preferences have been updated successfully.</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the look and feel of the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Dark Mode</Label>
              <p className="text-sm text-muted-foreground">Switch to dark theme</p>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Compact View</Label>
              <p className="text-sm text-muted-foreground">Use a more compact layout</p>
            </div>
            <Switch checked={compactView} onCheckedChange={setCompactView} />
          </div>
          <div>
            <Label className="mb-2 block">Font Size</Label>
            <Slider
              value={fontSize}
              onValueChange={setFontSize}
              min={12}
              max={18}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>12px</span>
              <span className="font-semibold">{fontSize[0]}px</span>
              <span>18px</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Configure general application behavior</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto Save</Label>
              <p className="text-sm text-muted-foreground">Automatically save changes</p>
            </div>
            <Switch checked={autoSave} onCheckedChange={setAutoSave} />
          </div>
          <div>
            <Label className="mb-2 block">Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD - US Dollar</SelectItem>
                <SelectItem value="EUR">EUR - Euro</SelectItem>
                <SelectItem value="GBP">GBP - British Pound</SelectItem>
                <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                <SelectItem value="VND">VND - Vietnamese Dong</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-2 block">Date Format</Label>
            <RadioGroup value={dateFormat} onValueChange={setDateFormat}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="MM/DD/YYYY" id="mmddyyyy" />
                <Label htmlFor="mmddyyyy" className="cursor-pointer">MM/DD/YYYY</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="DD/MM/YYYY" id="ddmmyyyy" />
                <Label htmlFor="ddmmyyyy" className="cursor-pointer">DD/MM/YYYY</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="YYYY-MM-DD" id="yyyymmdd" />
                <Label htmlFor="yyyymmdd" className="cursor-pointer">YYYY-MM-DD</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Preferences</Button>
      </div>
    </div>
  )
}

