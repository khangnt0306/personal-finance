import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form"
import { Input } from "@components/ui/input"
import { Textarea } from "@components/ui/textarea"
import { Button } from "@components/ui/button"
import type { Control } from "react-hook-form"
import type { SavingGoalFormData } from "./saving-goal-form.schema"
import {
  useCreateMoneySourceMutation,
  useGetMoneySourcesQuery,
  type MoneySource,
} from "../api/money-source.api"

interface MoneySourceSelectFieldProps {
  control: Control<SavingGoalFormData>
}

export const MoneySourceSelectField = ({ control }: MoneySourceSelectFieldProps) => {
  const { data: moneySourcesData, refetch } = useGetMoneySourcesQuery({ limit: 100 })
  const moneySources = moneySourcesData?.moneySources ?? []

  const [isAdding, setIsAdding] = useState(false)
  const [newMoneySource, setNewMoneySource] = useState({ name: "", description: "" })
  const [createMoneySource, { isLoading: isCreating }] = useCreateMoneySourceMutation()

  return (
    <FormField<SavingGoalFormData>
      control={control}
      name="moneySourceId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nguồn tiền</FormLabel>
          <Select
            onValueChange={(value) => {
              if (value === "__create__") {
                setIsAdding(true)
                field.onChange("")
                return
              }
              setIsAdding(false)
              field.onChange(value)
            }}
            value={isAdding ? "" : field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Chọn nguồn tiền" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {moneySources.map((source: MoneySource) => (
                <SelectItem key={source.id} value={source.id}>
                  {source.name}
                </SelectItem>
              ))}
              <SelectItem value="__create__" className="text-primary">
                + Tạo nguồn tiền mới
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
          {isAdding ? (
            <div className="mt-3 space-y-3 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4">
              <p className="text-sm font-medium text-primary">Thêm nguồn tiền mới</p>
              <Input
                placeholder="Tên nguồn tiền"
                value={newMoneySource.name}
                onChange={(event) =>
                  setNewMoneySource((prev) => ({ ...prev, name: event.target.value }))
                }
              />
              <Textarea
                placeholder="Mô tả (tuỳ chọn)"
                value={newMoneySource.description}
                onChange={(event) =>
                  setNewMoneySource((prev) => ({
                    ...prev,
                    description: event.target.value,
                  }))
                }
              />
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false)
                    setNewMoneySource({ name: "", description: "" })
                  }}
                >
                  Hủy
                </Button>
                <Button
                  type="button"
                  size="sm"
                  disabled={!newMoneySource.name || isCreating}
                  onClick={async () => {
                    const created = await createMoneySource(newMoneySource).unwrap()
                    setIsAdding(false)
                    setNewMoneySource({ name: "", description: "" })
                    field.onChange(created.id)
                    await refetch()
                  }}
                >
                  {isCreating ? "Đang tạo..." : "Lưu nguồn tiền"}
                </Button>
              </div>
            </div>
          ) : null}
        </FormItem>
      )}
    />
  )
}


