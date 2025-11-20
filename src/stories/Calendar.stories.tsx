import type { Meta, StoryObj } from "@storybook/react"
import { Calendar } from "@components/ui/calendar"
import { useState } from "react"
import type { DateRange } from "react-day-picker"

import { Card } from "@components/ui/card"

const meta = {
  title: "Atoms/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Calendar component with glass morphism effect and smooth interactions. Features backdrop blur on navigation buttons and elegant date selection.",
      },
    },
  },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

const DefaultCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return <Calendar mode="single" selected={date} onSelect={setDate} />
}

const MultipleCalendar = () => {
  const [dates, setDates] = useState<Date[] | undefined>([])
  return <Calendar mode="multiple" selected={dates} onSelect={setDates} />
}

const RangeCalendar = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
  })
  return (
    <Calendar
      mode="range"
      selected={dateRange}
      onSelect={setDateRange}
    />
  )
}

export const Default: Story = {
  render: () => <DefaultCalendar />,
}

export const Multiple: Story = {
  render: () => <MultipleCalendar />,
}

export const Range: Story = {
  render: () => <RangeCalendar />,
}

export const InCard: Story = {
  render: () => (
    <Card className="p-6">
      <DefaultCalendar />
    </Card>
  ),
}

