import { Wallet, TrendingDown, PiggyBank } from "lucide-react"
import { motion } from "framer-motion"
import type { Plan, PlanItem } from "@features/plans/types"
import type { CardStatusProps } from "./types"
import { formatCurrency } from "@core/utils/format"

interface ExpenseCardStatsProps {
  item: PlanItem
  plan: Plan
  status: CardStatusProps
  totalAmount: number
  remainingAmount: number
}

export const ExpenseCardStats = ({
  item,
  plan,
  status,
  totalAmount,
  remainingAmount,
}: ExpenseCardStatsProps) => {
  const { isDanger, isWarning } = status

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
      {/* Budget */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className={`p-2.5 sm:p-3 rounded-lg border transition-all
          ${isDanger 
            ? "bg-white/60 border-red-200/60" 
            : isWarning 
            ? "bg-white/60 border-amber-200/60" 
            : "bg-white/60 "
          }
        `}
      >
        <div className="flex items-center gap-2 mb-1">
          <Wallet className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors shrink-0
            ${isDanger ? "text-red-600" : isWarning ? "text-amber-600" : ""}
          `} />
          <p className="text-xs font-medium text-muted-foreground">Ngân sách</p>
        </div>
        <p className={`font-bold text-sm sm:text-base transition-colors truncate
          ${isDanger ? "text-red-900" : isWarning ? "text-amber-900" : ""}
        `}>
          {formatCurrency(totalAmount, plan.currency)}
        </p>
      </motion.div>

      {/* Spent */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className={`p-2.5 sm:p-3 rounded-lg border transition-all bg-white/60 border-red-200/60`} 
      >
        <div className="flex items-center gap-2 mb-1">
          <TrendingDown className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors text-red-600 shrink-0`} />
          <p className="text-xs font-medium text-muted-foreground">Đã chi</p>
        </div>
        <p className={`font-bold text-sm sm:text-base transition-colors text-red-600 truncate`}>
          {formatCurrency(item.spentAmount, plan.currency)}
        </p>
      </motion.div>

      {/* Remaining */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className={`p-2.5 sm:p-3 rounded-lg border transition-all
          ${remainingAmount < 0
            ? "bg-white/60 border-red-200/60"
            : "bg-white/60 border-green-200/60"
          }
        `}
      >
        <div className="flex items-center gap-2 mb-1">
          <PiggyBank className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors shrink-0
            ${remainingAmount < 0 ? "text-red-600" : "text-green-600"}
          `} />
          <p className="text-xs font-medium text-muted-foreground">
            {remainingAmount < 0 ? "Vượt mức" : "Còn lại"}
          </p>
        </div>
        <p className={`font-bold text-sm sm:text-base transition-colors truncate
          ${remainingAmount < 0 ? "text-red-700" : "text-green-600"}
        `}>
          {formatCurrency(Math.abs(remainingAmount), plan.currency)}
        </p>
      </motion.div>
    </div>
  )
}

