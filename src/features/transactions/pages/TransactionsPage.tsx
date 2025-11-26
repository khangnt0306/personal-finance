import { useMemo, useState } from "react"
import { startOfMonth, endOfMonth, isWithinInterval, parseISO } from "date-fns"
import { Button } from "@components/ui/button"
import { Plus, Calendar as CalendarIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"
import { MotionCard } from "@components/ui/motion-card"
import { DataToolbar, EmptyState, PageHeader } from "@components/molecules"
import { TransactionList } from "../components/transaction-list"
import { TransactionFormModal } from "../components/transaction-form-modal"
import { useTransactions } from "../hooks/useTransactions"
import { useCategories } from "@features/categories"
import { transactionService } from "../services/transaction.service"
import type { TransactionFormData } from "@core/validation/schemas"
import type { Transaction } from "@core/types"
import { DatePicker } from "@components/ui/date-picker"
import { Checkbox } from "@components/ui/checkbox"
import { Skeleton } from "@components/ui/skeleton"
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover"
import { Label } from "@components/ui/label"

export const TransactionsPage = () => {
  const { transactions, refetch, loading } = useTransactions()
  const { categories } = useCategories()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState<Date | undefined>(new Date())
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null)

  const filteredTransactions = useMemo(() => {
    let filtered = transactions

    // Date filter
    if (dateFilter) {
      const monthStart = startOfMonth(dateFilter)
      const monthEnd = endOfMonth(dateFilter)
      filtered = filtered.filter((t) => {
        const transactionDate = parseISO(t.date)
        return isWithinInterval(transactionDate, { start: monthStart, end: monthEnd })
      })
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((t) => selectedCategories.includes(t.categoryId))
    }

    // Search filter
    if (searchTerm) {
      const lowered = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (transaction) =>
          transaction.description.toLowerCase().includes(lowered) ||
          transaction.categoryId.toLowerCase().includes(lowered)
      )
    }

    return filtered
  }, [transactions, searchTerm, dateFilter, selectedCategories])

  const incomeTransactions = filteredTransactions.filter((t) => t.type === "INCOME")
  const expenseTransactions = filteredTransactions.filter((t) => t.type === "EXPENSE")

  const handleCreate = (data: TransactionFormData) => {
    transactionService.create(data)
    refetch()
  }

  const handleUpdate = (data: TransactionFormData) => {
    if (editingTransaction) {
      transactionService.update(editingTransaction.id, data)
      refetch()
      setEditingTransaction(null)
    }
  }

  const handleDeleteClick = (id: string) => {
    setTransactionToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (transactionToDelete) {
      transactionService.delete(transactionToDelete)
      refetch()
      setTransactionToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    )
  }

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setIsModalOpen(true)
  }

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open)
    if (!open) {
      setEditingTransaction(null)
    }
  }

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <PageHeader
          title="Giao dịch"
          description="Quản lý dòng tiền vào ra với tìm kiếm, bộ lọc và hiệu ứng mượt mà."
          breadcrumbs={[{ label: "Bảng điều khiển" }, { label: "Giao dịch" }]}
          actions={
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="lg" onClick={() => setIsModalOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Thêm giao dịch
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tạo giao dịch thu hoặc chi mới</p>
              </TooltipContent>
            </Tooltip>
          }
          highlights={[
            { label: "Tổng dòng", value: transactions.length.toString() },
            { label: "Thu", value: incomeTransactions.length.toString(), helper: "đúng bộ lọc" },
            { label: "Chi", value: expenseTransactions.length.toString(), helper: "đúng bộ lọc" },
          ]}
        />

        <DataToolbar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Tìm theo mô tả hoặc danh mục"
          actions={
            <div className="flex items-center gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFilter ? dateFilter.toLocaleDateString() : "Chọn tháng"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <DatePicker
                    date={dateFilter}
                    onDateChange={setDateFilter}
                    placeholder="Chọn tháng"
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Danh mục ({selectedCategories.length})
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4" align="start">
                  <div className="space-y-2">
                    <Label>Lọc theo danh mục</Label>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={category.id}
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={() => toggleCategory(category.id)}
                          />
                          <label
                            htmlFor={category.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    {selectedCategories.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => setSelectedCategories([])}
                      >
                        Xóa bộ lọc
                      </Button>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchTerm("")
                  setDateFilter(new Date())
                  setSelectedCategories([])
                }}
                disabled={!searchTerm && !dateFilter && selectedCategories.length === 0}
              >
                Xóa tất cả
              </Button>
            </div>
          }
        />

        <MotionCard className="p-8">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6 bg-white/60">
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="income">Thu</TabsTrigger>
                <TabsTrigger value="expense">Chi</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                {filteredTransactions.length ? (
                  <TransactionList transactions={filteredTransactions} onEdit={handleEdit} onDelete={handleDeleteClick} />
                ) : (
                  <EmptyState
                    title="Không có giao dịch phù hợp"
                    description="Điều chỉnh bộ lọc hoặc thêm giao dịch mới để bắt đầu."
                    action={{
                      label: "Thêm giao dịch",
                      onClick: () => setIsModalOpen(true),
                    }}
                  />
                )}
              </TabsContent>
              <TabsContent value="income">
                {incomeTransactions.length ? (
                  <TransactionList transactions={incomeTransactions} onEdit={handleEdit} onDelete={handleDeleteClick} />
                ) : (
                  <EmptyState
                    title="Chưa có khoản thu"
                    description="Không có giao dịch thu nào khớp bộ lọc."
                    action={{
                      label: "Thêm khoản thu",
                      onClick: () => setIsModalOpen(true),
                      variant: "secondary",
                    }}
                  />
                )}
              </TabsContent>
              <TabsContent value="expense">
                {expenseTransactions.length ? (
                  <TransactionList transactions={expenseTransactions} onEdit={handleEdit} onDelete={handleDeleteClick} />
                ) : (
                  <EmptyState
                    title="Chưa có khoản chi"
                    description="Ghi lại chi tiêu để ngân sách luôn chính xác."
                    action={{
                      label: "Thêm khoản chi",
                      onClick: () => setIsModalOpen(true),
                      variant: "secondary",
                    }}
                  />
                )}
              </TabsContent>
            </Tabs>
          )}
        </MotionCard>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Bạn chắc chắn?</AlertDialogTitle>
              <AlertDialogDescription>
                Thao tác này không thể hoàn tác và sẽ xóa vĩnh viễn giao dịch khỏi dữ liệu của bạn.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>Xóa</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <TransactionFormModal
          open={isModalOpen}
          onOpenChange={handleOpenChange}
          onSubmit={editingTransaction ? handleUpdate : handleCreate}
          transaction={editingTransaction}
        />
      </div>
    </TooltipProvider>
  )
}

