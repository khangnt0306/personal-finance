import { Badge } from "@components/ui/badge"
import type { PlanType } from "../types"

interface PlanTypeBadgeProps {
  planType: PlanType
}

const PLAN_TYPE_CONFIG: Record<
  PlanType,
  { label: string; variant: "secondary" | "default" | "destructive" | "outline" }
> = {
  DAILY: { label: "Kế hoạch ngày", variant: "default" },
  WEEKLY: { label: "Kế hoạch tuần", variant: "default" },
  MONTHLY: { label: "Kế hoạch tháng", variant: "secondary" },
  YEARLY: { label: "Kế hoạch năm", variant: "secondary" },
}

export const PlanTypeBadge = ({ planType }: PlanTypeBadgeProps) => {
  const config = PLAN_TYPE_CONFIG[planType]
  return <Badge variant={config.variant} className="rounded-md">{config.label}</Badge>
}

