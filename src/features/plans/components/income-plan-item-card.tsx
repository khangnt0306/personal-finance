import { Button } from "@components/ui/button"
import { Card, CardContent } from "@components/ui/card"
import { Badge } from "@components/ui/badge"
import {
    Edit,
    Trash2,
    TrendingUp,
    Wallet,
    Calendar,
    Target,
} from "lucide-react"
import type { Plan, PlanItem, ExcludeType } from "@features/plans/types"
import type { Category } from "@core/types"
import { formatCurrency } from "@core/utils/format"

interface IncomePlanItemCardProps {
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

export const IncomePlanItemCard = ({
    item,
    plan,
    category,
    onEdit,
    onDelete,
    onViewTransactions,
}: IncomePlanItemCardProps) => {
    const totalAmount = typeof item.amount === "string" ? parseFloat(item.amount) : item.amount

    return (
        <Card
            className="hover:shadow-glow hover:shadow-gray-300 !shadow-none"
            onClick={() => onViewTransactions(item)}
        >
            <CardContent className="p-0">
                {/* Header Section */}
                <div className="p-4 px-6">
                    <div className="flex items-start justify-between gap-4">
                        {/* Left: Icon and Details */}
                        <div className="flex items-start gap-3 flex-1">
                            {category?.Icon && (
                                <div className="text-xl mt-1 shrink-0 text-emerald-600">
                                    {category.Icon}
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-emerald-500 text-white border-emerald-600 shrink-0 hover:bg-emerald-600">
                                            <TrendingUp className="h-3 w-3 mr-1" />
                                            Thu nhập
                                        </Badge>
                                        <Badge className="bg-blue-100 text-blue-700 border-blue-200 shrink-0 hover:bg-blue-200">
                                            <Target className="h-3 w-3 mr-1" />
                                            {excludeTypeLabel[item.excludeType]}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs bg-white/80 backdrop-blur shadow-inner text-foreground">
                                            {category?.name}
                                        </Badge>

                                    </div>
                                    <h4 className="font-semibold text-base truncate text-foreground mt-2">
                                        {item.name}
                                    </h4>
                                </div>

                                {item.description && (
                                    <p className="text-sm text-muted-foreground line-clamp-2">
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
                                className="hover:bg-blue-100"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onEdit(item)
                                }}
                            >
                                <Edit className="h-4 w-4 text-blue-600" />
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

                {/* Stats Section - Income Specific */}
                <div className="px-6 ">
                    <div className="grid grid-cols-3 gap-4 mb-3">
                        {/* Expected Income */}
                        <div className="flex items-center gap-2">
                            <Wallet className="h-8 w-8 text-emerald-600" />
                            <div>
                                <p className="text-sm text-emerald-700/70">Dự kiến</p>
                                <p className="font-bold text-base text-emerald-900">
                                    {formatCurrency(totalAmount, plan.currency)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Average Daily - if applicable */}
                    {item.averageDaily > 0 && (
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-emerald-200">
                            <Calendar className="h-4 w-4 text-emerald-600" />
                            <div className="flex-1">
                                <p className="text-xs text-emerald-700/70">Thu nhập trung bình/ngày</p>
                                <p className="font-semibold text-sm text-emerald-800">
                                    {formatCurrency(item.averageDaily, plan.currency)}
                                </p>
                            </div>
                        </div>
                    )}

                </div>
            </CardContent>
        </Card>
    )
}

