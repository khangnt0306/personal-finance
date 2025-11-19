import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "@components/ui/badge"

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Status pill pulled from `@components/ui/badge`. Use badges to highlight financial states such as risk alerts or approvals.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
    },
  },
  args: {
    children: "On track",
    variant: "default",
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Scheduled",
  },
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Overdrawn",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Manual review",
  },
}


