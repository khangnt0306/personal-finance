import type { Meta, StoryObj } from "@storybook/react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet"
import { Button } from "@components/ui/button"

import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"

const meta = {
  title: "Atoms/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Sheet component with glass morphism effect and smooth slide animations. Features backdrop blur, elegant transitions, and multiple side positions.",
      },
    },
  },
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              defaultValue="John Doe"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue="john@example.com"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Left Sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Sidebar</SheetTitle>
          <SheetDescription>Content from the left side.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
}

