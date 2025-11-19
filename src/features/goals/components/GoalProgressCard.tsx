import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Progress } from "@components/ui/progress"
import { Button } from "@components/ui/button"
import { Coins } from "lucide-react"

export interface GoalProgressCardProps {
  id: string
  title: string
  target: number
  current: number
  deadline: string
}

export const GoalProgressCard = ({ title, target, current, deadline }: GoalProgressCardProps) => {
  const progress = Math.min(100, Math.round((current / target) * 100))

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Coins className="h-4 w-4" /> Goal
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Target ${target.toLocaleString()} · by {deadline}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-white">${current.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">funded</span>
          </div>
          <Progress value={progress} />
          <p className="mt-2 text-xs uppercase tracking-wide text-primary">{progress}% locked in</p>
        </div>
        <Button variant="secondary" className="w-full">
          Boost contribution
        </Button>
      </CardContent>
    </Card>
  )
}
