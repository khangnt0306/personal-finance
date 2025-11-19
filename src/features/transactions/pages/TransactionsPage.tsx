import { useMemo, useState } from "react"
import { Button } from "@components/ui/button"
import { Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"
import { MotionCard } from "@components/ui/motion-card"
import { DataToolbar, EmptyState, PageHeader } from "@components/molecules"
import { TransactionList } from "../components/transaction-list"
import { TransactionFormModal } from "../components/transaction-form-modal"
import { useTransactions } from "../hooks/useTransactions"
import { transactionService } from "../services/transaction.service"
import type { TransactionFormData } from "@core/validation/schemas"
import type { Transaction } from "@core/types"

export const TransactionsPage = () => {
  const { transactions, refetch } = useTransactions()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTransactions = useMemo(() => {
    if (!searchTerm) return transactions
    const lowered = searchTerm.toLowerCase()
    return transactions.filter(
      (transaction) =>
        transaction.description.toLowerCase().includes(lowered) ||
        transaction.categoryId.toLowerCase().includes(lowered)
    )
  }, [transactions, searchTerm])

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

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      transactionService.delete(id)
      refetch()
    }
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
    <div className="space-y-8">
      <PageHeader
        title="Transactions"
        description="Manage money in and out with search, filters, and delightful motion."
        breadcrumbs={[{ label: "Dashboard" }, { label: "Transactions" }]}
        actions={
          <Button size="lg" onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add transaction
          </Button>
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
          <Button variant="ghost" onClick={() => setSearchTerm("")} disabled={!searchTerm}>
            Clear search
          </Button>
        }
      />

      <MotionCard className="p-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 bg-white/60">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expense">Expense</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            {filteredTransactions.length ? (
              <TransactionList transactions={filteredTransactions} onEdit={handleEdit} onDelete={handleDelete} />
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
              <TransactionList transactions={incomeTransactions} onEdit={handleEdit} onDelete={handleDelete} />
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
              <TransactionList transactions={expenseTransactions} onEdit={handleEdit} onDelete={handleDelete} />
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
      </MotionCard>

      <TransactionFormModal
        open={isModalOpen}
        onOpenChange={handleOpenChange}
        onSubmit={editingTransaction ? handleUpdate : handleCreate}
        transaction={editingTransaction}
      />
    </div>
  )
}

