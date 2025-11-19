import { useMemo } from "react"
import { startOfMonth, endOfMonth, isWithinInterval, parseISO, formatDistanceToNow } from "date-fns"
import { Wallet, TrendingUp, TrendingDown, Activity, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useTransactions } from "@features/transactions"
import { formatCurrency } from "@core/utils/format"
import { EmptyState, PageHeader, StatGroup } from "@components/molecules"
import { ActivityTimeline, type TimelineItem } from "@components/organisms/activity-timeline"
import { MotionCard } from "@components/ui/motion-card"
import { Button } from "@components/ui/button"

export const HomePage = () => {
  const { transactions } = useTransactions()
  const navigate = useNavigate()

  const summary = useMemo(() => {
    const now = new Date()
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
  }, [transactions])

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
    },
    {
      id: "balance",
      label: "Current balance",
      value: formatCurrency(summary.balance),
      helper: "available to allocate",
      delta: summary.balance ? (summary.balance / (summary.totalIncome || 1)) * 100 : undefined,
      icon: <Wallet className="h-5 w-5" />,
    },
    {
      id: "transactions",
      label: "Transactions",
      value: summary.transactionCount.toString(),
      helper: "this month",
      delta: summary.transactionCount,
      icon: <Activity className="h-5 w-5" />,
    },
  ]

  return (
    <div className="space-y-10">
      <PageHeader
        title="Financial overview"
        description="Track income, expenses, and real-time activity across your personal finance workspace."
        breadcrumbs={[{ label: "Dashboard" }, { label: "Overview" }]}
        actions={
          <Button size="lg" onClick={() => navigate("/transactions")}>
            Review transactions <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        }
        highlights={[
          { label: "Monthly income", value: formatCurrency(summary.totalIncome) },
          { label: "Monthly expense", value: formatCurrency(summary.totalExpense) },
          { label: "Balance", value: formatCurrency(summary.balance) },
        ]}
      />

      <StatGroup items={stats} columns={4} />

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
    </div>
  )
}
