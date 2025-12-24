import { useMemo, useState } from "react"
import { Button } from "@components/ui/button"
import { Plus } from "lucide-react"
import { DataToolbar, EmptyState, PageHeader } from "@components/molecules"
import { SavingsFundCard } from "../components/SavingsFundCard"
import { SavingsStats } from "../components/SavingsStats"
import { Skeleton } from "@components/ui/skeleton"
import type {
  SavingsFund,
  SavingsFundStats,
  SavingGoal,
  SavingsFundStatus,
} from "../types"
import { PiggyBank } from "lucide-react"
import {
  useGetSavingGoalsQuery,
  useCreateSavingGoalMutation,
  useUpdateSavingGoalMutation,
  useDeleteSavingGoalMutation,
} from "../api/savings.api"
import { SavingsGoalFormModal } from "../components/SavingsGoalFormModal"
import type { SavingGoalFormData } from "../components/saving-goal-form.schema"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@components/ui/alert-dialog"
import { MoneySourceManagerModal } from "../components/MoneySourceManagerModal"
import { ContributionSheet } from "../components/ContributionSheet"


const DEFAULT_CURRENCY = "VND"

export const SavingsPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<SavingGoal | null>(null)
  const [goalToDelete, setGoalToDelete] = useState<SavingGoal | null>(null)
  const [isContributionSheetOpen, setIsContributionSheetOpen] = useState(false)
  const [selectedFund, setSelectedFund] = useState<SavingsFund | null>(null)

  const [createSavingGoal, { isLoading: isCreating }] = useCreateSavingGoalMutation()
  const [updateSavingGoal, { isLoading: isUpdating }] = useUpdateSavingGoalMutation()
  const [deleteSavingGoal, { isLoading: isDeleting }] = useDeleteSavingGoalMutation()

  const { data, isLoading, isFetching } = useGetSavingGoalsQuery({
    limit: 100,
    textSearch: searchTerm || undefined,
  })
  const savingGoals: SavingGoal[] = useMemo(() => data?.savingGoals ?? [], [data])

  const funds: SavingsFund[] = useMemo(
    () =>
      savingGoals.map((goal: SavingGoal) => ({
        id: goal.id,
        name: goal.name,
        description: goal.description,
        targetAmount: Number(goal.targetAmount),
        currentAmount: goal.currentAmount ?? 0,
        currency: DEFAULT_CURRENCY,
        status: goal.status as SavingsFundStatus,
        createdAt: goal.createdAt,
        updatedAt: goal.updatedAt,
        deadline: goal.expectedFinishDate,
        progressPercentage: goal.progressPercentage,
      })),
    [savingGoals]
  )

  const stats: SavingsFundStats = useMemo(() => {
    const activeFunds = funds.filter((f) => f.status === "active")
    const completedFunds = funds.filter((f) => f.status === "completed")
    const totalTarget = funds.reduce((sum, f) => sum + f.targetAmount, 0)
    const totalCurrent = funds.reduce((sum, f) => sum + f.currentAmount, 0)
    const totalProgress = totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0

    return {
      totalFunds: funds.length,
      activeFunds: activeFunds.length,
      completedFunds: completedFunds.length,
      totalTarget,
      totalCurrent,
      totalProgress,
    }
  }, [funds])

  const handleCreate = () => {
    setSelectedGoal(null)
    setIsGoalModalOpen(true)
  }

  const handleEdit = (fund: SavingsFund) => {
    const goal = savingGoals.find((goal) => goal.id === fund.id)
    if (goal) {
      setSelectedGoal(goal)
      setIsGoalModalOpen(true)
    }
  }

  const handleDelete = (fund: SavingsFund) => {
    const goal = savingGoals.find((goal) => goal.id === fund.id)
    if (goal) {
      setGoalToDelete(goal)
    }
  }

  const handleCreateContribution = (fund: SavingsFund) => {
    setSelectedFund(fund)
    setIsContributionSheetOpen(true)
  }

  const handleGoalSubmit = async (payload: SavingGoalFormData) => {
    if (selectedGoal) {
      await updateSavingGoal({ id: selectedGoal.id, data: payload }).unwrap()
    } else {
      await createSavingGoal(payload).unwrap()
    }
    setIsGoalModalOpen(false)
    setSelectedGoal(null)
  }

  const confirmDeleteGoal = async () => {
    if (!goalToDelete) return
    await deleteSavingGoal(goalToDelete.id).unwrap()
    setGoalToDelete(null)
  }

  return (
    <div className="space-y-8">
      <PageHeader
        className="relative overflow-hidden border border-white/40 bg-white/70 shadow-soft-xl backdrop-blur-xl"
        title="Tiết kiệm"
        description="Quản lý các quỹ tiết kiệm của bạn, theo dõi tiến độ và đạt được mục tiêu tài chính."
        breadcrumbs={[{ label: "Bảng điều khiển", href: "/" }, { label: "Tiết kiệm" }]}
        actions={
          <div className="flex flex-wrap gap-2">
            <Button size="lg" onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Tạo quỹ mới
            </Button>
            <MoneySourceManagerModal />
          </div>
        }
      />

      {/* Stats Overview */}
      <SavingsStats stats={stats} />

      <DataToolbar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Tìm quỹ theo tên hoặc mô tả"
        actions={
          <Button
            variant="ghost"
            size="sm"
            className="w-full sm:w-auto"
            onClick={() => setSearchTerm("")}
            disabled={!searchTerm}
          >
            Đặt lại
          </Button>
        }
      />

      {/* Funds Grid */}
      {isLoading || isFetching ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64 w-full rounded-2xl" />
          ))}
        </div>
      ) : funds.length === 0 ? (
        <EmptyState
          icon={<PiggyBank className="h-8 w-8" />}
          title="Chưa có quỹ tiết kiệm nào"
          description="Bắt đầu tạo quỹ tiết kiệm đầu tiên để đạt được mục tiêu tài chính của bạn."
          action={{
            label: "Tạo quỹ mới",
            onClick: handleCreate,
          }}
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {funds.map((goal) => (
            <SavingsFundCard
              key={goal.id}
              fund={goal}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onCreateContribution={handleCreateContribution}
            />
          ))}
        </div>
      )}
      <SavingsGoalFormModal
        open={isGoalModalOpen}
        onOpenChange={(open) => {
          setIsGoalModalOpen(open)
          if (!open) setSelectedGoal(null)
        }}
        isSubmitting={isCreating || isUpdating}
        savingGoal={selectedGoal ?? undefined}
        onSubmit={handleGoalSubmit}
      />
      <AlertDialog open={!!goalToDelete} onOpenChange={(open) => !open && setGoalToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xoá quỹ tiết kiệm?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này sẽ xoá vĩnh viễn quỹ {goalToDelete?.name}. Bạn chắc chắn?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Huỷ</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteGoal} disabled={isDeleting}>
              {isDeleting ? "Đang xoá..." : "Xoá"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ContributionSheet
        open={isContributionSheetOpen}
        onOpenChange={(open) => {
          setIsContributionSheetOpen(open)
          if (!open) setSelectedFund(null)
        }}
        fund={selectedFund}
      />
    </div>
  )
}

