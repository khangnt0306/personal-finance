import type { Meta, StoryObj } from "@storybook/react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip"
import { Button } from "@components/ui/button"

import { Info } from "lucide-react"

const meta = {
  title: "Atoms/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Tooltip component with glass morphism effect and smooth animations. Features backdrop blur, fade-in transitions, and elegant hover interactions.",
      },
    },
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const WithDelay: Story = {
  render: () => (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover with delay</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This tooltip appears after 300ms</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex items-center gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Info className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View more information</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Info className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Glass morphism tooltip</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
}

