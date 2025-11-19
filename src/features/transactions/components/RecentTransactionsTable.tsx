import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table"
import { Badge } from "@components/ui/badge"

const sampleTransactions = [
  { id: "txn-01", merchant: "Notion Labs", category: "Workflows", amount: -48, date: "Mar 02", status: "cleared" },
  { id: "txn-02", merchant: "Stripe Payout", category: "Income", amount: 2100, date: "Mar 01", status: "settled" },
  { id: "txn-03", merchant: "Blue Bottle Coffee", category: "Dining", amount: -18, date: "Feb 28", status: "pending" },
  { id: "txn-04", merchant: "Delta Airlines", category: "Travel", amount: -420, date: "Feb 25", status: "cleared" },
  { id: "txn-05", merchant: "Coinbase", category: "Investments", amount: 650, date: "Feb 24", status: "cleared" },
]

const statusTone: Record<string, string> = {
  cleared: "text-emerald-400",
  settled: "text-indigo-400",
  pending: "text-amber-300",
}

export const RecentTransactionsTable = () => (
  <div className="rounded-3xl border border-border/60 bg-card/70 p-4">
    <Table>
      <TableCaption className="text-left text-xs uppercase tracking-wide text-muted-foreground">
        Last synchronized: 5 minutes ago
      </TableCaption>
      <TableHeader>
        <TableRow className="bg-white/5">
          <TableHead>Merchant</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleTransactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium text-white">{transaction.merchant}</span>
                <span className="text-xs text-muted-foreground">{transaction.date}</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline" className="text-xs capitalize text-muted-foreground">
                {transaction.category}
              </Badge>
            </TableCell>
            <TableCell className="text-right font-semibold">
              <span className={transaction.amount >= 0 ? "text-emerald-400" : "text-rose-400"}>
                {transaction.amount >= 0 ? "+" : "-"}${Math.abs(transaction.amount)}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <span className={`inline-flex items-center justify-end gap-1 text-sm font-medium ${statusTone[transaction.status]}`}>
                {transaction.amount >= 0 ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                {transaction.status}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
)
