import type { ReactNode } from "react"

export interface StatTileProps {
  label: string
  value: string
  trend?: number
  trendLabel?: string
  icon?: ReactNode
  delay?: number
}


