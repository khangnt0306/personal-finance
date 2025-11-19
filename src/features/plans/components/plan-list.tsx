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
import { Progress } from "@components/ui/progress"
import type { Plan } from "../types"
import { format } from "date-fns"
import { Edit, Trash2 } from "lucide-react"
import { PlanStatusBadge } from "./plan-status-badge"

interface PlanListProps {
  plans: Plan[]
  onEdit: (plan: Plan) => void
  onDelete: (plan: Plan) => void
  isLoading?: boolean
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)

const formatDate = (date: string) => format(new Date(date), "MMM dd, yyyy")

export const PlanList = ({ plans, onEdit, onDelete, isLoading }: PlanListProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  Loading plans...
                </TableCell>
              </TableRow>
            ) : plans.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No plans found. Create your first plan to get started.
                </TableCell>
              </TableRow>
            ) : (
              plans.map((plan) => {
                const progress = Math.min((plan.currentAmount / plan.targetAmount) * 100, 100)
                return (
                  <TableRow key={plan.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{plan.name}</span>
                        {plan.description && (
                          <span className="text-sm text-muted-foreground">
                            {plan.description}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm font-medium">
                          <span>{formatCurrency(plan.currentAmount)}</span>
                          <span className="text-muted-foreground">
                            {formatCurrency(plan.targetAmount)}
                          </span>
                        </div>
                        <Progress value={progress} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <PlanStatusBadge status={plan.status} />
                    </TableCell>
                    <TableCell className="capitalize">{plan.priority.replace("_", " ")}</TableCell>
                    <TableCell>
                      <div className="flex flex-col text-sm">
                        <span>Start: {formatDate(plan.startDate)}</span>
                        <span>End: {formatDate(plan.endDate)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onEdit(plan)}
                          aria-label={`Edit ${plan.name}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                          onClick={() => onDelete(plan)}
                          aria-label={`Delete ${plan.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

