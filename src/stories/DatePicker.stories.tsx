import type { Meta, StoryObj } from "@storybook/react"
import { DatePicker } from "@components/ui/date-picker"
import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Label } from "@components/ui/label"

const meta = {
  title: "Atoms/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Date picker component with glass morphism effect and smooth animations. Features backdrop blur, calendar popover with glass effect, and elegant date selection.",
      },
    },
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

const DefaultDatePicker = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return <DatePicker date={date} onDateChange={setDate} />
}

const PlaceholderDatePicker = () => {
  const [date, setDate] = useState<Date | undefined>()
  return (
    <DatePicker
      date={date}
      onDateChange={setDate}
      placeholder="Select a date"
    />
  )
}

const DisabledDatePicker = () => {
  const [date] = useState<Date | undefined>(new Date())
  return <DatePicker date={date} onDateChange={() => {}} disabled />
}

export const Default: Story = {
  render: () => <DefaultDatePicker />,
}

export const WithPlaceholder: Story = {
  render: () => <PlaceholderDatePicker />,
}

export const Disabled: Story = {
  render: () => <DisabledDatePicker />,
}

const DatePickerForm = () => {
  const [date, setDate] = useState<Date | undefined>()
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Transaction Date</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="date">Select Date</Label>
          <DatePicker
            date={date}
            onDateChange={setDate}
            placeholder="Choose a date"
          />
        </div>
        {date && (
          <p className="text-sm text-muted-foreground">
            Selected: {date.toLocaleDateString()}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export const InForm: Story = {
  render: () => <DatePickerForm />,
}

