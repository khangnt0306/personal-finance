import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@components/ui/card"
import { Progress } from "@components/ui/progress"
import { Badge } from "@components/ui/badge"
import { Button } from "@components/ui/button"
import {
  PiggyBank,
  Target,
  TrendingUp,
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  Plus,
} from "lucide-react"
import { formatCurrency } from "@core/utils/format"
import { cn } from "@lib/utils"
import type { SavingsFund, SavingsFundStatus } from "../types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu"
import { formatDistanceToNow } from "date-fns"
import { vi } from "date-fns/locale"

interface SavingsFundCardProps {
  fund: SavingsFund
  onEdit?: (fund: SavingsFund) => void
  onDelete?: (fund: SavingsFund) => void
  onCreateContribution?: (fund: SavingsFund) => void
}

const statusConfig: Record<SavingsFundStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  active: { label: "Đang hoạt động", variant: "default" },  
  completed: { label: "Hoàn thành", variant: "default" },
  paused: { label: "Tạm dừng", variant: "secondary" },
  cancelled: { label: "Đã hủy", variant: "destructive" },
}

export const SavingsFundCard = ({ fund, onEdit, onDelete, onCreateContribution }: SavingsFundCardProps) => {
  const progress = fund.targetAmount > 0
    ? Math.min(100, Math.round((fund.currentAmount / fund.targetAmount) * 100))
    : 0

  const remaining = Math.max(0, fund.targetAmount - fund.currentAmount)
  const statusInfo = statusConfig[fund.status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Card className="group relative overflow-hidden border border-white/40 bg-white/70 backdrop-blur-xl shadow-soft-xl hover:shadow-soft-lg transition-all duration-300">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardHeader className="relative pb-3 pt-5 flex flex-col gap-2">
          <div className="flex items-center gap-2  justify-between w-full">
            <Badge variant={statusInfo.variant} className="text-xs">
              {statusInfo.label}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shadow-md shadow-primary/5"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {onCreateContribution && (
                  <DropdownMenuItem onClick={() => onCreateContribution(fund)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm khoản đóng góp
                  </DropdownMenuItem>
                )}
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(fund)}>
                    <Edit className="mr-2 h-4 w-4 text-primary" />
                    Chỉnh sửa
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem
                    onClick={() => onDelete(fund)}
                    className="text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Xóa
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className={cn(
                "flex h-12 w-12 items-center justify-center rounded-2xl shadow-soft",
                fund.color
                  ? `bg-gradient-to-br ${fund.color}`
                  : "bg-gradient-to-br from-primary/20 to-accent/20"
              )}>
                {fund.icon ? (
                  <span className="text-2xl">{fund.icon}</span>
                ) : (
                  <PiggyBank className="h-6 w-6 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground truncate mb-1">
                  {fund.name}
                </h3>
                {fund.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {fund.description}
                  </p>
                )}
              </div>
            </div>

          
          </div>
        </CardHeader>

        <CardContent className="relative space-y-4 pt-0">
          {/* Progress Section */}
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {formatCurrency(fund.currentAmount, fund.currency)}
                </span>
                <span className="text-sm text-muted-foreground">
                  / {formatCurrency(fund.targetAmount, fund.currency)}
                </span>
              </div>
              <span className="text-sm font-semibold text-primary">
                {progress}%
              </span>
            </div>

            <Progress
              value={progress}
              className="h-2.5 bg-muted/50"
            />

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                <span>Còn lại: {formatCurrency(remaining, fund.currency)}</span>
              </div>
              {fund.monthlyContribution && (
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>{formatCurrency(fund.monthlyContribution, fund.currency)}/tháng</span>
                </div>
              )}
                          {fund.deadline && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>
                  {formatDistanceToNow(new Date(fund.deadline), {
                    addSuffix: true,
                    locale: vi
                  })}
                </span>
              </div>
            )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

