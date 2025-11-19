import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@lib/utils"

export interface TimelineItem {
  id: string
  title: string
  description: string
  timestamp: string
  status: "success" | "warning" | "info"
  icon?: ReactNode
}

interface ActivityTimelineProps {
  items: TimelineItem[]
}

const statusColors: Record<TimelineItem["status"], string> = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  info: "bg-sky-500",
}

export const ActivityTimeline = ({ items }: ActivityTimelineProps) => {
  return (
    <ol className="relative border-l border-muted-foreground/20 pl-6">
      {items.map((item, index) => (
        <motion.li
          key={item.id}
          className="mb-8 ml-2"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.08 }}
        >
          <span
            className={cn(
              "absolute -left-[27px] flex h-5 w-5 items-center justify-center rounded-full border-2 border-background text-white",
              statusColors[item.status]
            )}
          >
            {item.icon}
          </span>
          <div className="flex items-center justify-between">
            <h4 className="text-base font-semibold">{item.title}</h4>
            <time className="text-sm text-muted-foreground">{item.timestamp}</time>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
        </motion.li>
      ))}
    </ol>
  )
}

