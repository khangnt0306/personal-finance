import type { Meta, StoryObj } from "@storybook/react"
import { EmptyState } from "@components/molecules"
import { Button } from "@components/ui/button"
import { Inbox } from "lucide-react"

const meta = {
  title: "Molecules/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  args: {
    title: "No records yet",
    description: "Kickstart your dataset by adding a record or importing from CSV.",
    icon: <Inbox className="h-6 w-6" />,
    action: {
      label: "Add record",
      onClick: () => {},
    },
    secondaryAction: <Button variant="ghost">Import CSV</Button>,
  },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

