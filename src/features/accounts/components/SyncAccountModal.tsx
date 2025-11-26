import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"

export const SyncAccountModal = () => {
  const [institution, setInstitution] = useState("Mercury")
  const [nickname, setNickname] = useState("Operating account")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full sm:w-auto">
          Đồng bộ tài khoản mới
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Liên kết ngân hàng</DialogTitle>
          <DialogDescription>Kết nối an toàn chỉ trong vài giây.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <label className="space-y-1 text-sm">
            <span className="text-muted-foreground">Tên ngân hàng</span>
            <Input value={institution} onChange={(event) => setInstitution(event.target.value)} />
          </label>
          <label className="space-y-1 text-sm">
            <span className="text-muted-foreground">Ghi nhớ</span>
            <Input value={nickname} onChange={(event) => setNickname(event.target.value)} />
          </label>
        </div>
        <DialogFooter>
          <Button variant="secondary">Hủy</Button>
          <Button>Tiếp tục</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
