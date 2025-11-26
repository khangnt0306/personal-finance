import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Badge } from "@components/ui/badge"
import { Wallet } from "lucide-react"
import { formatCurrency } from "@core/utils/format"

export interface BankAccountCardProps {
  id: string
  name: string
  institution: string
  balance: number
  lastSync: string
  status: "healthy" | "syncing" | "attention"
}

const statusLabel: Record<BankAccountCardProps["status"], string> = {
  healthy: "Đã đồng bộ",
  syncing: "Đang đồng bộ",
  attention: "Cần xử lý",
}

const statusTone: Record<BankAccountCardProps["status"], string> = {
  healthy: "bg-emerald-500/10 text-emerald-300",
  syncing: "bg-amber-500/10 text-amber-200",
  attention: "bg-rose-500/10 text-rose-300",
}

export const BankAccountCard = ({ name, institution, balance, lastSync, status }: BankAccountCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wide">
            <Wallet className="h-3.5 w-3.5" /> {institution}
          </span>
          <Badge className={statusTone[status]} variant="outline">
            {statusLabel[status]}
          </Badge>
        </div>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Đồng bộ lần cuối {lastSync}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold text-white">{formatCurrency(balance)}</p>
      </CardContent>
    </Card>
  )
}
