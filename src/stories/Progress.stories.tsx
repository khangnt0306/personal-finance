import type { Meta, StoryObj } from "@storybook/react"
import { Progress } from "@components/ui/progress"

const meta = {
  title: "Atoms/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Linear progress indicator coming from `@components/ui/progress`. Great for savings progress or workflow completion.",
      },
    },
  },
  args: {
    value: 42,
    className: "w-72",
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NearComplete: Story = {
  args: {
    value: 86,
  },
}


