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

  const incomeTransactions = filteredTransactions.filter((t) => t.type === "income")
  const expenseTransactions = filteredTransactions.filter((t) => t.type === "expense")

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
          title="Transactions"
          description="Manage money in and out with search, filters, and delightful motion."
          breadcrumbs={[{ label: "Dashboard" }, { label: "Transactions" }]}
          actions={
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="lg" onClick={() => setIsModalOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add transaction
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new income or expense transaction</p>
              </TooltipContent>
            </Tooltip>
          }
          highlights={[
            { label: "Records", value: transactions.length.toString() },
            { label: "Income", value: incomeTransactions.length.toString(), helper: "matching filter" },
            { label: "Expense", value: expenseTransactions.length.toString(), helper: "matching filter" },
          ]}
        />

        <DataToolbar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search by description or category"
          actions={
            <div className="flex items-center gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFilter ? dateFilter.toLocaleDateString() : "Select month"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <DatePicker
                    date={dateFilter}
                    onDateChange={setDateFilter}
                    placeholder="Select month"
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Categories ({selectedCategories.length})
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4" align="start">
                  <div className="space-y-2">
                    <Label>Filter by categories</Label>
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
                        Clear filters
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
                Clear all
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
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="expense">Expense</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                {filteredTransactions.length ? (
                  <TransactionList transactions={filteredTransactions} onEdit={handleEdit} onDelete={handleDeleteClick} />
                ) : (
                  <EmptyState
                    title="No transactions match"
                    description="Adjust your filters or add a new transaction to get started."
                    action={{
                      label: "Add transaction",
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
                    title="No income found"
                    description="No income transactions matched the filter."
                    action={{
                      label: "Add income",
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
                    title="No expenses found"
                    description="Log your expenses to keep budgets aligned."
                    action={{
                      label: "Add expense",
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
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the transaction from your records.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
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

