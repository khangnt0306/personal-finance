import type { Meta, StoryObj } from "@storybook/react"
import { IncomeExpenseReportPage } from "@features/reports"

const meta = {
  title: "Reports/IncomeExpenseReportPage",
  component: IncomeExpenseReportPage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof IncomeExpenseReportPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
