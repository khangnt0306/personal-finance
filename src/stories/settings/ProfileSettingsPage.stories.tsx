import type { Meta, StoryObj } from "@storybook/react"
import { ProfileSettingsPage } from "@features/settings"

const meta = {
  title: "Settings/ProfileSettingsPage",
  component: ProfileSettingsPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ProfileSettingsPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
