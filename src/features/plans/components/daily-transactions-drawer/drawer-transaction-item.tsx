import { motion } from "framer-motion"
import { Button } from "@components/ui/button"
import { Edit } from "lucide-react"
import { formatCurrency } from "@core/utils/format"
import { format, parseISO } from "date-fns"
import type { TransactionItemProps } from "./types"

export const DrawerTransactionItem = ({
  transaction,
  currency,
  onEdit,
}: TransactionItemProps) => {
  const amount = parseFloat(transaction.amount)

  return (
    <motion.div
      className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-background/50 hover:bg-muted/50 transition-colors border border-border/40 gap-2"
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm sm:text-base truncate">{transaction.label}</p>
        <p className="text-[10px] sm:text-xs text-muted-foreground">
          {format(parseISO(transaction.createdAt), "HH:mm")}
        </p>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <p className="font-semibold text-xs sm:text-base">
          {formatCurrency(amount, currency)}
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 sm:h-9 sm:w-9"
          onClick={(e) => {
            e.stopPropagation()
            onEdit(transaction)
          }}
          title="Chỉnh sửa giao dịch"
        >
          <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
        </Button>
      </div>
    </motion.div>
  )
}

