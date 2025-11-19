import { useMemo, useState } from "react"
import { Button } from "@components/ui/button"
import { MotionCard } from "@components/ui/motion-card"
import { PageHeader, EmptyState } from "@components/molecules"
import { Plus } from "lucide-react"
import { BudgetList } from "../components/budget-list"
import { BudgetFormModal } from "../components/budget-form-modal"
import { useBudgets } from "../hooks/useBudgets"
import { budgetService } from "../services/budget.service"
import type { BudgetFormData } from "@core/validation/schemas"
import type { Budget } from "@core/types"
import { formatCurrency } from "@core/utils/format"

export const BudgetsPage = () => {
  const { budgets, refetch } = useBudgets()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null)
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

      <MotionCard className="p-8">
        {budgets.length ? (
          <BudgetList budgets={budgets} onEdit={handleEdit} onDelete={handleDelete} />
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

