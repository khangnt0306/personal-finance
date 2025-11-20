import type { Meta, StoryObj } from "@storybook/react"
import { ToggleGroup, ToggleGroupItem } from "@components/ui/toggle-group"
import { Bold, Italic, Underline } from "lucide-react"

const meta = {
  title: "Atoms/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Toggle group component with glass morphism effect and smooth animations. Features backdrop blur, scale transitions, and coordinated group interactions.",
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
    },
  },
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {
  args: {
    type: "single",
  },
  render: () => (
    <ToggleGroup type="single">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Multiple: Story = {
  args: {
    type: "multiple",
  },
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const WithText: Story = {
  args: {
    type: "single",
  },
  render: () => (
    <ToggleGroup type="single">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const ViewMode: Story = {
  args: {
    type: "single",
  },
  render: () => (
    <div className="p-6 rounded-2xl border border-border/60 bg-card/90 backdrop-blur-xl shadow-soft">
      <p className="text-sm font-medium mb-4">View Mode</p>
      <ToggleGroup type="single" defaultValue="grid">
        <ToggleGroupItem value="list">List</ToggleGroupItem>
        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
        <ToggleGroupItem value="table">Table</ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
}

