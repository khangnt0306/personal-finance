import { Button } from "@components/ui/button"
import { Badge } from "@components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import type { Plan, PlanItem } from "@features/plans/types"
import type { Category } from "@core/types"
import type { CardStatusProps } from "./types"
import { Icon } from "@assets/Icon.tsx"

interface ExpenseCardHeaderProps {
  item: PlanItem
  plan: Plan
  category?: Category
  status: CardStatusProps
  onEdit: (item: PlanItem) => void
  onDelete: (item: PlanItem) => void
}

export const ExpenseCardHeader = ({
  item,
  category,
  status,
  onEdit,
  onDelete,
}: ExpenseCardHeaderProps) => {
  const { isDanger, isWarning } = status

  return (
    <div className={`p-3 pb-2.5 sm:p-4 sm:pb-3 border-b
      ${isDanger
        ? "bg-gradient-to-r from-red-100/30 via-transparent to-red-50/50 border-red-200"
        : isWarning
          ? "bg-gradient-to-r from-amber-100/30 via-transparent to-amber-50/50 border-amber-200"
          : ""  
      }
    `}>
      <div className="flex items-start justify-between gap-2 sm:gap-4">
        {/* Left: Icon and Details */}
        <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
          {category?.Icon && (
            <div className={`text-lg sm:text-xl mt-0.5 sm:mt-1 shrink-0 transition-colors
              ${isDanger ? "text-red-600" : isWarning ? "text-amber-600" : "text-emerald-600"}
            `}>
              {category.Icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex gap-2 flex-col">
              {/* Single status badge */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <Badge className={`shrink-0 text-white transition-all shadow-sm text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1
                  ${isDanger
                    ? "bg-gradient-to-r from-red-300 to-red-400 border-red-700 animate-pulse"
                    : isWarning
                      ? "bg-gradient-to-r from-amber-300 to-amber-400 border-amber-400"
                      : "bg-gradient-to-r from-emerald-500 to-emerald-600 "
                  }
                `}>
                  {isDanger ? (
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Icon name="warnRed" size={12} className="sm:w-4 sm:h-4" />
                      <p className="text-xs sm:text-sm">Nguy hiểm</p>
                    </div>
                  ) : isWarning ? (
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Icon name="warnYellow" size={12} className="sm:w-4 sm:h-4" />
                      <p className="text-xs sm:text-sm">Cảnh báo</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Icon name="safe" size={12} className="sm:w-4 sm:h-4" />
                      <p className="text-xs sm:text-sm">An toàn</p>
                    </div>
                  )}
                </Badge>
              </motion.div>
              <h4 className={`font-semibold text-base sm:text-lg truncate transition-colors
                ${isDanger ? "text-red-900" : isWarning ? "text-amber-900" : "text-emerald-900"}
              `}>
                {item.name}
              </h4>
            </div>

            {item.description && (
              <p className={`text-xs sm:text-sm line-clamp-1 sm:line-clamp-2 transition-colors leading-relaxed
                ${isDanger ? "text-red-700/70" : isWarning ? "text-amber-700/70" : "text-emerald-700/70"}
              `}>
                {item.description}
              </p>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex gap-0.5 sm:gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 sm:h-9 sm:w-9 transition-colors
              ${isDanger
                ? "hover:bg-red-100"
                : isWarning
                  ? "hover:bg-amber-100"
                  : ""  
              }
            `}
            onClick={(e) => {
              e.stopPropagation()
              onEdit(item)
            }}
          >
            <Edit className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors
              ${isDanger
                ? "text-red-700"
                : isWarning
                  ? "text-amber-700"
                  : "text-blue-600"
              }
            `} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9 hover:bg-red-100"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(item)
            }}
          >
            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-destructive" />
          </Button>
        </div>
      </div>
    </div>
  )
}

