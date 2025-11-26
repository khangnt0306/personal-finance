import { useState } from "react"
import { ReportFilters } from "../components/ReportFilters"
import { PeriodComparisonChart } from "../components/PeriodComparisonChart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { DatePicker } from "@components/ui/date-picker"
import { Skeleton } from "@components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion"
import { Info, TrendingUp } from "lucide-react"

const highlights = [
  { label: "Thu nhập", value: "$40,200", helper: "+12% so với quý trước", tooltip: "Tổng thu nhập trong giai đoạn đã chọn" },
  { label: "Chi tiêu", value: "$31,840", helper: "-6% so với quý trước", tooltip: "Tổng chi tiêu trong giai đoạn đã chọn" },
  { label: "Biên lợi nhuận", value: "27%", helper: "+3 điểm", tooltip: "Lợi nhuận ròng trên tổng thu nhập" },
]

export const IncomeExpenseReportPage = () => {
  const [loading] = useState(false)
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Báo cáo</p>
          <h1 className="text-3xl font-semibold text-white">Thu nhập vs chi tiêu</h1>
          <p className="text-muted-foreground">Tạo báo cáo tức thì với các insight được cá nhân hoá.</p>
        </header>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-sm text-muted-foreground mb-2 block">Ngày bắt đầu</label>
            <DatePicker
              date={startDate}
              onDateChange={setStartDate}
              placeholder="Chọn ngày bắt đầu"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm text-muted-foreground mb-2 block">Ngày kết thúc</label>
            <DatePicker
              date={endDate}
              onDateChange={setEndDate}
              placeholder="Chọn ngày kết thúc"
            />
          </div>
        </div>

        <Alert variant="info">
          <TrendingUp className="h-4 w-4" />
          <AlertTitle>Nhận xét nổi bật</AlertTitle>
          <AlertDescription>
            Các xu hướng tài chính đang tăng trưởng tích cực. Hãy xem thêm chi tiết bên dưới.
          </AlertDescription>
        </Alert>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            {highlights.map((highlight) => (
              <Tooltip key={highlight.label}>
                <TooltipTrigger asChild>
                  <Card className="cursor-help">
                    <CardHeader className="pb-2">
                      <CardDescription>{highlight.label}</CardDescription>
                      <CardTitle className="text-3xl text-white">{highlight.value}</CardTitle>
                      <p className="text-sm text-primary">{highlight.helper}</p>
                    </CardHeader>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{highlight.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        )}

        {loading ? (
          <div className="grid gap-6 lg:grid-cols-2">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            <ReportFilters />
            <PeriodComparisonChart />
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Nhận xét</CardTitle>
            <CardDescription>Tự động tổng hợp từ sổ giao dịch</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="insights">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    <span>Xem chi tiết</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>• Chi tiêu ăn uống giảm 11% sau khi áp dụng hạn mức thông minh.</p>
                    <p>• Chỉ số biến động thu nhập thấp nhờ lịch trả lương ổn định.</p>
                    <p>• Phần dư hiện tại có thể hoàn tất mục tiêu tiết kiệm trong 8 tuần.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
