import type { Transaction } from "@core/types"
import { Badge } from "@components/ui/badge"
import { Button } from "@components/ui/button"
import { Trash2, Edit } from "lucide-react"
import { formatCurrency, formatDate } from "@core/utils/format"
import { categoryService } from "@features/categories"
import { cn } from "@lib/utils"

interface TransactionItemProps {
  transaction: Transaction
  onEdit?: (transaction: Transaction) => void
  onDelete?: (id: string) => void
}

export const TransactionItem = ({
  transaction,
  onEdit,
  onDelete,
}: TransactionItemProps) => {
  const category = categoryService.getById(transaction.categoryId)

  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 rounded-lg border",
        "hover:bg-accent transition-colors"
      )}
    >
      <div className="flex items-center gap-3 flex-1">
        {category?.icon && (
          <span className="text-2xl">{category.icon}</span>
        )}
        <div className="flex-1">
          <p className="font-medium">{transaction.description}</p>
          <div className="flex items-center gap-2 mt-1">
            <Badge
              variant={transaction.type === "income" ? "default" : "secondary"}
            >
              {transaction.type}
            </Badge>
            {category && (
              <span className="text-sm text-muted-foreground">
                {category.name}
              </span>
            )}
            <span className="text-sm text-muted-foreground">
              {formatDate(transaction.date)}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p
            className={cn(
              "font-bold text-lg",
              transaction.type === "income"
                ? "text-green-600"
                : "text-red-600"
            )}
          >
            {transaction.type === "income" ? "+" : "-"}
            {formatCurrency(transaction.amount)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-4">
        {onEdit && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(transaction)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
        {onDelete && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(transaction.id)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        )}
      </div>
    </div>
  )
}

