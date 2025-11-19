import type { Meta, StoryObj } from "@storybook/react"
import { PiggyBank } from "lucide-react"
import { StatTile } from "@components/molecules/stat-tile"

const meta = {
  title: "Molecules/StatTile",
  component: StatTile,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Animated KPI tile built on `@components/molecules/stat-tile`, which itself uses `MotionCard` for entrance transitions.",
      },
    },
  },
  args: {
    label: "Monthly savings",
    value: "₫12,500,000",
    trend: 8.3,
    trendLabel: "vs last month",
    icon: <PiggyBank className="h-6 w-6" />,
  },
} satisfies Meta<typeof StatTile>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NegativeTrend: Story = {
  args: {
    trend: -4.2,
    value: "₫7,900,000",
  },
}

