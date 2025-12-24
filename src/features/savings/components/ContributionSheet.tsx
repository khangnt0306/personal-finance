import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@components/ui/sheet"
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
import { useForm, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { DatePicker } from "@components/ui/date-picker"
import { formatCurrency } from "@core/utils/format"
import { formatNumber, parseFormattedNumber } from "@core/utils/format"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import {
  useGetContributionsQuery,
  useCreateContributionMutation,
  type Contribution,
} from "../api/contribution.api"
import { Skeleton } from "@components/ui/skeleton"
import { Separator } from "@components/ui/separator"
import { Calendar, DollarSign, FileText } from "lucide-react"
import { showSuccess, showError } from "@lib/toast"
import type { SavingsFund } from "../types"

const contributionSchema = z.object({
  amount: z.string().min(1, "Số tiền là bắt buộc"),
  note: z.string().optional(),
  transactionDate: z.date({
    error: "Ngày giao dịch là bắt buộc",
  }),
})

type ContributionFormData = z.infer<typeof contributionSchema>

interface ContributionSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  fund: SavingsFund | null
}

export const ContributionSheet = ({ open, onOpenChange, fund }: ContributionSheetProps) => {
  const [createContribution, { isLoading: isCreating }] = useCreateContributionMutation()

  const { data: contributionsData, isLoading: isLoadingContributions } =
    useGetContributionsQuery(
      {
        savingGoalId: fund?.id || "",
        limit: 100,
      },
      { skip: !open || !fund }
    )

  const form = useForm<ContributionFormData>({
    resolver: zodResolver(contributionSchema) as Resolver<ContributionFormData>,
    defaultValues: {
      amount: "",
      note: "",
      transactionDate: new Date(),
    },
  })

  const handleSubmit = async (data: ContributionFormData) => {
    if (!fund) return

    try {
      const payload = {
        amount: parseFormattedNumber(data.amount).toString(),
        type: "deposit" as const,
        note: data.note || undefined,
        transactionDate: data.transactionDate.toISOString(),
      }

      await createContribution({ savingGoalId: fund.id, data: payload }).unwrap()
      showSuccess("Tạo khoản đóng góp thành công")
      form.reset({
        amount: "",
        note: "",
        transactionDate: new Date(),
      })
    } catch (error) {
      showError("Không thể tạo khoản đóng góp")
      console.error("Error creating contribution:", error)
    }
  }

  const contributions = contributionsData?.transactions || []

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Thêm khoản đóng góp</SheetTitle>
          <SheetDescription>
            {fund ? `Thêm khoản đóng góp cho quỹ "${fund.name}"` : "Chọn quỹ để thêm đóng góp"}
          </SheetDescription>
        </SheetHeader>

        {fund && (
          <div className="mt-6 space-y-6">
            {/* Form Section */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số tiền</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            placeholder="Nhập số tiền"
                            className="pl-9"
                            onChange={(e) => {
                              const formatted = formatNumber(parseFormattedNumber(e.target.value))
                              field.onChange(formatted)
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="transactionDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ngày giao dịch</FormLabel>
                      <FormControl>
                        <DatePicker
                          date={field.value}
                          onDateChange={field.onChange}
                          placeholder="Chọn ngày giao dịch"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ghi chú (tùy chọn)</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Nhập ghi chú"
                          rows={3}
                          className="resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      form.reset()
                      onOpenChange(false)
                    }}
                    className="flex-1"
                  >
                    Hủy
                  </Button>
                  <Button type="submit" disabled={isCreating} className="flex-1">
                    {isCreating ? "Đang tạo..." : "Tạo đóng góp"}
                  </Button>
                </div>
              </form>
            </Form>

            <Separator />

            {/* History Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Lịch sử đóng góp</h3>
                <span className="text-sm text-muted-foreground">
                  {contributions.length} khoản
                </span>
              </div>

              {isLoadingContributions ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-20 w-full rounded-xl" />
                  ))}
                </div>
              ) : contributions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Chưa có khoản đóng góp nào</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {contributions.map((contribution: Contribution) => (
                    <div
                      key={contribution.id}
                      className="rounded-xl border border-border/60 bg-card/50 p-4 space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-primary" />
                            <span className="font-semibold text-lg">
                              {formatCurrency(parseFloat(contribution.amount), fund.currency)}
                            </span>
                          </div>
                          {contribution.note && (
                            <p className="text-sm text-muted-foreground">{contribution.note}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {format(new Date(contribution.transactionDate), "dd/MM/yyyy HH:mm", {
                              locale: vi,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

