import { useMemo, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog"
import {
  useCreateMoneySourceMutation,
  useDeleteMoneySourceMutation,
  useGetMoneySourcesQuery,
  useUpdateMoneySourceMutation,
  type MoneySource,
} from "../api/money-source.api"
import { Input } from "@components/ui/input"
import { Textarea } from "@components/ui/textarea"
import { Button } from "@components/ui/button"
import { Separator } from "@components/ui/separator"
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
import { Pencil, Trash2, Wallet } from "lucide-react"
import { AnimatedPlusButton } from "@components/common/AnimatedPlusButton"

export const MoneySourceManagerModal = () => {
  const { data, isLoading } = useGetMoneySourcesQuery({ limit: 100 })
  const [createMoneySource, { isLoading: isCreating }] = useCreateMoneySourceMutation()
  const [updateMoneySource, { isLoading: isUpdating }] = useUpdateMoneySourceMutation()
  const [deleteMoneySource, { isLoading: isDeleting }] = useDeleteMoneySourceMutation()

  const [newSource, setNewSource] = useState({ name: "", description: "" })
  const [editingSourceId, setEditingSourceId] = useState<string | null>(null)
  const [editingValues, setEditingValues] = useState({ name: "", description: "" })
  const [sourceToDelete, setSourceToDelete] = useState<MoneySource | null>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)

  const sources = useMemo<MoneySource[]>(() => data?.moneySources ?? [], [data])

  const handleCreate = async () => {
    if (!newSource.name) return
    await createMoneySource(newSource).unwrap()
    setNewSource({ name: "", description: "" })
    setShowCreateForm(false)
  }

  const startEdit = (source: MoneySource) => {
    setEditingSourceId(source.id)
    setEditingValues({ name: source.name, description: source.description ?? "" })
  }

  const cancelEdit = () => {
    setEditingSourceId(null)
    setEditingValues({ name: "", description: "" })
  }

  const saveEdit = async () => {
    if (!editingSourceId || !editingValues.name) return
    await updateMoneySource({ id: editingSourceId, data: editingValues }).unwrap()
    cancelEdit()
  }

  const confirmDeleteSource = async () => {
    if (!sourceToDelete) return
    await deleteMoneySource(sourceToDelete.id).unwrap()
    setSourceToDelete(null)
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="bg-gradient-to-br from-primary/20 to-accent/20" variant="outline">
        <Wallet className="h-4 w-4 text-primary" />
      </Button>
      <Dialog
        open={isOpen}
        onOpenChange={(next) => {
          setIsOpen(next)
          if (!next) {
            cancelEdit()
            setNewSource({ name: "", description: "" })
            setShowCreateForm(false)
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Quản lý nguồn tiền</DialogTitle>
            <DialogDescription>
              Thêm mới, chỉnh sửa hoặc xoá các nguồn tiền để sử dụng khi tạo quỹ tiết kiệm.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex justify-center">
              <AnimatedPlusButton
                label="Tạo mới"
                onClick={() => setShowCreateForm(!showCreateForm)}
              />
            </div>

            {showCreateForm && (
            <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4 space-y-3">
              <p className="text-sm font-medium text-primary">Thêm nguồn tiền mới</p>
              <Input
                placeholder="Tên nguồn tiền"
                value={newSource.name}
                onChange={(event) => setNewSource((prev) => ({ ...prev, name: event.target.value }))}
              />
              <Textarea
                placeholder="Mô tả (tuỳ chọn)"
                value={newSource.description}
                onChange={(event) =>
                  setNewSource((prev) => ({ ...prev, description: event.target.value }))
                }
              />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowCreateForm(false)
                      setNewSource({ name: "", description: "" })
                    }}
                  >
                    Huỷ
                  </Button>
                <Button onClick={handleCreate} disabled={!newSource.name || isCreating}>
                  {isCreating ? "Đang tạo..." : "Thêm mới"}
                </Button>
              </div>
            </div>
            )}

            {showCreateForm && <Separator />}

            <div>
              <p className="mb-2 text-sm font-medium text-muted-foreground">
                {isLoading
                  ? "Đang tải nguồn tiền..."
                  : `Có ${sources.length} nguồn tiền đang khả dụng`}
              </p>
              <div className="max-h-[320px] space-y-3 overflow-y-auto pr-4 bg-white">
                {sources.map((source) => {
                  const isEditing = editingSourceId === source.id
                  return (
                    <div
                      key={source.id}
                      className="rounded-2xl border border-border/60  p-4 shadow-soft"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1 space-y-2">
                          {isEditing ? (
                            <>
                              <Input
                                placeholder="Tên nguồn tiền"
                                value={editingValues.name}
                                onChange={(event) =>
                                  setEditingValues((prev) => ({
                                    ...prev,
                                    name: event.target.value,
                                  }))
                                }
                              />
                              <Textarea
                                placeholder="Mô tả"
                                value={editingValues.description}
                                onChange={(event) =>
                                  setEditingValues((prev) => ({
                                    ...prev,
                                    description: event.target.value,
                                  }))
                                }
                              />
                            </>
                          ) : (
                            <>
                              <p className="text-base font-semibold text-foreground">{source.name}</p>
                              {source.description ? (
                                <p className="text-sm text-muted-foreground">{source.description}</p>
                              ) : null}
                            </>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {isEditing ? (
                            <>
                              <Button variant="outline" size="sm" onClick={cancelEdit} disabled={isUpdating}>
                                Huỷ
                              </Button>
                              <Button size="sm" onClick={saveEdit} disabled={isUpdating}>
                                {isUpdating ? "Đang lưu..." : "Lưu"}
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button variant="outline" size="sm" onClick={() => startEdit(source)}>
                                <Pencil className="h-4 w-4 text-primary" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSourceToDelete(source)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
                {!sources.length && !isLoading ? (
                  <p className="text-sm text-muted-foreground">
                    Chưa có nguồn tiền nào. Hãy thêm nguồn tiền đầu tiên.
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!sourceToDelete}
        onOpenChange={(next) => {
          if (!next) setSourceToDelete(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xoá nguồn tiền?</AlertDialogTitle>
            <AlertDialogDescription>
              Nguồn tiền "{sourceToDelete?.name}" sẽ bị xoá khỏi hệ thống và không thể khôi phục.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Huỷ</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteSource} disabled={isDeleting}>
              {isDeleting ? "Đang xoá..." : "Xoá"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}


