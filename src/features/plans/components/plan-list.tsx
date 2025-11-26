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
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Plan Type</TableHead>
              <TableHead>Auto Repeat</TableHead>
              <TableHead>Auto Adjust</TableHead>
              <TableHead>Warning Levels</TableHead>
              <TableHead>Daily Min Limit</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                  Loading plans...
                </TableCell>
              </TableRow>
            ) : plans.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                  No plans found. Create your first plan to get started.
                </TableCell>
              </TableRow>
            ) : (
              plans.map((plan) => {
                return (
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
                    <TableCell>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                          {plan.warnLevelYellow}%
                        </Badge>
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
                          {plan.warnLevelRed}%
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">
                        {plan.dailyMinLimit}%
                      </span>
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

