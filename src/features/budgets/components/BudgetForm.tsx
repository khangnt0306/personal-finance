import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form"
import { Textarea } from "@components/ui/textarea"

interface BudgetFormValues {
  name: string
  amount: string
  cadence: "monthly" | "quarterly" | "annual"
  description?: string
}

export const BudgetForm = () => {
  const [status, setStatus] = useState<string>()
  const form = useForm<BudgetFormValues>({
    defaultValues: {
      name: "",
      amount: "",
      cadence: "monthly",
      description: "",
    },
  })

  const onSubmit = (values: BudgetFormValues) => {
    setStatus(`Drafted ${values.name || "new budget"} at $${values.amount || "0"}/${values.cadence}`)
    form.reset({ ...values, amount: "" })
  }

  return (
    <div className="rounded-3xl border border-border/60 bg-card/70 p-6">
      <div className="mb-6 space-y-2">
        <h3 className="text-xl font-semibold text-white">Create budget lane</h3>
        <p className="text-sm text-muted-foreground">Budgets sync to the cashflow engine instantly.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            rules={{ required: "Budget name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Global housing" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="amount"
              rules={{ required: "Target amount is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cadence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cadence</FormLabel>
                  <FormControl>
                    <div className="flex gap-3">
                      {[
                        { label: "Monthly", value: "monthly" },
                        { label: "Quarterly", value: "quarterly" },
                        { label: "Annual", value: "annual" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => field.onChange(option.value)}
                          className={`rounded-2xl border px-4 py-2 text-sm font-medium ${
                            field.value === option.value
                              ? "border-primary/60 bg-primary/10 text-primary"
                              : "border-border/60 text-muted-foreground"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea rows={3} placeholder="Why this budget exists" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {status ? (
              <p className="text-sm text-primary">{status}</p>
            ) : (
              <p className="text-sm text-muted-foreground">Budgets inherit alerts when hitting 80% usage.</p>
            )}
            <Button type="submit" className="w-full sm:w-auto">
              Save draft
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
