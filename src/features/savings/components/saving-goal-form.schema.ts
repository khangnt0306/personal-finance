import { z } from "zod"

export const savingGoalSchema = z.object({
  name: z.string().min(1, "Tên quỹ là bắt buộc"),
  description: z.string().optional(),
  targetAmount: z.string().min(1, "Mục tiêu là bắt buộc"),
  startDate: z.string().min(1, "Ngày bắt đầu là bắt buộc"),
  expectedFinishDate: z.string().min(1, "Ngày kết thúc là bắt buộc"),
  status: z.enum(["active", "completed", "paused", "cancelled"]),
  moneySourceId: z.string().min(1, "Nguồn tiền là bắt buộc"),
})

export type SavingGoalFormData = z.infer<typeof savingGoalSchema>


