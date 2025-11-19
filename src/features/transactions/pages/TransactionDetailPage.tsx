import { useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Badge } from "@components/ui/badge"
import { Button } from "@components/ui/button"
import { formatCurrency, formatDate } from "@core/utils/format"
import { transactionService } from "../services/transaction.service"

export const TransactionDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const transaction = useMemo(() => (id ? transactionService.getById(id) : null), [id])

  if (!id || !transaction) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction not found</CardTitle>
          <CardDescription>The requested transaction could not be located.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline">
            <Link to="/transactions">Back to transactions</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link to="/transactions">&larr; Back to transactions</Link>
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>{transaction.description}</CardTitle>
              <CardDescription>{formatDate(transaction.date)}</CardDescription>
            </div>
            <Badge variant={transaction.type === "income" ? "default" : "secondary"}>{transaction.type}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-3xl font-semibold">{formatCurrency(transaction.amount)}</div>
          <dl className="grid gap-4 md:grid-cols-2">
            <div>
              <dt className="text-sm text-muted-foreground">Category</dt>
              <dd className="text-base font-medium">{transaction.categoryId}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Created</dt>
              <dd className="text-base font-medium">{formatDate(transaction.createdAt)}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Updated</dt>
              <dd className="text-base font-medium">{formatDate(transaction.updatedAt)}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">ID</dt>
              <dd className="text-base font-mono">{transaction.id}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}

