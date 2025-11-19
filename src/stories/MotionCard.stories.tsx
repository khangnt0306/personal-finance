import type { Meta, StoryObj } from "@storybook/react"
import { MotionCard } from "@components/ui/motion-card"

const meta = {
  title: "Atoms/MotionCard",
  component: MotionCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Motion-enabled card from `@components/ui/motion-card`. Built on top of Framer Motion for simple entrance and hover animations.",
      },
    },
  },
  args: {
    className: "max-w-md p-6",
  },
} satisfies Meta<typeof MotionCard>

export default meta
type Story = StoryObj<typeof meta>

export const FinancialHighlight: Story = {
  render: (args) => (
    <MotionCard {...args}>
      <p className="text-sm text-muted-foreground">Q1 burn</p>
      <p className="mt-2 text-3xl font-semibold">₫42,900,000</p>
      <p className="mt-3 text-sm text-emerald-500">Saved 12% vs projection</p>
    </MotionCard>
  ),
}

export const WithDelay: Story = {
  args: {
    initial: { opacity: 0, y: 24 },
    transition: { duration: 0.6, delay: 0.2 },
  },
  render: (args) => (
    <MotionCard {...args}>
      <p className="text-sm text-muted-foreground">Cash runway</p>
      <p className="mt-2 text-3xl font-semibold">9.4 months</p>
    </MotionCard>
  ),
}


