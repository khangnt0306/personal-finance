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
            <div className="grid gap-6 md:grid-cols-2">
                {/* Combined Plan Info & Automation Card */}
                <Card className="relative overflow-hidden border border-white/40 bg-white/70 shadow-soft-xl backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle>Thông tin kế hoạch</CardTitle>
                        <CardDescription>Thông tin cơ bản và tự động hóa</CardDescription>
                    </CardHeader>
                    <div className="flex items-center justify-between absolute top-4 right-4">
                        <PlanTypeBadge planType={plan.planType} />
                    </div>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Tiền tệ</span>
                            <Badge variant="outline">{plan.currency}</Badge>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Tổng thu nhập</span>
                            <span className="font-semibold">{formatCurrency(plan.totalIncome, plan.currency)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Tổng chi tiêu</span>
                            <span className="font-semibold text-red-600">{formatCurrency(plan.totalExpense, plan.currency)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Dự kiến dư nếu đúng kế hoạch</span>
                            <span className="font-semibold text-green-600">+ {formatCurrency(plan.totalIncome - plan.totalExpense, plan.currency)}</span>
                        </div>
                        <div className="border-t pt-4 mt-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Tự lặp</span>
                                {plan.autoRepeat ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                                ) : (
                                    <XCircle className="h-5 w-5 text-muted-foreground" />
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Tự điều chỉnh</span>
                            {plan.autoAdjustEnabled ? (
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                            ) : (
                                <XCircle className="h-5 w-5 text-muted-foreground" />
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Limits & Warnings Card */}
                <Card className="relative overflow-hidden border border-white/40 bg-white/70 shadow-soft-xl backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle>Giới hạn & cảnh báo</CardTitle>
                        <CardDescription>Ngưỡng ngân sách</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Ngưỡng cảnh báo vàng</span>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                                Vượt trên ~ {plan.warnLevelYellow}%
                                </Badge>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Ngưỡng cảnh báo đỏ</span>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
                                    Vượt trên ~ {plan.warnLevelRed}%
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

