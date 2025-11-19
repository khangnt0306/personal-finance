import { GoalContributionModal } from "../components/GoalContributionModal"
import { GoalProgressCard } from "../components/GoalProgressCard"

const goals = [
  { id: "goal-1", title: "Emergency reserve", target: 25000, current: 18200, deadline: "Aug 2025" },
  { id: "goal-2", title: "Sabbatical fund", target: 12000, current: 6400, deadline: "Jan 2026" },
  { id: "goal-3", title: "New studio setup", target: 5800, current: 2100, deadline: "Oct 2025" },
]

export const GoalsPage = () => {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Goals</p>
        <h1 className="text-3xl font-semibold text-white">Fund bold decisions</h1>
        <p className="text-muted-foreground">Sync contributions with payroll flows and auto-adjust when your forecast changes.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <GoalProgressCard key={goal.id} {...goal} />
        ))}
      </div>
      <div className="max-w-md">
        <GoalContributionModal />
      </div>
    </div>
  )
}
