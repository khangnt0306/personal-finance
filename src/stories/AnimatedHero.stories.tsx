import type { Meta, StoryObj } from "@storybook/react"
import { AnimatedHero } from "@components/organisms/animated-hero"

const meta = {
  title: "Organisms/AnimatedHero",
  component: AnimatedHero,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Hero section exported from `@components/organisms/animated-hero`. It animates copy blocks and embeds a `MotionButton` for the CTA.",
      },
    },
  },
  args: {
    prefix: "Forecast",
    title: "Plan your quarter with confidence",
    subtitle: "Use real-time insights and AI projections to keep budgets and savings aligned with your long-term strategy.",
    ctaLabel: "Open planner",
  },
} satisfies Meta<typeof AnimatedHero>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomCta: Story = {
  args: {
    ctaLabel: "View cash flow",
  },
}

