import type { Meta, StoryObj } from "@storybook/react"
import { PeriodComparisonChart } from "@features/reports"

const meta = {
  title: "Reports/PeriodComparisonChart",
  component: PeriodComparisonChart,
  tags: ["autodocs"],
} satisfies Meta<typeof PeriodComparisonChart>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
