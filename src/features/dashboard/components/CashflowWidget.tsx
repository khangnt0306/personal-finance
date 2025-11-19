import { ArrowDownRight, ArrowUpRight, CalendarRange } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"

const cashflowPoints = [
  { label: "Week 1", value: 4200 },
  { label: "Week 2", value: 3800 },
  { label: "Week 3", value: 5100 },
  { label: "Week 4", value: 4680 },
]

export const CashflowWidget = () => {
  const inflow = 18750
  const outflow = 14230
  const net = inflow - outflow

  return (
    <Card className="space-y-6">
      <CardHeader>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="inline-flex items-center gap-2">
            <CalendarRange className="h-4 w-4" />
            Rolling 30 days
          </div>
          <span className="rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-wide">Cashflow</span>
        </div>
        <CardTitle className="text-3xl tracking-tight text-white">${net.toLocaleString()}</CardTitle>
        <CardDescription>net difference</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 rounded-2xl border border-border/40 bg-muted/10 p-4 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Inflow</p>
            <p className="text-2xl font-semibold text-emerald-400">${inflow.toLocaleString()}</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300/80">
              <ArrowUpRight className="h-3.5 w-3.5" /> 12% vs last month
            </span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Outflow</p>
            <p className="text-2xl font-semibold text-rose-400">${outflow.toLocaleString()}</p>
            <span className="inline-flex items-center gap-1 text-xs text-rose-300/80">
              <ArrowDownRight className="h-3.5 w-3.5" /> -3% vs last month
            </span>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-primary/15 via-primary/10 to-transparent p-3 text-sm text-muted-foreground">
            You are protecting ${(net * 0.45).toFixed(0)} for savings targets. Keep this cadence for 6 more weeks to fully fund your emergency reserve.
          </div>
        </div>

        <div className="flex items-end gap-3">
          {cashflowPoints.map((point) => (
            <div key={point.label} className="flex flex-1 flex-col gap-2">
              <div
                className="relative h-32 overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent"
                style={{ height: `${Math.max(40, (point.value / 5200) * 128)}px` }}
              >
                <div className="absolute inset-x-2 bottom-2 rounded-full bg-white/90 px-2 py-1 text-center text-xs font-semibold text-slate-900">
                  ${point.value.toLocaleString()}
                </div>
              </div>
              <span className="text-center text-xs text-muted-foreground">{point.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
