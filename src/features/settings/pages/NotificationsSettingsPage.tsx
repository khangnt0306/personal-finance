import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Switch } from "@components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion"
import { Separator } from "@components/ui/separator"
import { Label } from "@components/ui/label"
import { Button } from "@components/ui/button"
import { CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert"

export const NotificationsSettingsPage = () => {
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [pushEnabled, setPushEnabled] = useState(false)
  const [smsEnabled, setSmsEnabled] = useState(false)
  const [budgetAlerts, setBudgetAlerts] = useState(true)
  const [transactionAlerts, setTransactionAlerts] = useState(true)
  const [goalAlerts, setGoalAlerts] = useState(true)
  const [frequency, setFrequency] = useState("realtime")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Cài đặt</p>
        <h1 className="text-3xl font-semibold text-white">Thông báo</h1>
        <p className="text-muted-foreground">Quản lý cách thức và thời điểm bạn nhận cảnh báo.</p>
      </header>

      {saved && (
        <Alert variant="success">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Đã lưu cài đặt</AlertTitle>
          <AlertDescription>Tùy chọn thông báo đã được cập nhật.</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Kênh thông báo</CardTitle>
          <CardDescription>Chọn cách thức nhận thông báo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="channels">
              <AccordionTrigger>Cài đặt kênh</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Thông báo email</Label>
                      <p className="text-sm text-muted-foreground">Nhận thông báo qua email</p>
                    </div>
                    <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Thông báo đẩy</Label>
                      <p className="text-sm text-muted-foreground">Nhận thông báo tức thời trên thiết bị</p>
                    </div>
                    <Switch checked={pushEnabled} onCheckedChange={setPushEnabled} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Thông báo SMS</Label>
                      <p className="text-sm text-muted-foreground">Nhận cảnh báo qua tin nhắn</p>
                    </div>
                    <Switch checked={smsEnabled} onCheckedChange={setSmsEnabled} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Loại cảnh báo</CardTitle>
          <CardDescription>Cài đặt các sự kiện kích hoạt thông báo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Cảnh báo ngân sách</Label>
              <p className="text-sm text-muted-foreground">Thông báo khi vượt hoặc sắp chạm giới hạn</p>
            </div>
            <Switch checked={budgetAlerts} onCheckedChange={setBudgetAlerts} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Cảnh báo giao dịch</Label>
              <p className="text-sm text-muted-foreground">Nhận thông báo khi có giao dịch lớn hoặc bất thường</p>
            </div>
            <Switch checked={transactionAlerts} onCheckedChange={setTransactionAlerts} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Cảnh báo mục tiêu</Label>
              <p className="text-sm text-muted-foreground">Nhận cập nhật về tiến độ và cột mốc mục tiêu</p>
            </div>
            <Switch checked={goalAlerts} onCheckedChange={setGoalAlerts} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tần suất thông báo</CardTitle>
          <CardDescription>Bạn muốn nhận thông báo bao lâu một lần?</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={frequency} onValueChange={setFrequency}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="realtime" id="realtime" />
              <Label htmlFor="realtime" className="cursor-pointer">
                Tức thời – nhận ngay lập tức
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily" className="cursor-pointer">
                Tổng hợp hằng ngày – 1 lần/ngày
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly" className="cursor-pointer">
                Tổng hợp hằng tuần – 1 lần/tuần
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Lưu tùy chọn</Button>
      </div>
    </div>
  )
}

