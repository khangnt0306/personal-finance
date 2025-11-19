import type { Meta, StoryObj } from "@storybook/react"
import { ReportFilters } from "@features/reports"

const meta = {
  title: "Reports/ReportFilters",
  component: ReportFilters,
  tags: ["autodocs"],
} satisfies Meta<typeof ReportFilters>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
