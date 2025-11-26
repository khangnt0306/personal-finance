import type { Transaction } from "@core/types"
import { TransactionItem } from "./transaction-item"
import { motion } from "framer-motion"

interface TransactionListProps {
  transactions: Transaction[]
  onEdit?: (transaction: Transaction) => void
  onDelete?: (id: string) => void
}

export const TransactionList = ({
  transactions,
  onEdit,
  onDelete,
}: TransactionListProps) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Không tìm thấy giao dịch nào
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {transactions.map((transaction, index) => (
        <motion.div
          key={transaction.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <TransactionItem
            transaction={transaction}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </motion.div>
      ))}
    </div>
  )
}

