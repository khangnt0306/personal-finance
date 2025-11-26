import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { DatePicker } from "@components/ui/date-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/tooltip"
import { Info } from "lucide-react"
import { formatCurrency } from "@core/utils/format"

export const SpendingAnalysisPage = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())

  const categories = [
    { name: "Food & Dining", amount: 1250, percentage: 35 },
    { name: "Shopping", amount: 890, percentage: 25 },
    { name: "Transportation", amount: 450, percentage: 13 },
    { name: "Entertainment", amount: 320, percentage: 9 },
    { name: "Bills & Utilities", amount: 650, percentage: 18 },
  ]

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Báo cáo</p>
          <h1 className="text-3xl font-semibold text-white">Phân tích chi tiêu</h1>
          <p className="text-muted-foreground">Đào sâu các mô hình và xu hướng chi tiêu của bạn.</p>
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

        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="categories">Theo danh mục</TabsTrigger>
            <TabsTrigger value="trends">Xu hướng</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tổng chi tiêu</CardTitle>
                <CardDescription>Khoảng thời gian: {startDate?.toLocaleDateString()} - {endDate?.toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{formatCurrency(3560)}</div>
                <p className="text-sm text-muted-foreground mt-2">Trung bình mỗi ngày: {formatCurrency(118.67)}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Chi tiêu theo danh mục</CardTitle>
                <CardDescription>Phân bổ chi tiết theo từng nhóm</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {categories.map((category, index) => (
                    <AccordionItem key={index} value={`category-${index}`}>
                      <AccordionTrigger>
                        <div className="flex items-center justify-between w-full pr-4">
                          <span>{category.name}</span>
                          <div className="flex items-center gap-4">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="text-sm font-semibold">{formatCurrency(category.amount)}</span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{category.percentage}% tổng chi tiêu</p>
                              </TooltipContent>
                            </Tooltip>
                            <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>• {category.amount} giao dịch trong danh mục này</p>
                          <p>• Giao dịch trung bình: {formatCurrency(Number((category.amount / 10).toFixed(2)))}</p>
                          <p>• Nhà cung cấp nổi bật: Ví dụ Merchant</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Xu hướng chi tiêu</CardTitle>
                <CardDescription>So sánh theo tháng và mô hình biến động</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tháng này</span>
                    <span className="font-semibold">{formatCurrency(3560)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tháng trước</span>
                    <span className="font-semibold">{formatCurrency(3240)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Chênh lệch</span>
                    <span className="font-semibold text-green-600">+9.9%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              <CardTitle>Gợi ý</CardTitle>
            </div>
            <CardDescription>Gợi ý tối ưu chi tiêu</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Chi tiêu Ăn uống tăng 15% trong tháng này</p>
            <p>• Hãy cân nhắc đặt ngân sách cho danh mục Mua sắm để kiểm soát tốt hơn</p>
            <p>• Chi phí Di chuyển đang thấp hơn trung bình – rất tốt!</p>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}

