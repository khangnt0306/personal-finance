import type { Meta, StoryObj } from "@storybook/react"
import { RecentTransactionsTable } from "@features/transactions"

const meta = {
  title: "Transactions/RecentTransactionsTable",
  component: RecentTransactionsTable,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof RecentTransactionsTable>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
