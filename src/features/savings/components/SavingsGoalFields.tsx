import { Input } from "@components/ui/input"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/form"
import { Textarea } from "@components/ui/textarea"
import type { SavingGoalFormData } from "./saving-goal-form.schema"
import type { UseFormReturn } from "react-hook-form"
import { formatNumber, parseFormattedNumber } from "@core/utils/format"

interface SavingsGoalFieldsProps {
    form: UseFormReturn<SavingGoalFormData>
}

export const SavingsGoalFields = ({ form }: SavingsGoalFieldsProps) => {
    return (
        <>
            <FormField<SavingGoalFormData>
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tên quỹ</FormLabel>
                        <FormControl>
                            <Input placeholder="Ví dụ: Mua laptop mới" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField<SavingGoalFormData>
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Mô tả</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Mô tả ngắn gọn mục tiêu tiết kiệm" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField<SavingGoalFormData>
                control={form.control}
                name="targetAmount"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Số tiền mục tiêu</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                placeholder="0"
                                value={field.value ? formatNumber(parseFloat(field.value)) : ""}
                                onChange={(e) => {
                                    const numericValue = parseFormattedNumber(e.target.value)
                                    field.onChange(numericValue.toString())
                                }}
                                onBlur={field.onBlur}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid gap-4 md:grid-cols-2">
                <FormField<SavingGoalFormData>
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ngày bắt đầu</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField<SavingGoalFormData>
                    control={form.control}
                    name="expectedFinishDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ngày kết thúc dự kiến</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </>
    )
}


