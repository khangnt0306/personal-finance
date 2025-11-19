import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Progress } from "@components/ui/progress"
import { Badge } from "@components/ui/badge"

export interface BudgetDetail {
  id: string
  name: string
  planned: number
  spent: number
  renews: string
  owner: string
}

export const BudgetDetailCard = ({ name, planned, spent, renews, owner }: BudgetDetail) => {
  const usage = Math.min(100, Math.round((spent / planned) * 100))

  return (
    <Card>
      <CardHeader className="gap-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Owner · {owner}</span>
          <Badge variant={usage > 90 ? "destructive" : usage > 70 ? "pastel" : "outline"}>
            {usage}% used
          </Badge>
        </div>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Renews {renews}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold text-white">${spent.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground">out of ${planned.toLocaleString()}</span>
        </div>
        <Progress value={usage} />
      </CardContent>
    </Card>
  )
}
