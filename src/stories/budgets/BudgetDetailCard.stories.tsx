import type { Meta, StoryObj } from "@storybook/react"
import { BudgetDetailCard } from "@features/budgets"

const meta = {
  title: "Budgets/BudgetDetailCard",
  component: BudgetDetailCard,
  tags: ["autodocs"],
  args: {
    id: "sample",
    name: "Wellness budget",
    planned: 1200,
    spent: 620,
    renews: "Mar 10",
    owner: "Jordan",
  },
} satisfies Meta<typeof BudgetDetailCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const OverBudget: Story = {
  args: {
    spent: 1500,
  },
}
