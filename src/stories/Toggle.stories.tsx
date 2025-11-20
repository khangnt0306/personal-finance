import type { Meta, StoryObj } from "@storybook/react"
import { Toggle } from "@components/ui/toggle"
import { Bold, Italic, Underline } from "lucide-react"

const meta = {
  title: "Atoms/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Toggle component with glass morphism effect and smooth animations. Features backdrop blur, scale transitions on hover/active, and gradient overlays.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle italic">
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
}

export const WithText: Story = {
  render: () => <Toggle>Toggle</Toggle>,
}

export const Outline: Story = {
  render: () => (
    <Toggle variant="outline" aria-label="Toggle italic">
      <Italic className="h-4 w-4" />
    </Toggle>
  ),
}

export const Group: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </Toggle>
    </div>
  ),
}

export const TextEditor: Story = {
  render: () => (
    <div className="p-6 rounded-2xl border border-border/60 bg-card/90 backdrop-blur-xl shadow-soft space-y-4">
      <div className="flex gap-2 border-b border-border/40 pb-3">
        <Toggle aria-label="Toggle bold" defaultPressed>
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle aria-label="Toggle underline">
          <Underline className="h-4 w-4" />
        </Toggle>
      </div>
      <div className="min-h-[100px] text-sm text-muted-foreground">
        Start typing your text here...
      </div>
    </div>
  ),
}

