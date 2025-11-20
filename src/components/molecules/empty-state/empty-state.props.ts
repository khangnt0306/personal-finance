import type { ReactNode } from "react"

export interface EmptyStateProps {
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