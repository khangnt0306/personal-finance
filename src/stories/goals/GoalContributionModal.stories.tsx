import type { Meta, StoryObj } from "@storybook/react"
import { GoalContributionModal } from "@features/goals"

const meta = {
  title: "Goals/GoalContributionModal",
  component: GoalContributionModal,
  tags: ["autodocs"],
} satisfies Meta<typeof GoalContributionModal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
