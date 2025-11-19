import type { Meta, StoryObj } from "@storybook/react"
import { BankAccountCard } from "@features/accounts"

const meta = {
  title: "Accounts/BankAccountCard",
  component: BankAccountCard,
  tags: ["autodocs"],
  args: {
    id: "acct",
    name: "High-yield reserve",
    institution: "Mercury",
    balance: 48210,
    lastSync: "3m ago",
    status: "healthy",
  },
} satisfies Meta<typeof BankAccountCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Attention: Story = {
  args: {
    status: "attention",
  },
}
