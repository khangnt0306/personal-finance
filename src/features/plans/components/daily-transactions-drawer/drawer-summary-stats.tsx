import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { TrendingUp, Clock, Hash, ChartLine } from "lucide-react"
import { formatCurrency } from "@core/utils/format"
import { DrawerDefaultTransactionsList } from "./drawer-default-transactions-list"
import type { SummaryStats } from "./types"
import type { DefaultTransaction } from "../../types/daily-transaction.types"

interface DrawerSummaryStatsProps {
  summary: SummaryStats
  currency: string
  planId: string
  itemId: string
  isDefaultExcluded: boolean
  onEditDefault: (transaction: DefaultTransaction) => void
  onCreateDefault: () => void
}

export const DrawerSummaryStats = ({ 
  summary, 
  currency, 
  planId, 
  itemId, 
  isDefaultExcluded,
  onEditDefault,
  onCreateDefault,
}: DrawerSummaryStatsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-primary/5 via-background to-primary/10 backdrop-blur-lg border-primary/20">
        <CardHeader className="pb-2 sm:pb-3 p-4 sm:p-6">
          <CardTitle className="text-sm sm:text-base font-semibold">Tổng quan</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {/* Tổng đã chi */}
            <motion.div
              className="rounded-lg sm:rounded-xl bg-gradient-to-br from-background/80 to-muted/50 backdrop-blur-sm p-2.5 sm:p-3 border border-border/40"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                <div className="p-1 sm:p-1.5 rounded-md sm:rounded-lg bg-primary/10">
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                </div>
                <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">Tổng đã chi</span>
              </div>
              <p className="text-sm sm:text-lg font-bold truncate">{formatCurrency(summary.total, currency)}</p>
            </motion.div>

            {/* Hôm nay */}
            <motion.div
              className="rounded-lg sm:rounded-xl bg-gradient-to-br from-background/80 to-muted/50 backdrop-blur-sm p-2.5 sm:p-3 border border-border/40"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                <div className="p-1 sm:p-1.5 rounded-md sm:rounded-lg bg-green-500/10">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                </div>
                <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">Hôm nay</span>
              </div>
              <p className="text-sm sm:text-lg font-bold text-green-600 truncate">{formatCurrency(summary.today, currency)}</p>
            </motion.div>

            {/* Số giao dịch */}
            <motion.div
              className="rounded-lg sm:rounded-xl bg-gradient-to-br from-background/80 to-muted/50 backdrop-blur-sm p-2.5 sm:p-3 border border-border/40"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                <div className="p-1 sm:p-1.5 rounded-md sm:rounded-lg bg-blue-500/10">
                  <Hash className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                </div>
                <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">Số giao dịch</span>
              </div>
              <p className="text-sm sm:text-lg font-bold ml-0 sm:ml-2">{summary.count}</p>
            </motion.div>

            {/* Trung bình */}
            <motion.div
              className="rounded-lg sm:rounded-xl bg-gradient-to-br from-background/80 to-muted/50 backdrop-blur-sm p-2.5 sm:p-3 border border-border/40"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                <div className="p-1 sm:p-1.5 rounded-md sm:rounded-lg bg-purple-500/10">
                  <ChartLine className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                </div>
                <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">Trung bình</span>
              </div>
              <p className="text-sm sm:text-lg font-bold truncate">{formatCurrency(summary.average, currency)}</p>
            </motion.div>
          </div>

          {/* Default Transactions List */}
          {!isDefaultExcluded && (
            <DrawerDefaultTransactionsList
              planId={planId}
              itemId={itemId}
              currency={currency}
              onEdit={onEditDefault}
              onCreateNew={onCreateDefault}
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

