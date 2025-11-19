import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"

const meta = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Text field primitive from `@components/ui/input`. It inherits typography + focus rings from the design system so you only need to control props.",
      },
    },
  },
  args: {
    placeholder: "Search transactions",
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="income-goal">Income goal</Label>
      <Input id="income-goal" type="number" placeholder="₫25,000,000" {...args} />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "Auto-filled",
  },
}


