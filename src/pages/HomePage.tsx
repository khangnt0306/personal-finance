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
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0)

    const totalExpense = monthTransactions
      .filter((t) => t.type === "expense")
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
        description: `${transaction.type === "income" ? "+" : "-"}${formatCurrency(transaction.amount)} • ${
          transaction.categoryId
        }`,
        timestamp: formatDistanceToNow(parseISO(transaction.date), { addSuffix: true }),
        status: transaction.type === "income" ? "success" : "warning",
        icon: transaction.type === "income" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />,
      }))
  }, [transactions])

  const stats = [
    {
      id: "income",
      label: "Monthly income",
      value: formatCurrency(summary.totalIncome),
      helper: "vs previous balance",
      delta: summary.totalIncome ? (summary.balance / (summary.totalIncome || 1)) * 100 : 0,
      icon: <TrendingUp className="h-5 w-5" />,
      tooltip: "Total income received this month from all sources",
    },
    {
      id: "expense",
      label: "Monthly expense",
      value: formatCurrency(summary.totalExpense),
      helper: "spend footprint",
      delta: summary.totalExpense
        ? (-summary.balance / (summary.totalExpense || 1)) * 100
        : undefined,
      icon: <TrendingDown className="h-5 w-5" />,
      tooltip: "Total expenses incurred this month across all categories",
    },
    {
      id: "balance",
      label: "Current balance",
      value: formatCurrency(summary.balance),
      helper: "available to allocate",
      delta: summary.balance ? (summary.balance / (summary.totalIncome || 1)) * 100 : undefined,
      icon: <Wallet className="h-5 w-5" />,
      tooltip: "Net balance after subtracting expenses from income",
    },
    {
      id: "transactions",
      label: "Transactions",
      value: summary.transactionCount.toString(),
      helper: "this month",
      delta: summary.transactionCount,
      icon: <Activity className="h-5 w-5" />,
      tooltip: "Total number of transactions recorded this month",
    },
  ]

  return (
    <TooltipProvider>
      <div className="space-y-10">
        <PageHeader
          title="Financial overview"
          description="Track income, expenses, and real-time activity across your personal finance workspace."
          breadcrumbs={[{ label: "Dashboard" }, { label: "Overview" }]}
          actions={
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <DatePicker
                date={dateFilter}
                onDateChange={setDateFilter}
                placeholder="Select month"
                className="w-full"
              />
              <Button size="lg" onClick={() => navigate("/transactions")} className="w-full sm:w-auto">
                Review transactions <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          }
          highlights={[
            { label: "Monthly income", value: formatCurrency(summary.totalIncome) },
            { label: "Monthly expense", value: formatCurrency(summary.totalExpense) },
            { label: "Balance", value: formatCurrency(summary.balance) },
          ]}
        />

        {budgetWarnings.length > 0 && (
          <Alert variant={budgetWarnings.some((w) => w.severity === "destructive") ? "destructive" : "warning"}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Budget Alerts</AlertTitle>
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
                <p className="text-sm text-muted-foreground">Net balance</p>
                <p className="mt-1 text-4xl font-semibold">{formatCurrency(summary.balance)}</p>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <p>Income: {formatCurrency(summary.totalIncome)}</p>
                <p>Expense: {formatCurrency(summary.totalExpense)}</p>
              </div>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Real-time view of how your earnings stack against spending so you can adjust budgets
              early.
            </p>
          </MotionCard>

          <MotionCard className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Recent activity</p>
                <p className="mt-1 text-2xl font-semibold">Latest transactions</p>
              </div>
            </div>
            <div className="mt-6">
              {recentActivity.length ? (
                <ActivityTimeline items={recentActivity} />
              ) : (
                <EmptyState
                  title="No activity yet"
                  description="Create your first transaction to populate the activity feed."
                  action={{
                    label: "Add transaction",
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
                  <span>Financial Tips & Best Practices</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div>
                    <p className="font-semibold text-foreground mb-1">Track Regularly</p>
                    <p>Review your transactions weekly to catch any discrepancies early and maintain accurate records.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Set Realistic Budgets</p>
                    <p>Create budgets based on your actual spending patterns, not ideal scenarios. Adjust as needed.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Emergency Fund</p>
                    <p>Maintain at least 3-6 months of expenses in an emergency fund for unexpected situations.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Review Monthly</p>
                    <p>At the end of each month, review your spending patterns and adjust budgets for the next month.</p>
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
