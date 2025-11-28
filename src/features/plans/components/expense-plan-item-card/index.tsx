import { Card, CardContent } from "@components/ui/card"
import { TooltipProvider } from "@components/ui/tooltip"
import { motion } from "framer-motion"
import type { ExpensePlanItemCardProps, CardStatusProps } from "./types"
import { ExpenseCardHeader } from "./expense-card-header"
import { ExpenseCardStats } from "./expense-card-stats"
import { ExpenseCardProgress } from "./expense-card-progress"
import { ExpenseCardAlerts } from "./expense-card-alerts"

export const ExpensePlanItemCard = ({
  item,
  plan,
  category,
  onEdit,
  onDelete,
  onViewTransactions,
}: ExpensePlanItemCardProps) => {
  const totalAmount = typeof item.amount === "string" ? parseFloat(item.amount) : item.amount
  const spentPercentage = totalAmount > 0 ? (item.spentAmount / totalAmount) * 100 : 0
  const remainingAmount = totalAmount - item.spentAmount

  // Determine status based on plan thresholds
  const status: CardStatusProps = {
    isDanger: spentPercentage >= (plan.warnLevelRed + 100),
    isWarning: spentPercentage >= (plan.warnLevelYellow + 100) && spentPercentage < (plan.warnLevelRed + 100),
    isSafe: spentPercentage < (plan.warnLevelYellow + 100),
  }

  const { isDanger, isWarning } = status

  return (
    <TooltipProvider>
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card
          className={`group border overflow-hidden cursor-pointer shadow-soft backdrop-blur transition-all
            ${isDanger
              ? "border-red-300/70 bg-gradient-to-br from-red-50/90 via-white/80 to-red-50/40 hover:shadow-xl hover:shadow-red-200/60"
              : isWarning
                ? "border-amber-300/70 bg-gradient-to-br from-amber-50/90 via-white/80 to-amber-50/40 hover:shadow-xl hover:shadow-amber-200/60"
                : " hover:shadow-xl "
            }
          `}
          onClick={() => onViewTransactions(item)}
        >
          <CardContent className="p-0">
            {/* Header Section */}
            <ExpenseCardHeader
              item={item}
              plan={plan}
              category={category}
              status={status}
              onEdit={onEdit}
              onDelete={onDelete}
            />

            {/* Stats Section */}
            <div className={`p-5 transition-colors
              ${isDanger
                ? "bg-red-50/40"
                : isWarning
                  ? "bg-amber-50/40"
                  : ""
              }
            `}>
              {/* Stats Grid */}
              <ExpenseCardStats
                item={item}
                plan={plan}
                status={status}
                totalAmount={totalAmount}
                remainingAmount={remainingAmount}
              />

              {/* Progress Bar */}
              <ExpenseCardProgress
                plan={plan}
                status={status}
                spentPercentage={spentPercentage}
              />

              {/* Smart Status Alerts */}
              <ExpenseCardAlerts
                item={item}
                plan={plan}
                status={status}
                spentPercentage={spentPercentage}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </TooltipProvider>
  )
}

