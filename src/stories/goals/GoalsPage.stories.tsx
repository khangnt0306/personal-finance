import type { Meta, StoryObj } from "@storybook/react"
import { GoalsPage } from "@features/goals"

const meta = {
  title: "Goals/GoalsPage",
  component: GoalsPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof GoalsPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
