import type { Meta, StoryObj } from "@storybook/react"
import { Skeleton } from "@components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"

const meta = {
  title: "Atoms/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Skeleton component with glass morphism effect and smooth pulse animation. Features backdrop blur and animated opacity transitions for loading states.",
      },
    },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Skeleton className="h-4 w-[250px]" />,
}

export const Circle: Story = {
  render: () => <Skeleton className="h-12 w-12 rounded-full" />,
}

export const CardSkeleton: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[200px]" />
      </CardContent>
    </Card>
  ),
}

export const AvatarSkeleton: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
}

export const DashboardSkeleton: Story = {
  render: () => (
    <div className="space-y-6 w-[600px]">
      <div className="space-y-2">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-24 w-full rounded-2xl" />
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[150px]" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
        </CardContent>
      </Card>
    </div>
  ),
}

export const TableSkeleton: Story = {
  render: () => (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Loading Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-3 w-[150px]" />
              </div>
              <Skeleton className="h-6 w-[80px]" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  ),
}

