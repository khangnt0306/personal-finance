import { useMemo, useState } from "react"
import { Button } from "@components/ui/button"
import { Plus, AlertCircle, Calendar } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { DataToolbar, PageHeader } from "@components/molecules"
import { PlanList } from "../components/plan-list"
import { PlanFormModal } from "../components/plan-form-modal"
import {
  useCreatePlanMutation,
  useDeletePlanMutation,
  useGetPlansQuery,
  useUpdatePlanMutation,
} from "../api/plan.api"
import type { Plan, PlanPriority, PlanStatus } from "../types"
import type { PlanFormData } from "../validation/plan.schemas"
import { Skeleton } from "@components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip"
import { DatePicker } from "@components/ui/date-picker"
import { parseISO, isAfter, isBefore } from "date-fns"

export const PlansPage = () => {
  const { data, isLoading, isFetching, refetch } = useGetPlansQuery({})
  const plans = useMemo(() => data?.data ?? [], [data])
  const [createPlan, { isLoading: isCreating }] = useCreatePlanMutation()
  const [updatePlan, { isLoading: isUpdating }] = useUpdatePlanMutation()
  const [deletePlan] = useDeletePlanMutation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusView, setStatusView] = useState<PlanStatus | "all">("all")
  const [priorityFilter, setPriorityFilter] = useState<PlanPriority | "all">("all")

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      const matchesSearch =
        !searchTerm ||
        plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.description?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusView === "all" || plan.status === statusView
      const matchesPriority = priorityFilter === "all" || plan.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [plans, searchTerm, statusView, priorityFilter])

  const stats = useMemo(() => {
    const completed = plans.filter((plan) => plan.status === "completed").length
    const inProgress = plans.filter((plan) => plan.status === "in_progress").length
    const onHold = plans.filter((plan) => plan.status === "on_hold").length
    return {
      total: plans.length,
      completed,
      inProgress,
      onHold,
    }
  }, [plans])

  const upcomingDeadlines = useMemo(() => {
    const now = new Date()
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    return plans.filter((plan) => {
      if (!plan.deadline || plan.status === "completed") return false
      const deadline = parseISO(plan.deadline)
      return isAfter(deadline, now) && isBefore(deadline, nextWeek)
    })
  }, [plans])

  const handleOpenModal = (plan?: Plan | null) => {
    if (plan) {
      setEditingPlan(plan)
    } else {
      setEditingPlan(null)
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingPlan(null)
  }

  const handleSubmit = async (payload: PlanFormData) => {
    try {
      if (editingPlan) {
        await updatePlan({ id: editingPlan.id, data: { ...payload, id: editingPlan.id } }).unwrap()
      } else {
        await createPlan(payload).unwrap()
      }
      await refetch()
      handleCloseModal()
    } catch (error) {
      console.error("Failed to save plan", error)
    }
  }

  const handleDelete = async (plan: Plan) => {
    const confirmed = window.confirm(`Delete plan "${plan.name}"?`)
    if (!confirmed) return
    try {
      await deletePlan(plan.id).unwrap()
      await refetch()
    } catch (error) {
      console.error("Failed to delete plan", error)
    }
  }

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <PageHeader
          title="Plans"
          description="Organize long-term goals, monitor progress, and celebrate milestones with clarity."
          breadcrumbs={[{ label: "Dashboard" }, { label: "Plans" }]}
          actions={
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="lg" onClick={() => handleOpenModal()}>
                  <Plus className="mr-2 h-4 w-4" />
                  New plan
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new financial plan or goal</p>
              </TooltipContent>
            </Tooltip>
          }
          highlights={[
            { label: "Total plans", value: stats.total.toString() },
            { label: "In progress", value: stats.inProgress.toString(), helper: "active" },
            { label: "Completed", value: stats.completed.toString(), helper: "celebrated wins" },
            { label: "On hold", value: stats.onHold.toString(), helper: "paused" },
          ]}
        />

        {upcomingDeadlines.length > 0 && (
          <Alert variant="warning">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Upcoming Deadlines</AlertTitle>
            <AlertDescription>
              {upcomingDeadlines.length} plan{upcomingDeadlines.length > 1 ? "s" : ""} {upcomingDeadlines.length > 1 ? "have" : "has"} deadlines in the next 7 days
            </AlertDescription>
          </Alert>
        )}

      <DataToolbar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search plans by name or description"
        viewOptions={[
          { label: "All", value: "all" },
          { label: "Active", value: "in_progress" },
          { label: "Not started", value: "not_started" },
          { label: "Completed", value: "completed" },
          { label: "On hold", value: "on_hold" },
        ]}
        currentView={statusView}
        onViewChange={(value) => setStatusView(value as PlanStatus | "all")}
        filters={
          <Select
            value={priorityFilter}
            onValueChange={(value) => setPriorityFilter(value as PlanPriority | "all")}
          >
            <SelectTrigger className="w-full min-w-[180px] sm:w-[180px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        }
        actions={
          <Button
            variant="ghost"
            className="w-full sm:w-auto"
            onClick={() => {
              setSearchTerm("")
              setStatusView("all")
              setPriorityFilter("all")
            }}
          >
            Reset
          </Button>
        }
      />

        {isLoading || isFetching ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : (
          <PlanList
            plans={filteredPlans}
            onEdit={handleOpenModal}
            onDelete={handleDelete}
            isLoading={false}
          />
        )}

      <PlanFormModal
        open={isModalOpen}
        plan={editingPlan}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseModal()
          } else {
            setIsModalOpen(true)
          }
        }}
        onSubmit={handleSubmit}
        isSubmitting={isCreating || isUpdating}
      />
      </div>
    </TooltipProvider>
  )
}

