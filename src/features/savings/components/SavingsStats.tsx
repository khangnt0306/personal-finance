import { motion } from "framer-motion"
import { Card, CardContent } from "@components/ui/card"
import { TrendingUp, CheckCircle2, PiggyBank } from "lucide-react"
import type { SavingsFundStats } from "../types"

interface SavingsStatsProps {
  stats: SavingsFundStats
}

export const SavingsStats = ({ stats }: SavingsStatsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Total Funds */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0 }}
      >
        <Card className="border border-white/40 bg-white/70 backdrop-blur-xl shadow-soft-xl hover:shadow-soft-lg transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 shadow-soft">
                <PiggyBank className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                  Tổng quỹ
                </p>
                <p className="text-xl sm:text-2xl font-bold text-foreground truncate">
                  {stats.totalFunds}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Active Funds */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="border border-white/40 bg-white/70 backdrop-blur-xl shadow-soft-xl hover:shadow-soft-lg transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 shadow-soft">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                  Đang hoạt động
                </p>
                <p className="text-xl sm:text-2xl font-bold text-foreground truncate">
                  {stats.activeFunds}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Completed Funds */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border border-white/40 bg-white/70 backdrop-blur-xl shadow-soft-xl hover:shadow-soft-lg transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 shadow-soft">
                <CheckCircle2 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                  Hoàn thành
                </p>
                <p className="text-xl sm:text-2xl font-bold text-foreground truncate">
                  {stats.completedFunds}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

