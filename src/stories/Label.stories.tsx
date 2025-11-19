import type { Meta, StoryObj } from "@storybook/react"
import { Label } from "@components/ui/label"

const meta = {
  title: "Atoms/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Typography helper from `@components/ui/label` that keeps form labels in sync with Radix peers and error states.",
      },
    },
  },
  args: {
    children: "Label",
    htmlFor: "field-id",
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Muted: Story = {
  args: {
    className: "text-muted-foreground",
    children: "Optional label",
  },
}


