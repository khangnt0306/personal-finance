import type { Meta, StoryObj } from "@storybook/react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion"

import { Card } from "@components/ui/card"

const meta = {
  title: "Atoms/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accordion component with glass morphism effect and smooth animations. Features backdrop blur, hover effects, and animated expand/collapse transitions.",
      },
    },
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: () => (
    <Accordion type="single" collapsible className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match the other components'
          aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Multiple: Story = {
  args: {
    type: "multiple",
  },
  render: () => (
    <Accordion type="multiple" className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>
          Content for section 1. Multiple sections can be open at once.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>
          Content for section 2. Multiple sections can be open at once.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section 3</AccordionTrigger>
        <AccordionContent>
          Content for section 3. Multiple sections can be open at once.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const FAQ: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: () => (
    <Card className="w-[500px]">
      <Accordion type="single" collapsible>
        <AccordionItem value="faq-1">
          <AccordionTrigger>How do I add a new transaction?</AccordionTrigger>
          <AccordionContent>
            Click the "Add Transaction" button in the top right corner, fill in the details, and save.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-2">
          <AccordionTrigger>Can I export my data?</AccordionTrigger>
          <AccordionContent>
            Yes, you can export your transactions and reports in CSV or PDF format from the Settings page.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-3">
          <AccordionTrigger>How do I set up a budget?</AccordionTrigger>
          <AccordionContent>
            Go to the Budgets section, click "Create Budget", set your monthly limit, and assign categories.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  ),
}

