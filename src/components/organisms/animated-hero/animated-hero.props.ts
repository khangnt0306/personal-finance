import type { ReactNode } from "react"

export interface AnimatedHeroProps {
  title: string
  subtitle: string
  ctaLabel: string
  onCtaClick?: () => void
  prefix?: ReactNode
}


