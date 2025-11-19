import { Bell, CheckCircle2, Info, AlertTriangle } from "lucide-react"
import { Badge } from "@components/ui/badge"

const notifications = [
  { id: "ntf-1", title: "Budget 80%", message: "Lifestyle budget hit 80% of allocation.", type: "alert" as const, time: "2m ago" },
  { id: "ntf-2", title: "Sync restored", message: "Mercury connection re-synced.", type: "success" as const, time: "1h ago" },
  { id: "ntf-3", title: "Weekly insights", message: "Your spending velocity slowed by 9% week over week.", type: "info" as const, time: "Yesterday" },
]

const iconMap = {
  alert: AlertTriangle,
  success: CheckCircle2,
  info: Info,
}

const badgeTone = {
  alert: "bg-rose-500/10 text-rose-200",
  success: "bg-emerald-500/10 text-emerald-200",
  info: "bg-sky-500/10 text-sky-200",
}

export const NotificationsPanel = () => (
  <div className="rounded-3xl border border-border/60 bg-card/70 p-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
        <Bell className="h-4 w-4" /> Pulse center
      </div>
      <Badge variant="outline" className="text-xs">{notifications.length} updates</Badge>
    </div>
    <div className="mt-4 space-y-3">
      {notifications.map((notification) => {
        const Icon = iconMap[notification.type]
        return (
          <div key={notification.id} className="flex gap-4 rounded-2xl border border-border/40 bg-muted/10 p-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${badgeTone[notification.type]}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{notification.title}</p>
              <p className="text-sm text-muted-foreground">{notification.message}</p>
              <p className="text-xs text-muted-foreground/70">{notification.time}</p>
            </div>
          </div>
        )
      })}
    </div>
  </div>
)
