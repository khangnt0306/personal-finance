import { ReportFilters } from "../components/ReportFilters"
import { PeriodComparisonChart } from "../components/PeriodComparisonChart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"

const highlights = [
  { label: "Income", value: "$40,200", helper: "+12% vs last quarter" },
  { label: "Expenses", value: "$31,840", helper: "-6% vs last quarter" },
  { label: "Operating margin", value: "27%", helper: "+3 pts" },
]

export const IncomeExpenseReportPage = () => {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Reports</p>
        <h1 className="text-3xl font-semibold text-white">Income vs expense</h1>
        <p className="text-muted-foreground">Build instant slides from tailor-made insights.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {highlights.map((highlight) => (
          <Card key={highlight.label}>
            <CardHeader className="pb-2">
              <CardDescription>{highlight.label}</CardDescription>
              <CardTitle className="text-3xl text-white">{highlight.value}</CardTitle>
              <p className="text-sm text-primary">{highlight.helper}</p>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ReportFilters />
        <PeriodComparisonChart />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Insights</CardTitle>
          <CardDescription>Auto-generated from your ledger</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>• Dining spend tapered 11% after introducing the smart allowance workflow.</p>
          <p>• Income volatility index remains low thanks to payroll predictability.</p>
          <p>• Your surplus can fund remaining savings targets in 8 weeks.</p>
        </CardContent>
      </Card>
    </div>
  )
}
