import type { Meta, StoryObj } from "@storybook/react"
import { AddTransactionForm } from "@features/transactions"

const meta = {
  title: "Transactions/AddTransactionForm",
  component: AddTransactionForm,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AddTransactionForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
