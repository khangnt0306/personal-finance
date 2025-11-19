import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@components/ui/dialog"
import { Button } from "@components/ui/button"

type DialogStoryProps = {
  title: string
  description: string
  actionLabel: string
  triggerLabel: string
}

const ApprovePaymentDemo = ({
  title,
  description,
  actionLabel,
  triggerLabel,
}: DialogStoryProps) => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>• Amount: ₫12,450,000</p>
          <p>• Category: Operations → SaaS subscriptions</p>
          <p>• Requested by: Finance automation</p>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>{actionLabel}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const meta = {
  title: "Molecules/Dialog",
  component: ApprovePaymentDemo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Modal primitive powered by Radix and exported from `@components/ui/dialog`. Wrap content in `DialogContent` and compose with `DialogTrigger` + footer actions.",
      },
    },
  },
  args: {
    title: "Approve payment",
    description: "Release funds for vendor VD-9473. Confirmation notifies accounting.",
    actionLabel: "Approve",
    triggerLabel: "Review payment",
  },
} satisfies Meta<typeof ApprovePaymentDemo>

export default meta
type Story = StoryObj<typeof meta>

export const ApprovePayment: Story = {}


