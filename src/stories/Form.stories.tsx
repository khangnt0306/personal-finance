import type { Meta, StoryObj } from "@storybook/react"
import { useForm } from "react-hook-form"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@components/ui/form"
import { Input } from "@components/ui/input"
import { Button } from "@components/ui/button"
import type { ComponentType } from "react"

type BudgetFormValues = {
  name: string
  target: number
}

const BudgetEnvelopeDemo = ({ nameLabel, targetLabel }: { nameLabel: string; targetLabel: string }) => {
  const form = useForm<BudgetFormValues>({
    mode: "onBlur",
    defaultValues: { name: "Recurring expenses", target: 8000000 },
  })
  const onSubmit = (values: BudgetFormValues) => {
    console.log(values)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          onSubmit(values)
        })}
        className="space-y-4 rounded-lg border bg-card p-6 shadow-sm"
      >
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "Give the envelope a descriptive name" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{nameLabel}</FormLabel>
              <FormControl>
                <Input placeholder="Payroll reserve" {...field} />
              </FormControl>
              <FormDescription>This label appears across the insights views.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="target"
          rules={{ min: { value: 1000000, message: "Minimum ₫1,000,000" } }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{targetLabel}</FormLabel>
              <FormControl>
                <Input type="number" min={0} step={500000} {...field} />
              </FormControl>
              <FormDescription>Use increments of ₫500,000 for planning parity.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit">Save envelope</Button>
        </div>
      </form>
    </Form>
  )
}

const meta = {
  title: "Molecules/Form",
  component: Form as unknown as ComponentType<{ nameLabel: string; targetLabel: string }>,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Thin wrappers around `react-hook-form` exported from `@components/ui/form`. Pair them with any field control (`Input`, `Select`, etc.) to get consistent labeling, hints, and validation messaging.",
      },
    },
  },
  args: {
    nameLabel: "Envelope name",
    targetLabel: "Monthly target (₫)",
  },
  argTypes: {
    nameLabel: { control: "text" },
    targetLabel: { control: "text" },
  },
} satisfies Meta<{ nameLabel: string; targetLabel: string }>

export default meta
type Story = StoryObj<typeof meta>

export const BudgetEnvelope: Story = {
  render: (props) => <BudgetEnvelopeDemo {...props} />,
}


