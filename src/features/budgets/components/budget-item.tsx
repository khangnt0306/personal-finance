import type { Budget } from "@core/types"
import { Badge } from "@components/ui/badge"
import { Button } from "@components/ui/button"
import { Trash2, Edit } from "lucide-react"
import { formatCurrency, formatDate } from "@core/utils/format"
import { categoryService } from "@features/categories"
import { budgetService } from "../services/budget.service"
import { cn } from "@lib/utils"
import { Progress } from "@components/ui/progress"

interface BudgetItemProps {
  budget: Budget
  onEdit?: (budget: Budget) => void
  onDelete?: (id: string) => void
}

export const BudgetItem = ({
  budget,
  onEdit,
  onDelete,
}: BudgetItemProps) => {
  const category = categoryService.getById(budget.categoryId)
  const spent = budgetService.getSpentAmount(budget.id)
  const remaining = budgetService.getRemainingAmount(budget.id)
  const percentage = (spent / budget.amount) * 100
  const isOverBudget = spent > budget.amount

  return (
    <div
      className={cn(
        "p-4 rounded-lg border",
        "hover:bg-accent transition-colors"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {category?.icon && (
            <span className="text-2xl">{category.icon}</span>
          )}
          <div>
            <p className="font-medium">{category?.name || "Unknown"}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">{budget.period}</Badge>
              <span className="text-sm text-muted-foreground">
                {formatDate(budget.startDate)} - {formatDate(budget.endDate)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onEdit && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(budget)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(budget.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Spent</span>
          <span className={cn("font-medium", isOverBudget && "text-destructive")}>
            {formatCurrency(spent)} / {formatCurrency(budget.amount)}
          </span>
        </div>
        <Progress value={Math.min(percentage, 100)} className={cn(isOverBudget && "bg-destructive")} />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Remaining</span>
          <span className={cn("font-medium", remaining < 0 && "text-destructive")}>
            {formatCurrency(Math.abs(remaining))}
            {remaining < 0 && " over budget"}
          </span>
        </div>
      </div>
    </div>
  )
}

