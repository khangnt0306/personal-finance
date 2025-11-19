import type { Meta, StoryObj } from "@storybook/react"
import { ActionReminderBanner } from "@features/common"

const meta = {
  title: "Common/ActionReminderBanner",
  component: ActionReminderBanner,
  tags: ["autodocs"],
} satisfies Meta<typeof ActionReminderBanner>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
