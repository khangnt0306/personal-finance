import { useState, useMemo } from "react"
import { GoalContributionModal } from "../components/GoalContributionModal"
import { GoalProgressCard } from "../components/GoalProgressCard"
import { Skeleton } from "@components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion"
import { Progress } from "@components/ui/progress"
import { Slider } from "@components/ui/slider"
import { DatePicker } from "@components/ui/date-picker"
import { Target } from "lucide-react"
import { formatCurrency } from "@core/utils/format"
import { parseISO } from "date-fns"

const goals = [
  { id: "goal-1", title: "Quỹ dự phòng khẩn cấp", target: 25000, current: 18200, deadline: "2025-08-01" },
  { id: "goal-2", title: "Quỹ nghỉ phép dài hạn", target: 12000, current: 6400, deadline: "2026-01-01" },
  { id: "goal-3", title: "Thiết lập studio mới", target: 5800, current: 2100, deadline: "2025-10-01" },
]

export const GoalsPage = () => {
  const [loading] = useState(false)

  const milestones = useMemo(() => {
    return goals.filter((goal) => {
      const percentage = (goal.current / goal.target) * 100
      return percentage >= 50 && percentage < 100
    })
  }, [])

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Mục tiêu</p>
        <h1 className="text-3xl font-semibold text-white">Tài trợ cho những quyết định táo bạo</h1>
        <p className="text-muted-foreground">Đồng bộ khoản đóng góp với dòng tiền lương và tự điều chỉnh khi dự báo thay đổi.</p>
      </header>

      {milestones.length > 0 && (
        <Alert variant="success">
          <Target className="h-4 w-4" />
          <AlertTitle>Cột mốc đạt được</AlertTitle>
          <AlertDescription>
            Có {milestones.length} mục tiêu đã đạt từ 50% tiến độ trở lên!
          </AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => {
              const percentage = (goal.current / goal.target) * 100
              return (
                <Accordion key={goal.id} type="single" collapsible className="w-full">
                  <AccordionItem value={goal.id} className="border-none">
                    <div className="space-y-4">
                      <GoalProgressCard {...goal} />
                      <AccordionTrigger className="py-2">
                        <span className="text-sm text-muted-foreground">Xem chi tiết</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-4">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-muted-foreground">Tiến độ</span>
                              <span className="font-semibold">{percentage.toFixed(1)}%</span>
                            </div>
                            <Progress value={percentage} />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-muted-foreground">Điều chỉnh mục tiêu</span>
                              <span className="font-semibold">{formatCurrency(goal.target)}</span>
                            </div>
                            <Slider
                              value={[goal.target]}
                              onValueChange={(value) => {
                                // In a real app, this would update the goal
                                console.log("Cập nhật mục tiêu thành", value[0])
                              }}
                              min={0}
                              max={goal.target * 2}
                              step={100}
                              className="w-full"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-muted-foreground mb-2 block">Hạn hoàn thành</label>
                            <DatePicker
                              date={goal.deadline ? parseISO(goal.deadline) : undefined}
                              onDateChange={(date) => {
                                // In a real app, this would update the goal deadline
                                console.log("Cập nhật hạn hoàn thành thành", date)
                              }}
                              placeholder="Chọn hạn hoàn thành"
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </div>
                  </AccordionItem>
                </Accordion>
              )
            })}
          </div>
          <div className="max-w-md">
            <GoalContributionModal />
          </div>
        </>
      )}
    </div>
  )
}
