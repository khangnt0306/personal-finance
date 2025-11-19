import type { Meta, StoryObj } from "@storybook/react"
import { BudgetForm } from "@features/budgets"

const meta = {
  title: "Budgets/BudgetForm",
  component: BudgetForm,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof BudgetForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
