import type { Meta, StoryObj } from "@storybook/react"
import { GoalProgressCard } from "@features/goals"

const meta = {
  title: "Goals/GoalProgressCard",
  component: GoalProgressCard,
  tags: ["autodocs"],
  args: {
    id: "goal",
    title: "Emergency reserve",
    target: 25000,
    current: 18200,
    deadline: "Aug 2025",
  },
} satisfies Meta<typeof GoalProgressCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Complete: Story = {
  args: {
    current: 25000,
  },
}
