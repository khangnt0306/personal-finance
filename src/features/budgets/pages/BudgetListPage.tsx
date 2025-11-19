import { BudgetDetailCard } from "../components/BudgetDetailCard"
import { BudgetForm } from "../components/BudgetForm"

const sampleBudgets = [
  { id: "bgt-01", name: "Essential housing", planned: 3200, spent: 2410, renews: "Apr 1", owner: "Household" },
  { id: "bgt-02", name: "Lifestyle & dinners", planned: 950, spent: 640, renews: "Mar 20", owner: "Jordan" },
  { id: "bgt-03", name: "Subscriptions stack", planned: 420, spent: 315, renews: "Mar 15", owner: "Ops" },
]

export const BudgetListPage = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Budgets</p>
        <h1 className="text-3xl font-semibold text-white">Guardrails for spend</h1>
        <p className="text-muted-foreground">
          Recalibrate envelopes across households and automatically pulse reminders when your spending velocity changes.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {sampleBudgets.map((budget) => (
            <BudgetDetailCard key={budget.id} {...budget} />
          ))}
        </div>
        <BudgetForm />
      </div>
    </div>
  )
}
