import { z } from "zod"

export const planSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  description: z.string().max(500, "Description is too long").optional(),
  currency: z.enum(["VND", "USD", "EUR"]),
  planType: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
  autoRepeat: z.boolean(),
  autoAdjustEnabled: z.boolean(),
  dailyMinLimit: z.number().min(0, "Daily min limit must be 0 or more").max(100, "Daily min limit must be 100 or less"),
  warnLevelYellow: z.number().min(0, "Yellow level must be 0 or more").max(100, "Yellow level must be 100 or less"),
  warnLevelRed: z.number().min(0, "Red level must be 0 or more").max(100, "Red level must be 100 or less"),
}).refine(
  (data) => data.warnLevelYellow < data.warnLevelRed,
  {
    message: "Yellow warning level must be less than red warning level",
    path: ["warnLevelRed"],
  }
)

export const planUpdateSchema = planSchema.partial().extend({
  id: z.string().min(1, "Plan id is required"),
})

export const planItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  description: z.string().optional(),
  type: z.enum(["INCOME", "EXPENSE"]),
  excludeType: z.enum(["FIXED", "FLEXIBLE"]),
  categoryId: z.string().min(1, "Category is required"),
  minimumPercentage: z.number().min(0).max(100).optional(),
}).refine((data) => {
  // minimumPercentage required when type=EXPENSE and excludeType=FLEXIBLE
  if (data.type === "EXPENSE" && data.excludeType === "FLEXIBLE") {
    return data.minimumPercentage !== undefined
  }
  return true
}, { 
  message: "Minimum percentage required for flexible expenses",
  path: ["minimumPercentage"]
})

export type PlanFormData = z.infer<typeof planSchema>
export type PlanUpdateFormData = z.infer<typeof planUpdateSchema>
export type PlanItemFormData = z.infer<typeof planItemSchema>

