import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@components/ui/button"

export const ActionReminderBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-r from-primary/25 via-accent/25 to-transparent p-6 text-white">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary-foreground/80">Reminder</p>
          <h3 className="text-2xl font-semibold">Fund the sabbatical goal before March 20</h3>
          <p className="text-sm text-white/70">Send $1,400 from High-yield reserve to stay on schedule.</p>
        </div>
        <Button variant="secondary" className="w-full justify-center gap-2 bg-white/20 text-white md:w-auto">
          <Sparkles className="h-4 w-4" /> Auto transfer
        </Button>
      </div>
      <ArrowRight className="absolute -right-6 top-1/2 h-24 w-24 -translate-y-1/2 text-white/10" />
    </div>
  )
}
