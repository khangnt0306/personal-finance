import { z } from "zod"

export const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z.number().positive("Amount must be greater than 0"),
  categoryId: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().min(1, "Date is required"),
})

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["income", "expense"]),
  icon: z.string().optional(),
  color: z.string().optional(),
})

export const budgetSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  period: z.enum(["monthly", "yearly"]),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
})

export type TransactionFormData = z.infer<typeof transactionSchema>
export type CategoryFormData = z.infer<typeof categorySchema>
export type BudgetFormData = z.infer<typeof budgetSchema>

