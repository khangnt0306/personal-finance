import type { Budget } from "@core/types"
import { BudgetItem } from "./budget-item"
import { motion } from "framer-motion"

interface BudgetListProps {
  budgets: Budget[]
  onEdit?: (budget: Budget) => void
  onDelete?: (id: string) => void
}

export const BudgetList = ({
  budgets,
  onEdit,
  onDelete,
}: BudgetListProps) => {
  if (budgets.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Không tìm thấy ngân sách nào
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {budgets.map((budget, index) => (
        <motion.div
          key={budget.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <BudgetItem
            budget={budget}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </motion.div>
      ))}
    </div>
  )
}

