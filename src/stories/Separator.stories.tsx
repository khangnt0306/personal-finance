import type { Meta, StoryObj } from "@storybook/react"
import { Separator } from "@components/ui/separator"

import { Card, CardContent } from "@components/ui/card"

const meta = {
  title: "Atoms/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Separator component with glass morphism effect and smooth fade-in animations. Features backdrop blur and subtle visual separation.",
      },
    },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div>Content above</div>
      <Separator />
      <div>Content below</div>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-10 items-center space-x-4">
      <div>Left</div>
      <Separator orientation="vertical" />
      <div>Right</div>
    </div>
  ),
}

export const InCard: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardContent className="pt-6 space-y-4">
        <div>
          <h4 className="text-sm font-semibold">Section 1</h4>
          <p className="text-sm text-muted-foreground">Content for section 1</p>
        </div>
        <Separator />
        <div>
          <h4 className="text-sm font-semibold">Section 2</h4>
          <p className="text-sm text-muted-foreground">Content for section 2</p>
        </div>
        <Separator />
        <div>
          <h4 className="text-sm font-semibold">Section 3</h4>
          <p className="text-sm text-muted-foreground">Content for section 3</p>
        </div>
      </CardContent>
    </Card>
  ),
}

