import { useParams } from "react-router-dom"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Progress } from "@components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion"
import { DatePicker } from "@components/ui/date-picker"
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert"
import { Button } from "@components/ui/button"
import { ArrowLeft, Target, AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { formatCurrency } from "@core/utils/format"
import { parseISO } from "date-fns"

export const GoalDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [deadline, setDeadline] = useState<Date | undefined>(parseISO("2025-08-01"))

  // Mock data - in real app, fetch by id
  const goal = {
    id: id || "goal-1",
    title: "Emergency reserve",
    target: 25000,
    current: 18200,
    deadline: "2025-08-01",
    description: "Building an emergency fund to cover 6 months of expenses",
  }

  const percentage = (goal.current / goal.target) * 100
  const remaining = goal.target - goal.current
  const daysRemaining = deadline ? Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/goals")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <header className="space-y-2 flex-1">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Goals</p>
          <h1 className="text-3xl font-semibold text-white">{goal.title}</h1>
          <p className="text-muted-foreground">{goal.description}</p>
        </header>
      </div>

      {daysRemaining < 30 && daysRemaining > 0 && (
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Deadline Approaching</AlertTitle>
          <AlertDescription>
            Only {daysRemaining} days remaining to reach your goal. Consider increasing your contribution rate.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Progress Overview</CardTitle>
            <CardDescription>Current status and remaining amount</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold">{percentage.toFixed(1)}%</span>
              </div>
              <Progress value={percentage} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Current</p>
                <p className="text-2xl font-bold">{formatCurrency(goal.current)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Target</p>
                <p className="text-2xl font-bold">{formatCurrency(goal.target)}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className="text-xl font-semibold">{formatCurrency(remaining)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goal Details</CardTitle>
            <CardDescription>Manage your goal settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Deadline</label>
              <DatePicker
                date={deadline}
                onDateChange={setDeadline}
                placeholder="Select deadline"
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Days Remaining</p>
              <p className="text-xl font-semibold">{daysRemaining > 0 ? daysRemaining : "Overdue"}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contribution History</CardTitle>
          <CardDescription>Track your contributions over time</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="history">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span>View contribution timeline</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Jan 2025</span>
                    <span className="font-semibold">+$2,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Feb 2025</span>
                    <span className="font-semibold">+$1,800</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mar 2025</span>
                    <span className="font-semibold">+$2,200</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

