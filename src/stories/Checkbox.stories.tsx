import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "@components/ui/checkbox"
import { Label } from "@components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Checkbox component with glass morphism effect and smooth motion animations. Features backdrop blur, gradient overlays, and scale transitions on interaction.",
      },
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}

export const Checked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms-checked" defaultChecked />
      <Label htmlFor="terms-checked">Terms accepted</Label>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms-disabled" disabled />
      <Label htmlFor="terms-disabled" className="opacity-60">
        Cannot be changed
      </Label>
    </div>
  ),
}

export const Multiple: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Select Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="option1" />
          <Label htmlFor="option1">Email notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="option2" defaultChecked />
          <Label htmlFor="option2">SMS notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="option3" defaultChecked />
          <Label htmlFor="option3">Push notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="option4" />
          <Label htmlFor="option4">Marketing emails</Label>
        </div>
      </CardContent>
    </Card>
  ),
}

export const WithGlassEffect: Story = {
  render: () => (
    <div className="p-8 rounded-3xl border border-border/60 bg-card/90 backdrop-blur-xl shadow-soft-lg">
      <h3 className="text-lg font-semibold mb-4">Glass Morphism Checkbox</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="glass1" />
          <Label htmlFor="glass1">Feature with glass effect</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="glass2" defaultChecked />
          <Label htmlFor="glass2">Animated transitions</Label>
        </div>
      </div>
    </div>
  ),
}

