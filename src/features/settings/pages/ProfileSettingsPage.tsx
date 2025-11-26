import { useState } from "react"
import { SecuritySettingsForm } from "../components/SecuritySettingsForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Input } from "@components/ui/input"
import { Button } from "@components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar"
import { Switch } from "@components/ui/switch"
import { Slider } from "@components/ui/slider"
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert"
import { Separator } from "@components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion"
import { Label } from "@components/ui/label"
import { CheckCircle2, Upload } from "lucide-react"

export const ProfileSettingsPage = () => {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [autoSync, setAutoSync] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState([30])
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Cài đặt</p>
        <h1 className="text-3xl font-semibold text-white">Hồ sơ & bảo mật</h1>
        <p className="text-muted-foreground">Tùy chỉnh danh tính tài khoản và bảo vệ môi trường làm việc.</p>
      </header>

      {saved && (
        <Alert variant="success">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Lưu thành công</AlertTitle>
          <AlertDescription>Cài đặt hồ sơ của bạn đã được cập nhật.</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Hồ sơ</CardTitle>
          <CardDescription>Cập nhật tên và thông tin liên hệ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback>JW</AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Tải ảnh lên
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Hỗ trợ JPG, PNG hoặc GIF. Dung lượng tối đa 2MB.</p>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 text-sm">
              <span className="text-muted-foreground">Họ và tên</span>
              <Input defaultValue="Jordan Wells" />
            </label>
            <label className="space-y-1 text-sm">
              <span className="text-muted-foreground">Email</span>
              <Input defaultValue="jordan@aurora.money" />
            </label>
          </div>
          <Button className="w-full sm:w-auto" onClick={handleSave}>Lưu hồ sơ</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tùy chọn</CardTitle>
          <CardDescription>Tùy chỉnh trải nghiệm sử dụng ứng dụng</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="notifications">
              <AccordionTrigger>Cài đặt thông báo</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Thông báo email</Label>
                      <p className="text-sm text-muted-foreground">Nhận cập nhật tài khoản qua email</p>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Thông báo đẩy</Label>
                      <p className="text-sm text-muted-foreground">Nhận cảnh báo tức thì trên thiết bị</p>
                    </div>
                    <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="sync">
              <AccordionTrigger>Đồng bộ dữ liệu</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Tự động đồng bộ</Label>
                      <p className="text-sm text-muted-foreground">Tự đồng bộ dữ liệu giữa các thiết bị</p>
                    </div>
                    <Switch checked={autoSync} onCheckedChange={setAutoSync} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="security">
              <AccordionTrigger>Cài đặt bảo mật</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label className="mb-2 block">Thời gian tự đăng xuất (phút)</Label>
                    <Slider
                      value={sessionTimeout}
                      onValueChange={setSessionTimeout}
                      min={5}
                      max={120}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>5 phút</span>
                      <span className="font-semibold">{sessionTimeout[0]} phút</span>
                      <span>120 phút</span>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <SecuritySettingsForm />
    </div>
  )
}
