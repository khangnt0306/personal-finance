import type { Meta, StoryObj } from "@storybook/react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@components/ui/tabs"

const meta = {
  title: "Molecules/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Tabs controller exported from `@components/ui/tabs`. Use it for switching between finance dashboards or plan summaries.",
      },
    },
  },
  args: {
    defaultValue: "cash",
  },
} satisfies Meta<{ defaultValue: string }>

export default meta
type Story = StoryObj<typeof meta>

export const CashVsInvestments: Story = {
  render: ({ defaultValue }) => (
    <Tabs defaultValue={defaultValue} className="w-[420px]">
      <TabsList className="w-full">
        <TabsTrigger className="flex-1" value="cash">
          Cash flow
        </TabsTrigger>
        <TabsTrigger className="flex-1" value="investments">
          Investments
        </TabsTrigger>
        <TabsTrigger className="flex-1" value="savings">
          Savings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="cash" className="rounded-md border bg-card p-4 shadow-sm">
        <p className="text-sm text-muted-foreground">Operating cash is stable with a 2.4 month runway.</p>
      </TabsContent>
      <TabsContent value="investments" className="rounded-md border bg-card p-4 shadow-sm">
        <p className="text-sm text-muted-foreground">Index portfolio is up 5.8% this quarter.</p>
      </TabsContent>
      <TabsContent value="savings" className="rounded-md border bg-card p-4 shadow-sm">
        <p className="text-sm text-muted-foreground">Automated transfers will complete Friday.</p>
      </TabsContent>
    </Tabs>
  ),
}


