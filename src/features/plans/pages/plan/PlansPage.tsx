import { useMemo, useState } from "react"
import { Button } from "@components/ui/button"
import { Plus } from "lucide-react"
import { DataToolbar, PageHeader } from "@components/molecules"
import { PlanList } from "@features/plans/components/plan-list"
import { PlanFormModal } from "@features/plans/components/plan-form-modal"
import {
  useCreatePlanMutation,
  useDeletePlanMutation,
  useGetSelfPlansQuery,
  useUpdatePlanMutation,
} from "@features/plans/api/plan.api"
import type { Plan, PlanType } from "@features/plans/types"
import type { PlanFormData } from "@features/plans/validation/plan.schemas"
import { Skeleton } from "@components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip"
import {
  calculatePlansStats,
  handlePlanSubmit,
  handlePlanDelete,
} from "./PlansPage.handler"

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

  const stats = useMemo(() => calculatePlansStats(plans), [plans])

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
    await handlePlanSubmit(
      payload,
      editingPlan,
      {
        createPlan: (data) => createPlan(data).unwrap(),
        updatePlan: (params) => updatePlan(params).unwrap(),
        deletePlan: (id) => deletePlan(id).unwrap(),
        refetch,
      },
      handleCloseModal
    )
  }

  const handleDelete = async (plan: Plan) => {
    await handlePlanDelete(plan, {
      createPlan: (data) => createPlan(data).unwrap(),
      updatePlan: (params) => updatePlan(params).unwrap(),
      deletePlan: (id) => deletePlan(id).unwrap(),
      refetch,
    })
  }


  return (
    <TooltipProvider>
      <div className="space-y-8">
        <PageHeader
          className="relative overflow-hidden border border-white/40 bg-white/70 shadow-soft-xl backdrop-blur-xl"
          title="Kế hoạch"
          description="Sắp xếp mục tiêu dài hạn, theo dõi tiến độ và ăn mừng từng cột mốc một cách rõ ràng."
          breadcrumbs={[{ label: "Bảng điều khiển" , href: "/" }, { label: "Kế hoạch"  }]}
          actions={
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="lg" onClick={() => handleOpenModal()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Kế hoạch mới
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tạo kế hoạch hay mục tiêu tài chính mới</p>
              </TooltipContent>
            </Tooltip>
          }
          highlights={[
            { label: "Tổng kế hoạch", value: (data?.pagination?.total ?? 0).toString() },
            { label: "Tự lặp", value: stats.withAutoRepeat.toString(), helper: "đang kích hoạt" },
            { label: "Tự điều chỉnh", value: stats.withAutoAdjust.toString(), helper: "linh hoạt" },
            { label: "Hàng tháng", value: stats.monthly.toString(), helper: "theo tháng" },
          ]}
        />

      <DataToolbar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Tìm kế hoạch theo tên hoặc mô tả"
        viewOptions={[
          { label: "Tất cả", value: "all" },
          { label: "Hàng ngày", value: "DAILY" },
          { label: "Hàng tuần", value: "WEEKLY" },
          { label: "Hàng tháng", value: "MONTHLY" },
          { label: "Hàng năm", value: "YEARLY" },
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
            Đặt lại
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

