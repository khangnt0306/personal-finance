import { Button } from "@components/ui/button"
import { List, TrendingUp, TrendingDown } from "lucide-react"

export type FilterType = "ALL" | "INCOME" | "EXPENSE"

interface PlanItemsFilterProps {
  filterType: FilterType
  onFilterChange: (filter: FilterType) => void
}

export const PlanItemsFilter = ({ filterType, onFilterChange }: PlanItemsFilterProps) => {
  const filterOptions = [
    { label: "Tất cả", value: "ALL" as const, icon: List },
    { label: "Thu nhập", value: "INCOME" as const, icon: TrendingUp },
    { label: "Chi tiêu", value: "EXPENSE" as const, icon: TrendingDown },
  ]

  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-muted/30 backdrop-blur-sm border border-border/40">
      {filterOptions.map((option) => {
        const Icon = option.icon
        const isActive = filterType === option.value

        return (
          <Button
            key={option.value}
            size="sm"
            variant="ghost"
            className={`
              relative px-4 py-2 rounded-md transition-all duration-200
              ${
                isActive
                  ? option.value === "INCOME"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm hover:bg-emerald-100"
                    : option.value === "EXPENSE"
                    ? "bg-rose-50 text-rose-700 border border-rose-200 shadow-sm hover:bg-rose-100"
                    : "bg-primary/10 text-primary border border-primary/20 shadow-sm hover:bg-primary/15"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/60"
              }
            `}
            onClick={() => onFilterChange(option.value)}
          >
            <Icon className="h-4 w-4 mr-1.5" />
            {option.label}
          </Button>
        )
      })}
    </div>
  )
}

