import type { Meta, StoryObj } from "@storybook/react"
import { OverviewCards } from "@features/dashboard"

const meta = {
  title: "Dashboard/OverviewCards",
  component: OverviewCards,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof OverviewCards>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
