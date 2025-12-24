import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog"
import { Button } from "@components/ui/button"
import { Form } from "@components/ui/form"
import type { SavingGoal } from "../types"
import { savingGoalSchema, type SavingGoalFormData } from "./saving-goal-form.schema"
import { SavingsGoalFields } from "./SavingsGoalFields"
import { MoneySourceSelectField } from "./MoneySourceSelectField"

interface SavingsGoalFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: SavingGoalFormData) => Promise<void> | void
  savingGoal?: SavingGoal | null
  isSubmitting?: boolean
}

export const SavingsGoalFormModal = ({
  open,
  onOpenChange,
  onSubmit,
  savingGoal,
  isSubmitting,
}: SavingsGoalFormModalProps) => {
  const form = useForm<SavingGoalFormData>({
    resolver: zodResolver(savingGoalSchema),
    defaultValues: {
      name: "",
      description: "",
      targetAmount: "",
      startDate: new Date().toISOString().split("T")[0],
      expectedFinishDate: new Date().toISOString().split("T")[0],
      status: "active",
      moneySourceId: "",
    },
  })

  useEffect(() => {
    if (savingGoal) {
      form.reset({
        name: savingGoal.name,
        description: savingGoal.description ?? "",
        targetAmount: savingGoal.targetAmount,
        startDate: savingGoal.startDate ?? new Date().toISOString().split("T")[0],
        expectedFinishDate: savingGoal.expectedFinishDate ?? new Date().toISOString().split("T")[0],
        status: savingGoal.status,
        moneySourceId: (savingGoal as unknown as { moneySourceId?: string }).moneySourceId ?? "",
      })
    } else {
      form.reset({
        name: "",
        description: "",
        targetAmount: "",
        startDate: new Date().toISOString().split("T")[0],
        expectedFinishDate: new Date().toISOString().split("T")[0],
        status: "active",
        moneySourceId: "",
      })
    }
  }, [savingGoal, form])

  const handleSubmit = async (data: SavingGoalFormData) => {
    await onSubmit(data)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{savingGoal ? "Cập nhật quỹ tiết kiệm" : "Tạo quỹ tiết kiệm mới"}</DialogTitle>
          <DialogDescription>
            Định nghĩa mục tiêu, thời gian và nguồn tiền cho quỹ tiết kiệm của bạn.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <SavingsGoalFields form={form} />
            <MoneySourceSelectField control={form.control} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Hủy
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Đang lưu..." : savingGoal ? "Cập nhật" : "Tạo mới"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


