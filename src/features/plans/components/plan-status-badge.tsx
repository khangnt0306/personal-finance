import { Badge } from "@components/ui/badge"
import type { PlanType } from "../types"

interface PlanTypeBadgeProps {
  planType: PlanType
}

const PLAN_TYPE_CONFIG: Record<
  PlanType,
  { label: string; variant: "secondary" | "default" | "destructive" | "outline" }
> = {
  DAILY: { label: "Hàng ngày", variant: "default" },
  WEEKLY: { label: "Hàng tuần", variant: "default" },
  MONTHLY: { label: "Hàng tháng", variant: "secondary" },
  YEARLY: { label: "Hàng năm", variant: "secondary" },
}

export const PlanTypeBadge = ({ planType }: PlanTypeBadgeProps) => {
  const config = PLAN_TYPE_CONFIG[planType]
  return <Badge variant={config.variant}>{config.label}</Badge>
}

