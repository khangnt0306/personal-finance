import type { Meta, StoryObj } from "@storybook/react"
import { SecuritySettingsForm } from "@features/settings"

const meta = {
  title: "Settings/SecuritySettingsForm",
  component: SecuritySettingsForm,
  tags: ["autodocs"],
} satisfies Meta<typeof SecuritySettingsForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
