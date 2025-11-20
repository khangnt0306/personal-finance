import type { Meta, StoryObj } from "@storybook/react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@components/ui/context-menu"

import { Card, CardContent } from "@components/ui/card"

const meta = {
  title: "Atoms/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Context menu component with glass morphism effect and smooth animations. Features backdrop blur, hover effects, and elegant right-click interactions.",
      },
    },
  },
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-xl border border-dashed border-border/60 bg-card/50 backdrop-blur-sm text-sm transition-all hover:bg-card/80">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Back</ContextMenuItem>
        <ContextMenuItem>Forward</ContextMenuItem>
        <ContextMenuItem>Reload</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Save Page As...</ContextMenuItem>
        <ContextMenuItem>Print</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>View Page Source</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

export const InCard: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Card className="w-[400px] cursor-pointer">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Right-click on this card to see the context menu with glass effect
            </p>
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Edit</ContextMenuItem>
        <ContextMenuItem>Duplicate</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Share</ContextMenuItem>
        <ContextMenuItem>Export</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-destructive">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

