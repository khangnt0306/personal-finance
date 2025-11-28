import { Progress } from "@components/ui/progress"
import { Tooltip, TooltipContent, TooltipTrigger } from "@components/ui/tooltip"
import { motion } from "framer-motion"
import type { Plan } from "@features/plans/types"
import type { CardStatusProps } from "./types"
import { Icon } from "@assets/Icon.tsx"

interface ExpenseCardProgressProps {
  plan: Plan
  status: CardStatusProps
  spentPercentage: number
}

export const ExpenseCardProgress = ({
  plan,
  status,
  spentPercentage,
}: ExpenseCardProgressProps) => {
  const { isDanger, isWarning } = status

  return (
    <div className="space-y-2 sm:space-y-2.5 mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t">
      <div className="flex justify-between text-[10px] sm:text-xs items-center gap-2">
        <span className={`font-medium transition-colors
          ${isDanger ? "text-red-700" : isWarning ? "text-amber-700" : ""}
        `}>
          Đã dùng {spentPercentage.toFixed(1)}%
        </span>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <span className={`font-semibold text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full transition-colors cursor-help
              ${isDanger
                ? "bg-red-100 text-red-700"
                : isWarning
                  ? "bg-amber-100 text-amber-700"
                  : "bg-emerald-100 text-emerald-700"
              }
            `}>
              {isDanger ? "Nguy hiểm" : isWarning ? "Cảnh báo" : "An toàn"}
            </span>
          </TooltipTrigger>
          <TooltipContent side="top">
            <div className="text-xs space-y-1">
              <p className="flex items-center gap-2"><Icon name="safe" size={14} /> An toàn: &lt; {100}%</p>
              <p className="flex items-center gap-2"><Icon name="warnYellow" size={14} /> Cảnh báo: {plan.warnLevelYellow + 100}%</p>
              <p className="flex items-center gap-2"><Icon name="warnRed" size={14} /> Nguy hiểm: ≥ {plan.warnLevelRed + 100}%</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="relative">
        <Progress
          value={Math.min(spentPercentage, 100)}
          className={`h-2 sm:h-3 transition-all shadow-inner
            ${isDanger ? "bg-red-100" : isWarning ? "bg-amber-100" : ""}
          `}
        />
      </div>

      {spentPercentage > 100 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="h-1.5 sm:h-2 bg-red-200 rounded-full overflow-hidden shadow-inner"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((spentPercentage - 100), 100)}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-red-500 rounded-full animate-pulse"
          />
        </motion.div>
      )}
    </div>
  )
}

