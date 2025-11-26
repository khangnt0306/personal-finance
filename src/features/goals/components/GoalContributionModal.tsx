import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@components/ui/dialog"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Textarea } from "@components/ui/textarea"

export const GoalContributionModal = () => {
  const [amount, setAmount] = useState("250")
  const [note, setNote] = useState("Payroll sweep")

  const handleSubmit = () => {
     
    console.log({ amount, note })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Thêm khoản đóng góp</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tăng quỹ dự phòng khẩn cấp</DialogTitle>
          <DialogDescription>Tiền sẽ được chuyển ngay lập tức từ tài khoản lãi cao.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <label className="space-y-2 text-sm">
            <span className="text-muted-foreground">Số tiền</span>
            <Input value={amount} onChange={(event) => setAmount(event.target.value)} />
          </label>
          <label className="space-y-2 text-sm">
            <span className="text-muted-foreground">Ghi chú</span>
            <Textarea rows={3} value={note} onChange={(event) => setNote(event.target.value)} />
          </label>
        </div>
        <DialogFooter>
          <Button variant="secondary">Hủy</Button>
          <Button onClick={handleSubmit} className="gap-2">
            Thực hiện chuyển tiền
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
