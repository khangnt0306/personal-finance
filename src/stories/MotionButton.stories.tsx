import type { Meta, StoryObj } from "@storybook/react"
import { Plus, Shield } from "lucide-react"
import { MotionButton } from "@components/ui/motion-button"

const meta = {
  title: "Atoms/MotionButton",
  component: MotionButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Animated action button built by combining Framer Motion with the base button from `@components/ui/motion-button`. Use for prominent CTAs.",
      },
    },
  },
  args: {
    children: "Add transaction",
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
} satisfies Meta<typeof MotionButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: "default",
  },
}

export const WithIcon: Story = {
  args: {
    variant: "secondary",
    children: (
      <>
        <Plus className="h-4 w-4" />
        Add transaction
      </>
    ),
  },
}

export const AdminAction: Story = {
  args: {
    variant: "destructive",
    children: (
      <>
        <Shield className="h-4 w-4" />
        Approve transfer
      </>
    ),
    whileHover: { scale: 1.05, rotate: 1 },
  },
}

