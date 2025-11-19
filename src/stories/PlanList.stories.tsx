import type { Meta, StoryObj } from "@storybook/react"
import { PlanList } from "@features/plans/components/plan-list"
import type { Plan } from "@features/plans/types"

const samplePlans: Plan[] = [
  {
    id: "plan-1",
    name: "Emergency fund",
    description: "Save 6 months of expenses",
    targetAmount: 15000,
    currentAmount: 4500,
    startDate: "2024-01-01T00:00:00.000Z",
    endDate: "2024-12-31T00:00:00.000Z",
    status: "in_progress",
    priority: "high",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-05-10T00:00:00.000Z",
  },
  {
    id: "plan-2",
    name: "Family vacation",
    description: "Summer trip with the family",
    targetAmount: 8000,
    currentAmount: 8000,
    startDate: "2024-03-01T00:00:00.000Z",
    endDate: "2024-08-01T00:00:00.000Z",
    status: "completed",
    priority: "medium",
    createdAt: "2024-02-10T00:00:00.000Z",
    updatedAt: "2024-07-20T00:00:00.000Z",
  },
]

const meta = {
  title: "Features/Plans/PlanList",
  component: PlanList,
  tags: ["autodocs"],
  args: {
    plans: samplePlans,
    onEdit: () => undefined,
    onDelete: () => undefined,
    isLoading: false,
  },
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PlanList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Loading: Story = {
  args: {
    isLoading: true,
    plans: [],
  },
}

