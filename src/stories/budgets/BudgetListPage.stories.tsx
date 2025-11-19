import type { Meta, StoryObj } from "@storybook/react"
import { BudgetListPage } from "@features/budgets"

const meta = {
  title: "Budgets/BudgetListPage",
  component: BudgetListPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof BudgetListPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
