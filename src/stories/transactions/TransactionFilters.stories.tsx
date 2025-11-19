import type { Meta, StoryObj } from "@storybook/react"
import { TransactionFilters } from "@features/transactions"

const meta = {
  title: "Transactions/TransactionFilters",
  component: TransactionFilters,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TransactionFilters>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
