import { useMemo, useState } from "react"
import { Button } from "@components/ui/button"
import { Plus } from "lucide-react"
import { DataToolbar, PageHeader } from "@components/molecules"
import { PlanList } from "../components/plan-list"
import { PlanFormModal } from "../components/plan-form-modal"
import {
  useCreatePlanMutation,
  useDeletePlanMutation,
  useGetSelfPlansQuery,
  useUpdatePlanMutation,
} from "../api/plan.api"
import type { Plan, PlanType } from "../types"
import type { PlanFormData } from "../validation/plan.schemas"
import { Skeleton } from "@components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip"

export const PlansPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [planTypeFilter, setPlanTypeFilter] = useState<PlanType | "all">("all")
  
  const { data, isLoading, isFetching, refetch } = useGetSelfPlansQuery({
    textSearch: searchTerm || undefined,
    filter: {
      planType: planTypeFilter !== "all" ? planTypeFilter : undefined,
    },
    limit: 100,
  })
  
  const plans = useMemo(() => data?.plans ?? [], [data])
  const [createPlan, { isLoading: isCreating }] = useCreatePlanMutation()
  const [updatePlan, { isLoading: isUpdating }] = useUpdatePlanMutation()
  const [deletePlan] = useDeletePlanMutation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)

  const filteredPlans = plans

  const stats = useMemo(() => {
    const withAutoRepeat = plans.filter((plan: Plan) => plan.autoRepeat).length
    const withAutoAdjust = plans.filter((plan: Plan) => plan.autoAdjustEnabled).length
    const monthly = plans.filter((plan: Plan) => plan.planType === "MONTHLY").length
    const yearly = plans.filter((plan: Plan) => plan.planType === "YEARLY").length
    return {
      total: plans.length,
      withAutoRepeat,
      withAutoAdjust,
      monthly,
      yearly,
    }
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
            { label: "Total plans", value: (data?.pagination?.total ?? 0).toString() },
            { label: "Auto-repeat", value: stats.withAutoRepeat.toString(), helper: "repeating" },
            { label: "Auto-adjust", value: stats.withAutoAdjust.toString(), helper: "adaptive" },
            { label: "Monthly", value: stats.monthly.toString(), helper: "per month" },
          ]}
        />


      <DataToolbar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search plans by name or description"
        viewOptions={[
          { label: "All", value: "all" },
          { label: "Daily", value: "DAILY" },
          { label: "Weekly", value: "WEEKLY" },
          { label: "Monthly", value: "MONTHLY" },
          { label: "Yearly", value: "YEARLY" },
        ]}
        currentView={planTypeFilter}
        onViewChange={(value) => setPlanTypeFilter(value as PlanType | "all")}
        actions={
          <Button
            variant="ghost"
            className="w-full sm:w-auto"
            onClick={() => {
              setSearchTerm("")
              setPlanTypeFilter("all")
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

