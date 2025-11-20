import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { MotionCard } from "@components/ui/motion-card"
import { cn } from "@lib/utils"
import type { StatTileProps } from "./stat-tile.props"

export const StatTile = ({ label, value, trend, trendLabel, icon, delay = 0 }: StatTileProps) => {
  const trendPositive = (trend ?? 0) >= 0

  return (
    <MotionCard
      className="p-6"
      transition={{ duration: 0.4, delay, type: "spring", bounce: 0.25 }}
      whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold">{value}</p>
        </div>
        {icon ? <div className="text-primary">{icon}</div> : null}
      </div>
      {trend !== undefined ? (
        <p className={cn("mt-4 flex items-center text-sm font-medium", trendPositive ? "text-emerald-600" : "text-rose-600")}>
          {trendPositive ? <ArrowUpRight className="mr-1 h-4 w-4" /> : <ArrowDownRight className="mr-1 h-4 w-4" />}
          {Math.abs(trend).toFixed(1)}%
          {trendLabel ? <span className="ml-1 text-muted-foreground">{trendLabel}</span> : null}
        </p>
      ) : null}
    </MotionCard>
  )
}


