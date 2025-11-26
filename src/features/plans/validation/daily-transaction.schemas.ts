import { z } from "zod"

export const dailyTransactionSchema = z.object({
  date: z.string().min(1, "Date is required"),
  label: z.string().min(1, "Label is required"),
  amount: z.string().min(1, "Amount is required"),
})

export type DailyTransactionFormData = z.infer<typeof dailyTransactionSchema>

