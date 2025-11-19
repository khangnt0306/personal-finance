import { useState } from "react"
import { CalendarIcon, Filter, RefreshCw } from "lucide-react"
import { Button } from "@components/ui/button"
import { Badge } from "@components/ui/badge"

const categories = ["All", "Subscriptions", "Lifestyle", "Income", "Investments"]
const timeframes = ["7d", "30d", "90d"]

export const TransactionFilters = () => {
  const [category, setCategory] = useState("All")
  const [timeframe, setTimeframe] = useState("30d")

  return (
    <div className="rounded-3xl border border-border/60 bg-card/70 p-5">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <Filter className="h-4 w-4" />
        Refine ledger
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Categories</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  category === item
                    ? "bg-primary/15 text-primary"
                    : "bg-muted/20 text-muted-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Timeframe</p>
          <div className="flex items-center gap-2">
            {timeframes.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTimeframe(item)}
                className={`rounded-2xl border px-3 py-2 text-sm font-medium ${
                  timeframe === item
                    ? "border-primary/60 bg-primary/10 text-primary"
                    : "border-border/60 text-muted-foreground"
                }`}
              >
                {item}
              </button>
            ))}
            <Badge variant="outline" className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarIcon className="h-3.5 w-3.5" /> Custom
            </Badge>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3 border-t border-border/50 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {category} · {timeframe} window
        </p>
        <div className="flex gap-2">
          <Button variant="secondary" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Reset
          </Button>
          <Button className="gap-2">
            Apply filters
          </Button>
        </div>
      </div>
    </div>
  )
}
