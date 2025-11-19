import type { Meta, StoryObj } from "@storybook/react"
import { DataToolbar } from "@components/molecules"
import { Button } from "@components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"

const meta = {
  title: "Molecules/DataToolbar",
  component: DataToolbar,
  tags: ["autodocs"],
  args: {
    searchValue: "",
    searchPlaceholder: "Search records…",
    actions: <Button variant="ghost">Reset</Button>,
    viewOptions: [
      { label: "All", value: "all" },
      { label: "Income", value: "income" },
      { label: "Expense", value: "expense" },
    ],
    currentView: "all",
    filters: (
      <Select value="all">
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All types</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="archived">Archived</SelectItem>
        </SelectContent>
      </Select>
    ),
  },
} satisfies Meta<typeof DataToolbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

