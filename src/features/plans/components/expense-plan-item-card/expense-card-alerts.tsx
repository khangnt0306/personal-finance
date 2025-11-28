import { AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import type { Plan, PlanItem } from "@features/plans/types"
import type { CardStatusProps } from "./types"

interface ExpenseCardAlertsProps {
  item: PlanItem
  plan: Plan
  status: CardStatusProps
  spentPercentage: number
}

export const ExpenseCardAlerts = ({
  plan,
  status,
  spentPercentage,
}: ExpenseCardAlertsProps) => {
  const { isDanger, isWarning } = status

  return (
    <>
      {/* Danger Alert */}
      {isDanger && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-gradient-to-r from-red-50 to-red-100 border border-red-300 rounded-lg shadow-sm"
        >
          <div className="flex items-start gap-1.5 sm:gap-2">
            <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-600 shrink-0 mt-0.5 animate-pulse" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] sm:text-xs text-red-900 font-bold mb-0.5">
                Vượt ngưỡng nguy hiểm!
              </p>
              <p className="text-[10px] sm:text-xs text-red-700">
                Đã chi {spentPercentage.toFixed(1)}% (vượt {plan.warnLevelRed}%). Cần xem xét ngay.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Warning Alert */}
      {isWarning && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-300 rounded-lg shadow-sm"
        >
          <div className="flex items-start gap-1.5 sm:gap-2">
            <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] sm:text-xs text-amber-900 font-semibold mb-0.5">
                Đạt ngưỡng cảnh báo
              </p>
              <p className="text-[10px] sm:text-xs text-amber-700">
                Nên kiểm soát chi tiêu để không vượt {plan.warnLevelRed}%.
              </p>
            </div>
          </div>
        </motion.div>
      )}

    </>
  )
}

