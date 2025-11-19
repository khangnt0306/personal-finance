import type { Meta, StoryObj } from "@storybook/react"
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@components/ui/card"
import { Button } from "@components/ui/button"

type CardStoryProps = {
  title: string
  description: string
  kpi: string
  trend: string
}

const meta = {
  title: "Atoms/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Composable surface from `@components/ui/card`. Combine header, content, and footer slots to build higher-level UI such as KPI tiles.",
      },
    },
  },
  args: {
    title: "Operating budget",
    description: "Current quarter allocation",
    kpi: "₫85,200,000",
    trend: "+4.1% vs plan",
  },
} satisfies Meta<CardStoryProps>

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: ({ title, description, kpi, trend }) => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold">{kpi}</p>
        <p className="mt-2 text-sm text-muted-foreground">{trend}</p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button size="sm" variant="outline">
          View detail
        </Button>
      </CardFooter>
    </Card>
  ),
}


