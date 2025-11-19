import { Badge } from "@components/ui/badge"
import type { PlanStatus } from "../types"

interface PlanStatusBadgeProps {
  status: PlanStatus
}

const STATUS_CONFIG: Record<
  PlanStatus,
  { label: string; variant: "secondary" | "default" | "destructive" | "outline" }
> = {
  not_started: { label: "Not started", variant: "outline" },
  in_progress: { label: "In progress", variant: "default" },
  completed: { label: "Completed", variant: "secondary" },
  on_hold: { label: "On hold", variant: "destructive" },
}

export const PlanStatusBadge = ({ status }: PlanStatusBadgeProps) => {
  const config = STATUS_CONFIG[status]
  return <Badge variant={config.variant}>{config.label}</Badge>
}

