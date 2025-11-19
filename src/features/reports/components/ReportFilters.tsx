import { useState } from "react"
import { Button } from "@components/ui/button"
import { Badge } from "@components/ui/badge"

const reportViews = ["Cashflow", "Spending", "Income", "Net worth"]
const frequencies = ["Monthly", "Quarterly", "Year-to-date"]

export const ReportFilters = () => {
  const [view, setView] = useState("Cashflow")
  const [frequency, setFrequency] = useState("Monthly")

  return (
    <div className="rounded-3xl border border-border/60 bg-card/80 p-6">
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">View</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {reportViews.map((item) => (
              <Badge
                key={item}
                variant={view === item ? "default" : "outline"}
                className="cursor-pointer rounded-2xl px-4 py-2 text-sm"
                onClick={() => setView(item)}
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Frequency</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {frequencies.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFrequency(item)}
                className={`rounded-2xl border px-4 py-2 text-sm font-medium ${
                  frequency === item
                    ? "border-primary/60 bg-primary/10 text-primary"
                    : "border-border/60 text-muted-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-3 border-t border-border/50 pt-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>
          {view} · {frequency}
        </span>
        <Button className="w-full sm:w-auto">Run report</Button>
      </div>
    </div>
  )
}
