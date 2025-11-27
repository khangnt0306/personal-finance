import { Button } from "@components/ui/button"
import { Card, CardContent } from "@components/ui/card"
import { Badge } from "@components/ui/badge"
import { Progress } from "@components/ui/progress"
import {
  Edit,
  Trash2,
  TrendingDown,
  Wallet,
  PiggyBank,
  Calendar,
  AlertCircle,
  Lock,
} from "lucide-react"
import type { Plan, PlanItem, ExcludeType } from "@features/plans/types"
import type { Category } from "@core/types"
import { formatCurrency } from "@core/utils/format"

interface ExpensePlanItemCardProps {
  item: PlanItem
  plan: Plan
  category?: Category
  onEdit: (item: PlanItem) => void
  onDelete: (item: PlanItem) => void
  onViewTransactions: (item: PlanItem) => void
}

const excludeTypeLabel: Record<ExcludeType, string> = {
  FIXED: "Cố định",
  FLEXIBLE: "Linh hoạt",
}

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
  const isFixed = item.excludeType === "FIXED"
  const isOverBudget = spentPercentage > 100
  const isNearLimit = spentPercentage > 80 && spentPercentage <= 100

  return (
    <Card
      className={`group border overflow-hidden cursor-pointer transition-all hover:-translate-y-1 shadow-soft backdrop-blur
        ${isOverBudget 
          ? "border-red-300/60 bg-gradient-to-br from-red-50/80 to-white/80 hover:shadow-lg hover:shadow-red-100" 
          : isNearLimit
          ? "border-orange-200/60 bg-gradient-to-br from-orange-50/80 to-white/80 hover:shadow-lg hover:shadow-orange-100"
          : "border-rose-200/60 bg-gradient-to-br from-rose-50/80 to-white/80 hover:shadow-lg hover:shadow-rose-100"
        }
      `}
      onClick={() => onViewTransactions(item)}
    >
      <CardContent className="p-0">
        {/* Header Section */}
        <div className={`p-4 pb-3 border-b bg-gradient-to-r from-transparent to-rose-50/50
          ${isOverBudget ? "border-red-200" : isNearLimit ? "border-orange-200" : "border-rose-100"}
        `}>
          <div className="flex items-start justify-between gap-4">
            {/* Left: Icon and Details */}
            <div className="flex items-start gap-3 flex-1">
              {category?.Icon && (
                <div className={`text-xl mt-1 shrink-0 ${isOverBudget ? "text-red-600" : "text-rose-600"}`}>
                  {category.Icon}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h4 className={`font-semibold text-base truncate ${isOverBudget ? "text-red-900" : "text-rose-900"}`}>
                    {item.name}
                  </h4>
                  <Badge className={`shrink-0 ${isOverBudget ? "bg-red-500 border-red-600" : "bg-rose-500 border-rose-600"} text-white`}>
                    <TrendingDown className="h-3 w-3 mr-1" />
                    Chi tiêu
                  </Badge>
                  {isFixed && (
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200 shrink-0">
                      <Lock className="h-3 w-3 mr-1" />
                      {excludeTypeLabel[item.excludeType]}
                    </Badge>
                  )}
                  {isOverBudget && (
                    <Badge className="bg-red-600 text-white border-red-700 shrink-0 animate-pulse">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Vượt ngân sách
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 text-sm mb-2">
                  {category && (
                    <Badge variant="outline" className="text-xs bg-white/80 backdrop-blur border-rose-200">
                      {category.name}
                    </Badge>
                  )}
                  {!isFixed && (
                    <Badge variant="outline" className="text-xs bg-white/80 backdrop-blur border-rose-200">
                      {excludeTypeLabel[item.excludeType]}
                    </Badge>
                  )}
                  {item.minimumPercentage !== undefined && (
                    <Badge variant="outline" className="text-xs bg-rose-50 backdrop-blur border-rose-300">
                      Tối thiểu: {item.minimumPercentage}%
                    </Badge>
                  )}
                </div>

                {item.description && (
                  <p className={`text-sm line-clamp-2 ${isOverBudget ? "text-red-700/70" : "text-rose-700/70"}`}>
                    {item.description}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex gap-1 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-rose-100"
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit(item)
                }}
              >
                <Edit className="h-4 w-4 text-rose-700" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-red-100"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(item)
                }}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section - Expense Specific */}
        <div className={`p-4 ${isOverBudget ? "bg-red-50/30" : "bg-rose-50/30"}`}>
          <div className="grid grid-cols-3 gap-4 mb-3">
            {/* Budget */}
            <div className="flex items-center gap-2">
              <Wallet className={`h-4 w-4 ${isOverBudget ? "text-red-600" : "text-rose-600"}`} />
              <div>
                <p className={`text-xs ${isOverBudget ? "text-red-700/70" : "text-rose-700/70"}`}>Ngân sách</p>
                <p className={`font-bold text-sm ${isOverBudget ? "text-red-900" : "text-rose-900"}`}>
                  {formatCurrency(totalAmount, plan.currency)}
                </p>
              </div>
            </div>

            {/* Spent */}
            <div className="flex items-center gap-2">
              <TrendingDown className={`h-4 w-4 ${isOverBudget ? "text-red-600" : "text-rose-600"}`} />
              <div>
                <p className={`text-xs ${isOverBudget ? "text-red-700/70" : "text-rose-700/70"}`}>Đã chi</p>
                <p className={`font-bold text-sm ${isOverBudget ? "text-red-700" : "text-rose-700"}`}>
                  {formatCurrency(item.spentAmount, plan.currency)}
                </p>
              </div>
            </div>

            {/* Remaining/Saved */}
            <div className="flex items-center gap-2">
              <PiggyBank className={`h-4 w-4 ${isOverBudget ? "text-red-600" : remainingAmount > 0 ? "text-green-600" : "text-gray-500"}`} />
              <div>
                <p className={`text-xs ${isOverBudget ? "text-red-700/70" : "text-rose-700/70"}`}>
                  {isOverBudget ? "Vượt mức" : "Còn lại"}
                </p>
                <p className={`font-bold text-sm ${isOverBudget ? "text-red-700" : remainingAmount > 0 ? "text-green-600" : "text-gray-600"}`}>
                  {formatCurrency(isOverBudget ? Math.abs(remainingAmount) : remainingAmount, plan.currency)}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className={`${isOverBudget ? "text-red-700/70" : "text-rose-700/70"}`}>
                Đã chi: {spentPercentage.toFixed(1)}%
              </span>
              <span className={`font-medium ${isOverBudget ? "text-red-700" : isNearLimit ? "text-orange-700" : "text-green-700"}`}>
                {isOverBudget ? "⚠️ Vượt quá!" : isNearLimit ? "⚡ Gần hết!" : "✓ Trong giới hạn"}
              </span>
            </div>
            <Progress 
              value={Math.min(spentPercentage, 100)} 
              className={`h-2 ${isOverBudget ? "bg-red-100" : "bg-rose-100"}`}
            />
            {isOverBudget && (
              <div className="h-1 bg-red-200 rounded-full">
                <div 
                  className="h-full bg-red-500 rounded-full animate-pulse"
                  style={{ width: `${Math.min((spentPercentage - 100), 100)}%` }}
                />
              </div>
            )}
          </div>

          {/* Average Daily */}
          {item.averageDaily > 0 && (
            <div className={`flex items-center gap-2 mt-3 pt-3 border-t ${isOverBudget ? "border-red-200" : "border-rose-200"}`}>
              <Calendar className={`h-4 w-4 ${isOverBudget ? "text-red-600" : "text-rose-600"}`} />
              <div className="flex-1">
                <p className={`text-xs ${isOverBudget ? "text-red-700/70" : "text-rose-700/70"}`}>Chi tiêu trung bình/ngày</p>
                <p className={`font-semibold text-sm ${isOverBudget ? "text-red-800" : "text-rose-800"}`}>
                  {formatCurrency(item.averageDaily, plan.currency)}
                </p>
              </div>
            </div>
          )}

          {/* Fixed Expense Note */}
          {isFixed && !isOverBudget && (
            <div className="mt-3 p-2 bg-purple-50 border border-purple-200 rounded-md">
              <p className="text-xs text-purple-700">
                🔒 Chi phí cố định - Cần thiết và ổn định hàng tháng
              </p>
            </div>
          )}

          {/* Over Budget Warning */}
          {isOverBudget && (
            <div className="mt-3 p-2 bg-red-100 border border-red-300 rounded-md">
              <p className="text-xs font-medium text-red-800">
                ⚠️ Đã vượt ngân sách {(spentPercentage - 100).toFixed(1)}%! Cần xem xét lại chi tiêu.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

