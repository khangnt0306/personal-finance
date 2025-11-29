import { useState } from "react"
import { motion } from "framer-motion"
import { ListChecks, Loader2, Edit, Trash2, Info } from "lucide-react"
import { formatCurrency } from "@core/utils/format"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@components/ui/accordion"
import { Badge } from "@components/ui/badge"
import { Button } from "@components/ui/button"
import { Alert, AlertDescription } from "@components/ui/alert"
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@components/ui/alert-dialog"
import { 
  useGetDefaultTransactionsQuery,
  useDeleteDefaultTransactionMutation 
} from "../../api/default-transaction.api"
import type { DefaultTransaction } from "../../types/daily-transaction.types"
import { showSuccess, showError } from "@lib/toast"

interface DrawerDefaultTransactionsListProps {
  planId: string
  itemId: string
  currency: string
  onEdit: (transaction: DefaultTransaction) => void
  onCreateNew?: () => void
}

export const DrawerDefaultTransactionsList = ({
  planId,
  itemId,
  currency,
  onEdit,
}: DrawerDefaultTransactionsListProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [transactionToDelete, setTransactionToDelete] = useState<DefaultTransaction | null>(null)

  const { data: defaultTransactionsData, isLoading: isLoadingDefaults } = useGetDefaultTransactionsQuery({
    planId,
    itemId,
  })

  const [deleteTransaction, { isLoading: isDeleting }] = useDeleteDefaultTransactionMutation()

  const defaultTransactions = defaultTransactionsData?.defaultTransactions || []

  const handleDeleteClick = (transaction: DefaultTransaction) => {
    setTransactionToDelete(transaction)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!transactionToDelete) return

    try {
      await deleteTransaction({
        planId,
        itemId,
        transactionId: transactionToDelete.id,
      }).unwrap()
      showSuccess("Đã xóa giao dịch mặc định")
      setDeleteDialogOpen(false)
      setTransactionToDelete(null)
    } catch (error) {
      console.error("Lỗi xóa giao dịch:", error)
      showError("Không thể xóa giao dịch")
    }
  }

  return (
    <>
      <div className="mt-4 sm:mt-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="default-transactions" className="border-none">
            <AccordionTrigger className="hover:no-underline py-3 px-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="mr-2 text-[10px] sm:text-xs">
                  {defaultTransactions.length}
                </Badge>
                <span className="text-xs sm:text-sm font-medium">
                  Giao dịch mặc định hằng ngày
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-1 pt-3">
              {/* Info Alert */}
              <Alert className="mb-3 border-blue-200 bg-blue-50/50 dark:border-blue-900/50 dark:bg-blue-950/20">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="text-xs sm:text-sm text-blue-900 dark:text-blue-100">
                  Số tiền giao dịch hằng ngày sẽ được tự động cập nhật theo giao dịch mặc định nếu bạn không cập nhật trong ngày.
                </AlertDescription>
              </Alert>

              {isLoadingDefaults ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <>
                  {defaultTransactions.length === 0 ? (
                    <div className="text-center py-6 text-xs sm:text-sm text-muted-foreground">
                      Chưa có giao dịch mặc định nào
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {defaultTransactions.map((transaction) => (
                        <motion.div
                          key={transaction.id}
                          className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-gradient-to-r from-background to-muted/30 border border-border/40 hover:border-border/60 transition-colors group"
                          whileHover={{ scale: 1.01 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className={`p-1.5 rounded-md ${transaction.enabled ? 'bg-green-500/10' : 'bg-gray-500/10'}`}>
                              <ListChecks className={`h-3.5 w-3.5 ${transaction.enabled ? 'text-green-600' : 'text-gray-500'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs sm:text-sm font-medium truncate">{transaction.label}</p>
                              {!transaction.enabled && (
                                <p className="text-[10px] sm:text-xs text-muted-foreground">Tạm dừng</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-right mr-2">
                              <p className="text-xs sm:text-sm font-semibold">{formatCurrency(parseFloat(transaction.amount), currency)}</p>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => onEdit(transaction)}
                              >
                                <Edit className="h-3.5 w-3.5 text-blue-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => handleDeleteClick(transaction)}
                              >
                                <Trash2 className="h-3.5 w-3.5 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa giao dịch mặc định "{transactionToDelete?.label}"?
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Đang xóa..." : "Xóa"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

