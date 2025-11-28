import { Button } from "@components/ui/button"
import { Card, CardContent } from "@components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table"
import { Badge } from "@components/ui/badge"
import { Link } from "react-router-dom"
import type { Plan } from "../types"
import { Edit, Trash2, CheckCircle2, XCircle } from "lucide-react"
import { PlanTypeBadge } from "./plan-status-badge"

interface PlanListProps {
  plans: Plan[]
  onEdit: (plan: Plan) => void
  onDelete: (plan: Plan) => void
  isLoading?: boolean
}


export const PlanList = ({ plans, onEdit, onDelete, isLoading }: PlanListProps) => {
  return (
    <>
      {/* Desktop: Table View */}
      <Card className="hidden md:block p-3 rounded-2xl">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Tiền tệ</TableHead>
                <TableHead>Loại kế hoạch</TableHead>
                <TableHead>Tự lặp lại</TableHead>
                <TableHead>Tự điều chỉnh</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                    Đang tải danh sách kế hoạch...
                  </TableCell>
                </TableRow>
              ) : plans.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                    Chưa có kế hoạch nào. Hãy tạo kế hoạch đầu tiên để bắt đầu.
                  </TableCell>
                </TableRow>
              ) : (
                plans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <Link 
                          to={`/plans/${plan.id}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {plan.name}
                        </Link>
                        {plan.description && (
                          <span className="text-sm text-muted-foreground">
                            {plan.description}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{plan.currency}</Badge>
                    </TableCell>
                    <TableCell>
                      <PlanTypeBadge planType={plan.planType} />
                    </TableCell>
                    <TableCell>
                      {plan.autoRepeat ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </TableCell>
                    <TableCell>
                      {plan.autoAdjustEnabled ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onEdit(plan)}
                          aria-label={`Chỉnh sửa ${plan.name}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          onClick={() => onDelete(plan)}
                          aria-label={`Xóa ${plan.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Mobile: Card View */}
      <div className="md:hidden space-y-3">
        {isLoading ? (
          <Card className="p-4">
            <p className="text-center text-muted-foreground">Đang tải danh sách kế hoạch...</p>
          </Card>
        ) : plans.length === 0 ? (
          <Card className="p-6">
            <p className="text-center text-muted-foreground">
              Chưa có kế hoạch nào. Hãy tạo kế hoạch đầu tiên để bắt đầu.
            </p>
          </Card>
        ) : (
          plans.map((plan) => (
            <Card key={plan.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <Link 
                    to={`/plans/${plan.id}`}
                    className="flex-1 font-semibold text-primary hover:underline"
                  >
                    {plan.name}
                  </Link>
                  <div className="flex gap-1 ml-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => onEdit(plan)}
                      aria-label={`Chỉnh sửa ${plan.name}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => onDelete(plan)}
                      aria-label={`Xóa ${plan.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {plan.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {plan.description}
                  </p>
                )}

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Tiền tệ:</span>
                    <Badge variant="outline" className="text-xs">{plan.currency}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Loại:</span>
                    <PlanTypeBadge planType={plan.planType} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Tự lặp:</span>
                    {plan.autoRepeat ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Tự điều chỉnh:</span>
                    {plan.autoAdjustEnabled ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </>
  )
}

