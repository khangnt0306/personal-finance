import type { Meta, StoryObj } from "@storybook/react"
import { PageHeader } from "@components/molecules"
import { Button } from "@components/ui/button"

const meta = {
  title: "Molecules/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    title: "Financial overview",
    description:
      "Showcase the new glassy header with breadcrumbs, highlights, and primary actions.",
    breadcrumbs: [
      { label: "Dashboard", href: "/" },
      { label: "Overview" },
    ],
    actions: (
      <Button size="lg">
        Primary action
      </Button>
    ),
    highlights: [
      { label: "Income", value: "$12,400" },
      { label: "Expense", value: "$7,950" },
      { label: "Balance", value: "$4,450" },
    ],
  },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

