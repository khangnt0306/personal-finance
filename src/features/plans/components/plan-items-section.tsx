import { useMemo, useState } from "react"
import { AnimatedPlusButton } from "@components/common/AnimatedPlusButton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Skeleton } from "@components/ui/skeleton"
import type { Plan, PlanItem } from "@features/plans/types"
import type { Category } from "@core/types"
import { PlanItemsFilter, type FilterType } from "./plan-items-filter"
import { IncomePlanItemCard } from "./income-plan-item-card"
import { ExpensePlanItemCard } from "./expense-plan-item-card"

interface PlanItemsSectionProps {
  plan: Plan
  planItems: PlanItem[]
  categories: Category[]
  isLoading: boolean
  onCreateItem: () => void
  onEditItem: (item: PlanItem) => void
  onDeleteItem: (item: PlanItem) => void
  onViewTransactions: (item: PlanItem) => void
}

export const PlanItemsSection = ({
  plan,
  planItems,
  categories,
  isLoading,
  onCreateItem,
  onEditItem,
  onDeleteItem,
  onViewTransactions,
}: PlanItemsSectionProps) => {
  const [filterType, setFilterType] = useState<FilterType>("ALL")

  const filteredItems = useMemo(() => {
    if (filterType === "ALL") return planItems
    return planItems.filter((item) => item.type === filterType)
  }, [filterType, planItems])

  return (
    <>
      {/* Create Plan Item Button - Circular Expandable */}
      <div className="flex justify-center mb-4 sm:mb-0">
        <AnimatedPlusButton label="Tạo hạng mục mới" onClick={onCreateItem} />
      </div>

      {/* Plan Items Section */}
      <Card className="relative overflow-hidden border border-white/40 bg-white/70 shadow-soft-xl backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <CardTitle className="text-base sm:text-lg">Hạng mục kế hoạch</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {isLoading ? "Đang tải hạng mục..." : `${filteredItems.length}/${planItems.length} hạng mục trong kế hoạch này`}
              </CardDescription>
            </div>

            <PlanItemsFilter filterType={filterType} onFilterChange={setFilterType} />
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {isLoading ? (
            <div className="space-y-2 sm:space-y-2">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : (
            <div className="space-y-2.5 sm:space-y-3">
              {filteredItems.map((item) => {
                const category = categories.find((c) => c.id === item.categoryId)

                return item.type === "INCOME" ? (
                  <IncomePlanItemCard
                    key={item.id}
                    item={item}
                    plan={plan}
                    category={category}
                    onEdit={onEditItem}
                    onDelete={onDeleteItem}
                    onViewTransactions={onViewTransactions}
                  />
                ) : (
                  <ExpensePlanItemCard
                    key={item.id}
                    item={item}
                    plan={plan}
                    category={category}
                    onEdit={onEditItem}
                    onDelete={onDeleteItem}
                    onViewTransactions={onViewTransactions}
                  />
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}

