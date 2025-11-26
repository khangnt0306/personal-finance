import { Badge } from "@components/ui/badge"
import type { PlanType } from "../types"

interface PlanTypeBadgeProps {
  planType: PlanType
}

const PLAN_TYPE_CONFIG: Record<
  PlanType,
  { label: string; variant: "secondary" | "default" | "destructive" | "outline" }
> = {
  DAILY: { label: "Daily", variant: "default" },
  WEEKLY: { label: "Weekly", variant: "default" },
  MONTHLY: { label: "Monthly", variant: "secondary" },
  YEARLY: { label: "Yearly", variant: "secondary" },
}

export const PlanTypeBadge = ({ planType }: PlanTypeBadgeProps) => {
  const config = PLAN_TYPE_CONFIG[planType]
  return <Badge variant={config.variant}>{config.label}</Badge>
}

