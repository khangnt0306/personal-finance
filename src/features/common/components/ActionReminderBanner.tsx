import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@components/ui/button"

export const ActionReminderBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-r from-primary/25 via-accent/25 to-transparent p-6 text-white">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary-foreground/80">Nhắc nhở</p>
          <h3 className="text-2xl font-semibold">Bổ sung mục tiêu nghỉ phép trước 20/03</h3>
          <p className="text-sm text-white/70">Chuyển 1.400$ từ quỹ sinh lời cao để giữ đúng tiến độ.</p>
        </div>
        <Button variant="secondary" className="w-full justify-center gap-2 bg-white/20 text-white md:w-auto">
          <Sparkles className="h-4 w-4" /> Tự động chuyển
        </Button>
      </div>
      <ArrowRight className="absolute -right-6 top-1/2 h-24 w-24 -translate-y-1/2 text-white/10" />
    </div>
  )
}
