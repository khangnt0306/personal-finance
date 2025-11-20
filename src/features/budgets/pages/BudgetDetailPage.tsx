import { useParams } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Progress } from "@components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip"
import { Button } from "@components/ui/button"
import { ArrowLeft, AlertCircle, TrendingUp, TrendingDown } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { formatCurrency } from "@core/utils/format"

export const BudgetDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // Mock data - in real app, fetch by id
  const budget = {
    id: id || "budget-1",
    categoryId: "Food & Dining",
    amount: 5000,
    spent: 4200,
    period: "monthly",
    startDate: "2025-01-01",
    endDate: "2025-01-31",
  }

  const percentage = (budget.spent / budget.amount) * 100
  const remaining = budget.amount - budget.spent
  const isOverBudget = budget.spent > budget.amount

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/budgets")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <header className="space-y-2 flex-1">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Budgets</p>
            <h1 className="text-3xl font-semibold text-white">{budget.categoryId}</h1>
            <p className="text-muted-foreground">Monthly budget for {budget.categoryId.toLowerCase()}</p>
          </header>
        </div>

        {isOverBudget && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Budget Exceeded</AlertTitle>
            <AlertDescription>
              You have exceeded your budget by {formatCurrency(Math.abs(remaining))}. Consider reviewing your spending.
            </AlertDescription>
          </Alert>
        )}

        {percentage >= 90 && !isOverBudget && (
          <Alert variant="warning">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Budget Warning</AlertTitle>
            <AlertDescription>
              You have used {percentage.toFixed(0)}% of your budget. Only {formatCurrency(remaining)} remaining.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
              <CardDescription>Current spending vs budget limit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Usage</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="font-semibold cursor-help">{percentage.toFixed(1)}%</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{formatCurrency(budget.spent)} spent out of {formatCurrency(budget.amount)}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Progress value={Math.min(percentage, 100)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Spent</p>
                  <p className="text-2xl font-bold">{formatCurrency(budget.spent)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Budget</p>
                  <p className="text-2xl font-bold">{formatCurrency(budget.amount)}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className={`text-xl font-semibold ${remaining < 0 ? "text-destructive" : ""}`}>
                  {formatCurrency(Math.abs(remaining))}
                  {remaining < 0 && " over budget"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trends</CardTitle>
              <CardDescription>Spending patterns and comparisons</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">This month</span>
                </div>
                <span className="font-semibold">{formatCurrency(budget.spent)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-muted-foreground">Last month</span>
                </div>
                <span className="font-semibold">{formatCurrency(3800)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Change</span>
                <span className="font-semibold text-red-600">+10.5%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transaction Breakdown</CardTitle>
            <CardDescription>Detailed view of budget-related transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="transactions">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <span>View all transactions</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-sm text-muted-foreground">(24 transactions)</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Click to expand and view detailed transaction list</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 rounded hover:bg-accent">
                      <span>Restaurant - Downtown</span>
                      <span className="font-semibold">{formatCurrency(85)}</span>
                    </div>
                    <div className="flex justify-between p-2 rounded hover:bg-accent">
                      <span>Grocery Store</span>
                      <span className="font-semibold">{formatCurrency(120)}</span>
                    </div>
                    <div className="flex justify-between p-2 rounded hover:bg-accent">
                      <span>Coffee Shop</span>
                      <span className="font-semibold">{formatCurrency(15)}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}

