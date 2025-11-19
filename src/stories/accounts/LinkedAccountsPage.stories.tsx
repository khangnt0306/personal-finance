import type { Meta, StoryObj } from "@storybook/react"
import { LinkedAccountsPage } from "@features/accounts"

const meta = {
  title: "Accounts/LinkedAccountsPage",
  component: LinkedAccountsPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof LinkedAccountsPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
