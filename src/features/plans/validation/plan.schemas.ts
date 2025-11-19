import { z } from "zod"

export const planSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().max(500, "Description is too long").optional(),
  targetAmount: z.number().positive("Target amount must be greater than 0"),
  currentAmount: z.number().min(0, "Current amount must be 0 or more"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  status: z.enum(["not_started", "in_progress", "completed", "on_hold"]),
  priority: z.enum(["low", "medium", "high"]),
})

export const planUpdateSchema = planSchema.partial().extend({
  id: z.string().min(1, "Plan id is required"),
})

export type PlanFormData = z.infer<typeof planSchema>
export type PlanUpdateFormData = z.infer<typeof planUpdateSchema>

