import { TrendingUp, TrendingDown, PiggyBank, Wallet } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { cn } from "@lib/utils"

const metricHighlight = {
  up: "bg-emerald-500/10 text-emerald-400",
  down: "bg-rose-500/10 text-rose-400",
}

const overviewCardsData = [
  {
    label: "Giá trị ròng",
    value: "$128,420",
    change: "+6.2%",
    icon: PiggyBank,
    trend: "up" as const,
    helper: "so với quý trước",
  },
  {
    label: "Thu nhập tháng",
    value: "$12,850",
    change: "+8.5%",
    icon: TrendingUp,
    trend: "up" as const,
    helper: "tăng trưởng ổn định",
  },
  {
    label: "Chi tiêu tháng",
    value: "$9,110",
    change: "-4.3%",
    icon: Wallet,
    trend: "down" as const,
    helper: "trong giới hạn thông minh",
  },
  {
    label: "Tỉ lệ tiết kiệm",
    value: "28%",
    change: "+2.1%",
    icon: TrendingUp,
    trend: "up" as const,
    helper: "mục tiêu: 30%",
  },
]

export const OverviewCards = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {overviewCardsData.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.label} className="from-slate-900 via-slate-900/60 to-slate-900/30 bg-gradient-to-br px-0 py-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                <span>{metric.label}</span>
                <Icon className="h-5 w-5 text-muted-foreground/80" />
              </div>
              <CardTitle className="text-3xl font-semibold text-white">{metric.value}</CardTitle>
              <CardDescription>{metric.helper}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between border-t border-border/40 pt-4 text-sm font-medium">
              <div className={cn("inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold", metricHighlight[metric.trend])}>
                {metric.trend === "up" ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                {metric.change}
              </div>
              <span className="text-muted-foreground">30 ngày gần đây</span>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
