import type { Meta, StoryObj } from "@storybook/react"
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group"
import { Label } from "@components/ui/label"

import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"

const meta = {
  title: "Atoms/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radio group component with glass morphism effect and smooth animations. Features backdrop blur, gradient overlays on selection, and scale transitions.",
      },
    },
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one" className="flex gap-6">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="h-option-one" />
        <Label htmlFor="h-option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="h-option-two" />
        <Label htmlFor="h-option-two">Option Two</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="h-option-three" />
        <Label htmlFor="h-option-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
}

export const PaymentMethod: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue="card">
          <div className="flex items-center space-x-2 py-2">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="flex-1 cursor-pointer">
              Credit/Debit Card
            </Label>
          </div>
          <div className="flex items-center space-x-2 py-2">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal" className="flex-1 cursor-pointer">
              PayPal
            </Label>
          </div>
          <div className="flex items-center space-x-2 py-2">
            <RadioGroupItem value="bank" id="bank" />
            <Label htmlFor="bank" className="flex-1 cursor-pointer">
              Bank Transfer
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  ),
}

