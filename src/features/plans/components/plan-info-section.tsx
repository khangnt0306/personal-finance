import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Badge } from "@components/ui/badge"
import { CheckCircle2, XCircle } from "lucide-react"
import { PlanTypeBadge } from "./plan-status-badge"
import type { Plan } from "@features/plans/types"
import { formatCurrency } from "@core/utils/format"

interface PlanInfoSectionProps {
    plan: Plan
}

export const PlanInfoSection = ({ plan }: PlanInfoSectionProps) => {
    return (
        <>
            {/* Plan Info and Settings Cards */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                {/* Combined Plan Info & Automation Card */}
                <Card className="relative overflow-hidden border border-white/40 bg-white/70 shadow-soft-xl backdrop-blur-xl">
                    <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-6">
                        <CardTitle className="text-base sm:text-lg pr-24">Thông tin kế hoạch</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">Thông tin cơ bản và tự động hóa</CardDescription>
                    </CardHeader>
                    <div className="flex items-center justify-between absolute top-3 sm:top-4 right-3 sm:right-4">
                        <PlanTypeBadge planType={plan.planType} />
                    </div>
                    <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-xs sm:text-sm text-muted-foreground">Tiền tệ</span>
                            <Badge variant="outline" className="text-xs">{plan.currency}</Badge>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                            <span className="text-xs sm:text-sm text-muted-foreground">Tổng thu nhập</span>
                            <span className="font-semibold text-xs sm:text-sm truncate">{formatCurrency(plan.totalIncome, plan.currency)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-xs sm:text-sm text-muted-foreground">Tổng chi tiêu</span>
                            <span className="font-semibold text-xs sm:text-sm text-red-600 truncate">{formatCurrency(plan.totalExpense, plan.currency)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-xs sm:text-sm text-muted-foreground">Dự kiến dư</span>
                            <span className="font-semibold text-xs sm:text-sm text-green-600 truncate">+ {formatCurrency(plan.totalIncome - plan.totalExpense, plan.currency)}</span>
                        </div>
                        <div className="border-t pt-3 sm:pt-4 mt-3 sm:mt-4">
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-xs sm:text-sm text-muted-foreground">Tự lặp</span>
                                {plan.autoRepeat ? (
                                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 shrink-0" />
                                ) : (
                                    <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0" />
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-xs sm:text-sm text-muted-foreground">Tự điều chỉnh</span>
                            {plan.autoAdjustEnabled ? (
                                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 shrink-0" />
                            ) : (
                                <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0" />
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Limits & Warnings Card */}
                <Card className="relative overflow-hidden border border-white/40 bg-white/70 shadow-soft-xl backdrop-blur-xl">
                    <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-6">
                        <CardTitle className="text-base sm:text-lg">Giới hạn & cảnh báo</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">Ngưỡng ngân sách</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <span className="text-xs sm:text-sm text-muted-foreground">Cảnh báo vàng</span>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300 text-xs">
                                Vượt ~ {plan.warnLevelYellow}%
                                </Badge>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <span className="text-xs sm:text-sm text-muted-foreground">Cảnh báo đỏ</span>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300 text-xs">
                                    Vượt ~ {plan.warnLevelRed}%
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

