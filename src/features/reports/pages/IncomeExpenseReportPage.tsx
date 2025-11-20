import { useState } from "react"
import { ReportFilters } from "../components/ReportFilters"
import { PeriodComparisonChart } from "../components/PeriodComparisonChart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { DatePicker } from "@components/ui/date-picker"
import { Skeleton } from "@components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion"
import { Info, TrendingUp } from "lucide-react"

const highlights = [
  { label: "Income", value: "$40,200", helper: "+12% vs last quarter", tooltip: "Total income for the selected period" },
  { label: "Expenses", value: "$31,840", helper: "-6% vs last quarter", tooltip: "Total expenses for the selected period" },
  { label: "Operating margin", value: "27%", helper: "+3 pts", tooltip: "Net income as percentage of total income" },
]

export const IncomeExpenseReportPage = () => {
  const [loading] = useState(false)
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Reports</p>
          <h1 className="text-3xl font-semibold text-white">Income vs expense</h1>
          <p className="text-muted-foreground">Build instant slides from tailor-made insights.</p>
        </header>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm text-muted-foreground mb-2 block">Start Date</label>
            <DatePicker
              date={startDate}
              onDateChange={setStartDate}
              placeholder="Select start date"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm text-muted-foreground mb-2 block">End Date</label>
            <DatePicker
              date={endDate}
              onDateChange={setEndDate}
              placeholder="Select end date"
            />
          </div>
        </div>

        <Alert variant="info">
          <TrendingUp className="h-4 w-4" />
          <AlertTitle>Report Insights</AlertTitle>
          <AlertDescription>
            Your financial trends show positive growth. Consider reviewing detailed breakdowns below.
          </AlertDescription>
        </Alert>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            {highlights.map((highlight) => (
              <Tooltip key={highlight.label}>
                <TooltipTrigger asChild>
                  <Card className="cursor-help">
                    <CardHeader className="pb-2">
                      <CardDescription>{highlight.label}</CardDescription>
                      <CardTitle className="text-3xl text-white">{highlight.value}</CardTitle>
                      <p className="text-sm text-primary">{highlight.helper}</p>
                    </CardHeader>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{highlight.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        )}

        {loading ? (
          <div className="grid gap-6 lg:grid-cols-2">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            <ReportFilters />
            <PeriodComparisonChart />
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Insights</CardTitle>
            <CardDescription>Auto-generated from your ledger</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="insights">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    <span>View detailed insights</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>• Dining spend tapered 11% after introducing the smart allowance workflow.</p>
                    <p>• Income volatility index remains low thanks to payroll predictability.</p>
                    <p>• Your surplus can fund remaining savings targets in 8 weeks.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
