import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Textarea } from "@components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select"

interface TransactionFormValues {
  amount: string
  type: "expense" | "income"
  category: string
  merchant: string
  date: string
  note?: string
}

const categories = [
  { label: "Groceries", value: "groceries" },
  { label: "Dining", value: "dining" },
  { label: "Housing", value: "housing" },
  { label: "Lifestyle", value: "lifestyle" },
  { label: "Income", value: "income" },
]

export const AddTransactionForm = () => {
  const [statusMessage, setStatusMessage] = useState<string>()
  const form = useForm<TransactionFormValues>({
    defaultValues: {
      amount: "",
      type: "expense",
      category: "groceries",
      merchant: "",
      date: new Date().toISOString().slice(0, 10),
      note: "",
    },
  })

  const handleSubmit = (values: TransactionFormValues) => {
    setStatusMessage(
      `${values.type === "income" ? "Recorded" : "Logged"} ${values.type} for ${values.merchant || "unnamed merchant"}`
    )
    form.reset({ ...values, amount: "" })
  }

  return (
    <div className="rounded-3xl border border-border/60 bg-card/80 p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="amount"
              rules={{ required: "Amount is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Expense", value: "expense" },
                        { label: "Income", value: "income" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => field.onChange(option.value)}
                          className={`rounded-2xl border px-3 py-2 text-sm font-medium transition-all ${
                            field.value === option.value
                              ? "border-primary/60 bg-primary/10 text-primary"
                              : "border-border/60 bg-muted/20 text-muted-foreground"
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

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="merchant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Merchant</FormLabel>
                  <FormControl>
                    <Input placeholder="Company or store" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea rows={3} placeholder="Optional context" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {statusMessage ? (
              <p className="rounded-2xl border border-primary/40 bg-primary/10 px-4 py-2 text-sm text-primary">
                {statusMessage}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">Amounts sync to your cashflow instantly.</p>
            )}
            <Button type="submit" className="w-full sm:w-auto">
              Add transaction
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
