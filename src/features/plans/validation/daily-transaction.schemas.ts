import { z } from "zod"

export const dailyTransactionSchema = z.object({
  date: z.string().min(1, "Date is required"),
  label: z.string().min(1, "Label is required"),
  amount: z.string().min(1, "Amount is required"),
  isDefault: z.boolean().optional(),
})

export const defaultTransactionSchema = z.object({
  label: z.string().min(1, "Label is required"),
  amount: z.string().min(1, "Amount is required"),
  enabled: z.boolean().default(true),
})

export type DailyTransactionFormData = z.infer<typeof dailyTransactionSchema>
export type DefaultTransactionPayload = z.infer<typeof defaultTransactionSchema>

