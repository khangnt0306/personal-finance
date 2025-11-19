import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Button } from "@components/ui/button"
import { cn } from "@lib/utils"
import { fadeSlide } from "../../styles"

interface EmptyStateProps {
  title: string
  description?: string
  icon?: ReactNode
  action?: {
    label: string
    onClick: () => void
    variant?: "default" | "secondary" | "outline" | "subtle" | "ghost" | "link" | "destructive" | "glass"
  }
  secondaryAction?: ReactNode
  className?: string
  children?: ReactNode
}

export const EmptyState = ({
  title,
  description,
  icon,
  action,
  secondaryAction,
  children,
  className,
}: EmptyStateProps) => {
  return (
    <motion.div
      variants={fadeSlide}
      initial="hidden"
      animate="visible"
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-border/70 bg-white/70 px-8 py-16 text-center shadow-soft backdrop-blur dark:bg-surface-elevated",
        className
      )}
    >
      {icon ? (
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          {icon}
        </div>
      ) : null}
      <div className="space-y-3">
        <h3 className="text-2xl font-semibold text-foreground">{title}</h3>
        {description ? (
          <p className="max-w-xl text-base text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {action ? (
          <Button variant={action.variant ?? "default"} onClick={action.onClick}>
            {action.label}
          </Button>
        ) : null}
        {secondaryAction}
      </div>
    </motion.div>
  )
}

