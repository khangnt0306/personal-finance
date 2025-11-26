import { useMemo, useState } from "react"
import { startOfMonth, endOfMonth, isWithinInterval, parseISO, formatDistanceToNow } from "date-fns"
import { Wallet, TrendingUp, TrendingDown, Activity, ArrowRight, AlertCircle, ArrowUpRight, ArrowDownRight, Info } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useTransactions } from "@features/transactions"
import { useBudgets } from "@features/budgets"
import { formatCurrency } from "@core/utils/format"
import { EmptyState, PageHeader } from "@components/molecules"
import { ActivityTimeline, type TimelineItem } from "@components/organisms/activity-timeline/activity-timeline.view"
import { MotionCard } from "@components/ui/motion-card"
import { Button } from "@components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert"
import { DatePicker } from "@components/ui/date-picker"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion"
import { budgetService } from "@features/budgets/services/budget.service"
import { cn } from "@lib/utils"
import { fadeSlide } from "../styles/motion"

export const HomePage = () => {
  const { transactions } = useTransactions()
  const { budgets, loading: budgetsLoading } = useBudgets()
  const navigate = useNavigate()
  const [dateFilter, setDateFilter] = useState<Date | undefined>(new Date())

  const summary = useMemo(() => {
    const now = dateFilter || new Date()
    const monthStart = startOfMonth(now)
    const monthEnd = endOfMonth(now)

    const monthTransactions = transactions.filter((t) => {
      const transactionDate = parseISO(t.date)
      return isWithinInterval(transactionDate, {
        start: monthStart,
        end: monthEnd,
      })
    })

    const totalIncome = monthTransactions
      .filter((t) => t.type === "INCOME")
      .reduce((sum, t) => sum + t.amount, 0)

    const totalExpense = monthTransactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((sum, t) => sum + t.amount, 0)

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      transactionCount: monthTransactions.length,
    }
  }, [transactions, dateFilter])

  const budgetWarnings = useMemo(() => {
    if (budgetsLoading || !budgets.length) return []
    const warnings: Array<{ budgetId: string; categoryId: string; message: string; severity: "warning" | "destructive" }> = []
    
    budgets.forEach((budget) => {
      const spent = budgetService.getSpentAmount(budget.id)
      const remaining = budgetService.getRemainingAmount(budget.id)
      const percentage = (spent / budget.amount) * 100
      
      if (spent > budget.amount) {
        warnings.push({
          budgetId: budget.id,
          categoryId: budget.categoryId,
          message: `Budget exceeded by ${formatCurrency(Math.abs(remaining))}`,
          severity: "destructive",
        })
      } else if (percentage >= 90) {
        warnings.push({
          budgetId: budget.id,
          categoryId: budget.categoryId,
          message: `Budget at ${percentage.toFixed(0)}% - only ${formatCurrency(remaining)} remaining`,
          severity: "warning",
        })
      }
    })
    
    return warnings
  }, [budgets, budgetsLoading])

  const recentActivity = useMemo(() => {
    return [...transactions]
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .slice(0, 4)
      .map<TimelineItem>((transaction) => ({
        id: transaction.id,
        title: transaction.description,
        description: `${transaction.type === "INCOME" ? "+" : "-"}${formatCurrency(transaction.amount)} • ${
          transaction.categoryId
        }`,
        timestamp: formatDistanceToNow(parseISO(transaction.date), { addSuffix: true }),
        status: transaction.type === "INCOME" ? "success" : "warning",
        icon: transaction.type === "INCOME" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />,
      }))
  }, [transactions])

  const stats = [
    {
      id: "income",
      label: "Thu nhập tháng",
      value: formatCurrency(summary.totalIncome),
      helper: "so với số dư trước",
      delta: summary.totalIncome ? (summary.balance / (summary.totalIncome || 1)) * 100 : 0,
      icon: <TrendingUp className="h-5 w-5" />,
      tooltip: "Tổng thu nhập tháng này từ mọi nguồn",
    },
    {
      id: "expense",
      label: "Chi tiêu tháng",
      value: formatCurrency(summary.totalExpense),
      helper: "dấu chi tiêu",
      delta: summary.totalExpense
        ? (-summary.balance / (summary.totalExpense || 1)) * 100
        : undefined,
      icon: <TrendingDown className="h-5 w-5" />,
      tooltip: "Tổng chi phí tháng này trên mọi danh mục",
    },
    {
      id: "balance",
      label: "Số dư hiện tại",
      value: formatCurrency(summary.balance),
      helper: "có thể phân bổ",
      delta: summary.balance ? (summary.balance / (summary.totalIncome || 1)) * 100 : undefined,
      icon: <Wallet className="h-5 w-5" />,
      tooltip: "Số dư ròng sau khi trừ chi phí khỏi thu nhập",
    },
    {
      id: "transactions",
      label: "Giao dịch",
      value: summary.transactionCount.toString(),
      helper: "trong tháng",
      delta: summary.transactionCount,
      icon: <Activity className="h-5 w-5" />,
      tooltip: "Tổng số giao dịch ghi nhận trong tháng",
    },
  ]

  return (
    <TooltipProvider>
      <div className="space-y-10">
        <PageHeader
          title="Tổng quan tài chính"
          description="Theo dõi thu nhập, chi tiêu và hoạt động theo thời gian thực trong không gian quản lý tài chính của bạn."
          breadcrumbs={[{ label: "Bảng điều khiển" }, { label: "Tổng quan" }]}
          actions={
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <DatePicker
                date={dateFilter}
                onDateChange={setDateFilter}
                placeholder="Chọn tháng"
                className="w-full"
              />
              <Button size="lg" onClick={() => navigate("/transactions")} className="w-full sm:w-auto">
                Xem giao dịch <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          }
          highlights={[
            { label: "Thu nhập tháng", value: formatCurrency(summary.totalIncome) },
            { label: "Chi tiêu tháng", value: formatCurrency(summary.totalExpense) },
            { label: "Số dư", value: formatCurrency(summary.balance) },
          ]}
        />

        {budgetWarnings.length > 0 && (
          <Alert variant={budgetWarnings.some((w) => w.severity === "destructive") ? "destructive" : "warning"}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Cảnh báo ngân sách</AlertTitle>
            <AlertDescription>
              {budgetWarnings.length === 1 ? (
                budgetWarnings[0].message
              ) : (
                <ul className="list-disc list-inside space-y-1">
                  {budgetWarnings.map((warning) => (
                    <li key={warning.budgetId}>{warning.message}</li>
                  ))}
                </ul>
              )}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Tooltip key={stat.id}>
              <TooltipTrigger asChild>
                <motion.article
                  variants={fadeSlide}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-soft backdrop-blur cursor-help hover:shadow-soft-lg transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground truncate">
                        {stat.label}
                      </p>
                      <p className="mt-3 text-3xl font-semibold text-foreground truncate">{stat.value}</p>
                    </div>
                    {stat.icon ? (
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary flex-shrink-0 ml-2">
                        {stat.icon}
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                    {stat.helper ? <span className="truncate">{stat.helper}</span> : <span />}
                    {stat.delta !== undefined ? (
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold flex-shrink-0 ml-2",
                          stat.delta >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                        )}
                      >
                        {stat.delta >= 0 ? (
                          <ArrowUpRight className="mr-1 h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="mr-1 h-4 w-4" />
                        )}
                        {Math.abs(stat.delta).toFixed(1)}%
                      </span>
                    ) : null}
                  </div>
                </motion.article>
              </TooltipTrigger>
              <TooltipContent>
                <p>{stat.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <MotionCard className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Số dư ròng</p>
                <p className="mt-1 text-4xl font-semibold">{formatCurrency(summary.balance)}</p>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <p>Thu: {formatCurrency(summary.totalIncome)}</p>
                <p>Chi: {formatCurrency(summary.totalExpense)}</p>
              </div>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Góc nhìn theo thời gian thực về việc thu nhập của bạn so với chi tiêu để kịp thời điều chỉnh ngân sách.
            </p>
          </MotionCard>

          <MotionCard className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Hoạt động gần đây</p>
                <p className="mt-1 text-2xl font-semibold">Giao dịch mới nhất</p>
              </div>
            </div>
            <div className="mt-6">
              {recentActivity.length ? (
                <ActivityTimeline items={recentActivity} />
              ) : (
                <EmptyState
                  title="Chưa có hoạt động"
                  description="Tạo giao dịch đầu tiên để bắt đầu lấp đầy dòng hoạt động."
                  action={{
                    label: "Thêm giao dịch",
                    onClick: () => navigate("/transactions"),
                    variant: "secondary",
                  }}
                />
              )}
            </div>
          </MotionCard>
        </div>

        <MotionCard className="p-8">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="tips">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" />
                    <span>Mẹo tài chính & thực hành tốt</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div>
                      <p className="font-semibold text-foreground mb-1">Theo dõi thường xuyên</p>
                      <p>Kiểm tra giao dịch mỗi tuần để phát hiện sai lệch sớm và giữ dữ liệu chính xác.</p>
                  </div>
                  <div>
                      <p className="font-semibold text-foreground mb-1">Đặt ngân sách thực tế</p>
                      <p>Lập ngân sách dựa trên thói quen chi tiêu thực tế, không phải kỳ vọng. Điều chỉnh khi cần.</p>
                  </div>
                  <div>
                      <p className="font-semibold text-foreground mb-1">Quỹ khẩn cấp</p>
                      <p>Duy trì quỹ khẩn cấp tương đương 3-6 tháng chi phí để phòng tình huống bất ngờ.</p>
                  </div>
                  <div>
                      <p className="font-semibold text-foreground mb-1">Đánh giá mỗi tháng</p>
                      <p>Cuối tháng, rà soát thói quen chi tiêu và điều chỉnh ngân sách cho tháng kế tiếp.</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </MotionCard>
      </div>
    </TooltipProvider>
  )
}
