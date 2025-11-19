import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"

const periods = [
  { label: "Jan", income: 12500, expense: 9800 },
  { label: "Feb", income: 13120, expense: 10100 },
  { label: "Mar", income: 14580, expense: 10940 },
]

export const PeriodComparisonChart = () => {
  const max = Math.max(...periods.map((p) => Math.max(p.income, p.expense)))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Period comparison</CardTitle>
        <CardDescription>Income vs expense</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {periods.map((period) => (
          <div key={period.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{period.label}</span>
              <span>
                ${period.expense.toLocaleString()} vs ${period.income.toLocaleString()}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex gap-2">
                <div className="h-3 flex-1 rounded-full bg-rose-500/20">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-400 via-rose-300 to-pink-200"
                    style={{ width: `${(period.expense / max) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-rose-200">Expense</span>
              </div>
              <div className="flex gap-2">
                <div className="h-3 flex-1 rounded-full bg-emerald-500/20">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-lime-200"
                    style={{ width: `${(period.income / max) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-emerald-200">Income</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
