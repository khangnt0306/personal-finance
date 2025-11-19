import type { Meta, StoryObj } from "@storybook/react"
import { NotificationsPanel } from "@features/notifications"

const meta = {
  title: "Notifications/NotificationsPanel",
  component: NotificationsPanel,
  tags: ["autodocs"],
} satisfies Meta<typeof NotificationsPanel>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
