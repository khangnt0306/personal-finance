import type { ReactNode } from "react"

export interface StatItem {
  id: string
  label: string
  value: string
  helper?: string
  delta?: number
  icon?: ReactNode
}

export interface StatGroupProps {
  items: StatItem[]
  columns?: 2 | 3 | 4
  className?: string
}


