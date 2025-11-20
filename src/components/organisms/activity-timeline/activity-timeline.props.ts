import type { ReactNode } from "react"

export interface TimelineItem {
  id: string
  title: string
  description: string
  timestamp: string
  status: "success" | "warning" | "info"
  icon?: ReactNode
}

export interface ActivityTimelineProps {
  items: TimelineItem[]
}


