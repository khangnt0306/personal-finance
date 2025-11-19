import type { Meta, StoryObj } from "@storybook/react"
import { ActivityTimeline } from "@components/organisms/activity-timeline"
import { TrendingUp, TrendingDown, Wallet } from "lucide-react"

const meta = {
  title: "Organisms/ActivityTimeline",
  component: ActivityTimeline,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Animated ledger timeline from `@components/organisms/activity-timeline`. Feed it a list of events to visualize inflows/outflows.",
      },
    },
  },
  args: {
    items: [
      {
        id: "1",
        title: "Salary deposited",
        description: "+₫25,000,000 • Payroll",
        timestamp: "2 hours ago",
        status: "success",
        icon: <TrendingUp className="h-3 w-3" />,
      },
      {
        id: "2",
        title: "Paid utility bill",
        description: "-₫1,200,000 • Utilities",
        timestamp: "Yesterday",
        status: "warning",
        icon: <TrendingDown className="h-3 w-3" />,
      },
      {
        id: "3",
        title: "Moved funds to savings",
        description: "-₫5,000,000 • Savings",
        timestamp: "2 days ago",
        status: "info",
        icon: <Wallet className="h-3 w-3" />,
      },
    ],
  },
} satisfies Meta<typeof ActivityTimeline>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

