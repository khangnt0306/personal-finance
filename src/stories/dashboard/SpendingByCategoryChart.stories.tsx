import type { Meta, StoryObj } from "@storybook/react"
import { SpendingByCategoryChart } from "@features/dashboard"

const meta = {
  title: "Dashboard/SpendingByCategoryChart",
  component: SpendingByCategoryChart,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SpendingByCategoryChart>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
