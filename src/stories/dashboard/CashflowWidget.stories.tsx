import type { Meta, StoryObj } from "@storybook/react"
import { CashflowWidget } from "@features/dashboard"

const meta = {
  title: "Dashboard/CashflowWidget",
  component: CashflowWidget,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CashflowWidget>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
