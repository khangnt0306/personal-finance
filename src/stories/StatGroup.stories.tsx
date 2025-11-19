import type { Meta, StoryObj } from "@storybook/react"
import { StatGroup } from "@components/molecules"
import { Wallet, TrendingUp, TrendingDown } from "lucide-react"

const meta = {
  title: "Molecules/StatGroup",
  component: StatGroup,
  tags: ["autodocs"],
  args: {
    columns: 3,
    items: [
      {
        id: "income",
        label: "Monthly income",
        value: "$12,480",
        helper: "vs. target",
        delta: 8.4,
        icon: <TrendingUp className="h-4 w-4" />,
      },
      {
        id: "expense",
        label: "Monthly expense",
        value: "$7,320",
        helper: "spend",
        delta: -3.1,
        icon: <TrendingDown className="h-4 w-4" />,
      },
      {
        id: "balance",
        label: "Net balance",
        value: "$5,160",
        helper: "available to allocate",
        delta: 2.2,
        icon: <Wallet className="h-4 w-4" />,
      },
    ],
  },
} satisfies Meta<typeof StatGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

