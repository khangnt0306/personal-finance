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
    title: "Quỹ dự phòng khẩn cấp",
    target: 25000,
    current: 18200,
    deadline: "2025-08-01",
    description: "Xây dựng quỹ dự phòng đủ chi trả 6 tháng chi phí sinh hoạt",
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
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Mục tiêu</p>
          <h1 className="text-3xl font-semibold text-white">{goal.title}</h1>
          <p className="text-muted-foreground">{goal.description}</p>
        </header>
      </div>

      {daysRemaining < 30 && daysRemaining > 0 && (
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Sắp tới hạn</AlertTitle>
          <AlertDescription>
            Chỉ còn {daysRemaining} ngày để hoàn thành mục tiêu. Hãy cân nhắc tăng mức đóng góp.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tổng quan tiến độ</CardTitle>
            <CardDescription>Trạng thái hiện tại và số tiền còn thiếu</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Tiến độ</span>
                <span className="font-semibold">{percentage.toFixed(1)}%</span>
              </div>
              <Progress value={percentage} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Hiện có</p>
                <p className="text-2xl font-bold">{formatCurrency(goal.current)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mục tiêu</p>
                <p className="text-2xl font-bold">{formatCurrency(goal.target)}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Còn thiếu</p>
              <p className="text-xl font-semibold">{formatCurrency(remaining)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chi tiết mục tiêu</CardTitle>
            <CardDescription>Quản lý thông tin và cài đặt</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Hạn hoàn thành</label>
              <DatePicker
                date={deadline}
                onDateChange={setDeadline}
                placeholder="Chọn hạn hoàn thành"
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Số ngày còn lại</p>
              <p className="text-xl font-semibold">{daysRemaining > 0 ? daysRemaining : "Đã quá hạn"}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lịch sử đóng góp</CardTitle>
          <CardDescription>Theo dõi các khoản đóng góp theo thời gian</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="history">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span>Xem dòng thời gian đóng góp</span>
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

