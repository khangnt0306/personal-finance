import type { Meta, StoryObj } from "@storybook/react"
import { SyncAccountModal } from "@features/accounts"

const meta = {
  title: "Accounts/SyncAccountModal",
  component: SyncAccountModal,
  tags: ["autodocs"],
} satisfies Meta<typeof SyncAccountModal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
