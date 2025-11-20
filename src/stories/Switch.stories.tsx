import type { Meta, StoryObj } from "@storybook/react"
import { Switch } from "@components/ui/switch"
import { Label } from "@components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@components/ui/card"

const meta = {
  title: "Atoms/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Switch component with glass morphism effect and smooth motion animations. Features backdrop blur, gradient overlays, and animated thumb transitions.",
      },
    },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
}

export const Checked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="notifications" defaultChecked />
      <Label htmlFor="notifications">Enable notifications</Label>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="disabled-switch" disabled />
      <Label htmlFor="disabled-switch" className="opacity-60">
        Disabled switch
      </Label>
    </div>
  ),
}

export const SettingsPanel: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Manage your notification preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-notifications">Email notifications</Label>
            <p className="text-sm text-muted-foreground">Receive updates via email</p>
          </div>
          <Switch id="email-notifications" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="push-notifications">Push notifications</Label>
            <p className="text-sm text-muted-foreground">Get real-time alerts</p>
          </div>
          <Switch id="push-notifications" />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="sms-notifications">SMS notifications</Label>
            <p className="text-sm text-muted-foreground">Text message updates</p>
          </div>
          <Switch id="sms-notifications" defaultChecked />
        </div>
      </CardContent>
    </Card>
  ),
}

