import type { Meta, StoryObj } from "@storybook/react"
import { Plus } from "lucide-react"
import { Button } from "@components/ui/button"

const meta = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Primary action button exposed via `@components/ui/button`. Variants follow the design tokens used in the app shell.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
  },
  args: {
    children: "Transfer funds",
    variant: "default",
    size: "default",
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Preview budget",
  },
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Plus className="h-4 w-4" />
        New allocation
      </>
    ),
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "View audit trail",
  },
}

export const Glass: Story = {
  args: {
    variant: "glass",
    children: "Invite collaborator",
  },
}


