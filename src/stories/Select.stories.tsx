import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectValue,
} from "@components/ui/select"

const LedgerCategoriesDemo = ({ placeholder }: { placeholder: string }) => {
  const [value, setValue] = useState("ops")
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-64">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Spending</SelectLabel>
          <SelectItem value="ops">Operations</SelectItem>
          <SelectItem value="payroll">Payroll</SelectItem>
          <SelectItem value="marketing">Marketing</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Savings</SelectLabel>
          <SelectItem value="short">3-month buffer</SelectItem>
          <SelectItem value="long">Long-term reserve</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const meta = {
  title: "Atoms/Select",
  component: LedgerCategoriesDemo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Accessible dropdown built on Radix and exported from `@components/ui/select`. Pair `SelectTrigger`, `SelectContent`, and items to build pickers.",
      },
    },
  },
  args: {
    placeholder: "Choose category",
  },
} satisfies Meta<typeof LedgerCategoriesDemo>

export default meta
type Story = StoryObj<typeof meta>

export const LedgerCategories: Story = {}


