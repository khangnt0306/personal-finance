import { useMemo, useState } from "react"
import { Button } from "@components/ui/button"
import { MotionCard } from "@components/ui/motion-card"
import { PageHeader, EmptyState } from "@components/molecules"
import { Plus, AlertCircle } from "lucide-react"
import { BudgetList } from "../components/budget-list"
import { BudgetFormModal } from "../components/budget-form-modal"
import { useBudgets } from "../hooks/useBudgets"
import { budgetService } from "../services/budget.service"
import type { BudgetFormData } from "@core/validation/schemas"
import type { Budget } from "@core/types"
import { formatCurrency } from "@core/utils/format"
import { Skeleton } from "@components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion"
import { Switch } from "@components/ui/switch"
import { Label } from "@components/ui/label"
import { Progress } from "@components/ui/progress"
import { Slider } from "@components/ui/slider"

export const BudgetsPage = () => {
  const { budgets, refetch, loading } = useBudgets()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null)
  const [enabledBudgets, setEnabledBudgets] = useState<Set<string>>(new Set(budgets.map((b) => b.id)))
  
  const summary = useMemo(() => {
    const monthly = budgets.filter((budget) => budget.period === "monthly")
    const yearly = budgets.filter((budget) => budget.period === "yearly")
    const target = budgets.reduce((sum, budget) => sum + budget.amount, 0)
    return {
      total: budgets.length,
      monthly: monthly.length,
      yearly: yearly.length,
      target,
    }
  }, [budgets])

  const budgetWarnings = useMemo(() => {
    return budgets.filter((budget) => {
      const spent = budgetService.getSpentAmount(budget.id)
      const percentage = (spent / budget.amount) * 100
      return spent > budget.amount || percentage >= 90
    })
  }, [budgets])

  const toggleBudget = (budgetId: string) => {
    setEnabledBudgets((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(budgetId)) {
        newSet.delete(budgetId)
      } else {
        newSet.add(budgetId)
      }
      return newSet
    })
  }

  const handleCreate = (data: BudgetFormData) => {
    budgetService.create(data)
    refetch()
  }

  const handleUpdate = (data: BudgetFormData) => {
    if (editingBudget) {
      budgetService.update(editingBudget.id, data)
      refetch()
      setEditingBudget(null)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this budget?")) {
      budgetService.delete(id)
      refetch()
    }
  }

  const handleEdit = (budget: Budget) => {
    setEditingBudget(budget)
    setIsModalOpen(true)
  }

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open)
    if (!open) {
      setEditingBudget(null)
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Budgets"
        description="Set intentional spending limits and make adjustments before overspending occurs."
        breadcrumbs={[{ label: "Dashboard" }, { label: "Budgets" }]}
        actions={
          <Button size="lg" onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add budget
          </Button>
        }
        highlights={[
          { label: "Total budgets", value: summary.total.toString() },
          { label: "Monthly", value: summary.monthly.toString(), helper: "recurring" },
          { label: "Yearly", value: summary.yearly.toString(), helper: "long-term" },
          { label: "Target amount", value: formatCurrency(summary.target) },
        ]}
      />

      {budgetWarnings.length > 0 && (
        <Alert variant={budgetWarnings.some((b) => budgetService.getSpentAmount(b.id) > b.amount) ? "destructive" : "warning"}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Budget Alerts</AlertTitle>
          <AlertDescription>
            {budgetWarnings.length} budget{budgetWarnings.length > 1 ? "s" : ""} {budgetWarnings.some((b) => budgetService.getSpentAmount(b.id) > b.amount) ? "exceeded" : "approaching limit"}
          </AlertDescription>
        </Alert>
      )}

      <MotionCard className="p-8">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : budgets.length ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <Label className="text-sm font-medium">Enable/Disable Budgets</Label>
              <div className="text-sm text-muted-foreground">
                {enabledBudgets.size} of {budgets.length} enabled
              </div>
            </div>
            <Accordion type="multiple" className="w-full">
              {budgets.map((budget) => {
                const spent = budgetService.getSpentAmount(budget.id)
                const remaining = budgetService.getRemainingAmount(budget.id)
                const percentage = Math.min((spent / budget.amount) * 100, 100)
                const isEnabled = enabledBudgets.has(budget.id)

                return (
                  <AccordionItem key={budget.id} value={budget.id}>
                    <AccordionTrigger>
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={isEnabled}
                            onCheckedChange={() => toggleBudget(budget.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="text-left">
                            <p className="font-medium">{budget.categoryId}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatCurrency(spent)} / {formatCurrency(budget.amount)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-32">
                            <Progress value={percentage} />
                          </div>
                          <span className="text-sm font-medium">{percentage.toFixed(0)}%</span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs text-muted-foreground">Spent</Label>
                            <p className="text-lg font-semibold">{formatCurrency(spent)}</p>
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Remaining</Label>
                            <p className={`text-lg font-semibold ${remaining < 0 ? "text-destructive" : ""}`}>
                              {formatCurrency(Math.abs(remaining))}
                            </p>
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground mb-2 block">Adjust Budget Amount</Label>
                          <Slider
                            value={[budget.amount]}
                            onValueChange={(value) => {
                              budgetService.update(budget.id, { amount: value[0] })
                              refetch()
                            }}
                            min={0}
                            max={budget.amount * 2}
                            step={100}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>$0</span>
                            <span>{formatCurrency(budget.amount * 2)}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(budget)}
                          >
                            Edit Budget
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(budget.id)}
                          >
                            Delete Budget
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
            <div className="mt-6">
              <BudgetList budgets={budgets.filter((b) => enabledBudgets.has(b.id))} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
          </>
        ) : (
          <EmptyState
            title="No budgets yet"
            description="Create budgets across categories to keep spending aligned."
            action={{
              label: "Create budget",
              onClick: () => setIsModalOpen(true),
            }}
          />
        )}
      </MotionCard>

      <BudgetFormModal
        open={isModalOpen}
        onOpenChange={handleOpenChange}
        onSubmit={editingBudget ? handleUpdate : handleCreate}
        budget={editingBudget}
      />
    </div>
  )
}

