import type { ReactNode } from "react"
import { cn } from "@lib/utils"

interface AuthShellProps {
  title: string
  description: string
  eyebrow?: string
  highlights?: string[]
  children: ReactNode
  footer?: ReactNode
  className?: string
}

export const AuthShell = ({
  title,
  description,
  eyebrow = "Aurora Finance",
  highlights = [
    "Bank-grade encryption on every sync",
    "Plan, save, and invest in one place",
    "Mobile-first insights for busy teams",
  ],
  children,
  footer,
  className,
}: AuthShellProps) => {
  return (
    <section
      className={cn(
        "relative min-h-screen overflow-hidden bg-background/95 px-4 py-10 sm:px-8 md:px-12",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-mesh-gradient opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-white/5 dark:from-white/5" />
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-10 rounded-[32px] border border-border/70 bg-white/85 p-6 shadow-2xl backdrop-blur-xl dark:bg-surface-elevated/90 md:flex-row md:p-12">
        <div className="flex flex-1 flex-col justify-center gap-6 text-foreground">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
            {eyebrow}
          </p>
          <div className="space-y-4">
            <h1 className="text-4xl font-display font-semibold leading-tight sm:text-5xl">{title}</h1>
            <p className="text-base text-muted-foreground">{description}</p>
          </div>
          <div className="grid gap-4 text-sm text-muted-foreground/90 sm:grid-cols-2">
            {highlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-center gap-3 rounded-2xl border border-border/50 bg-white/60 p-3 shadow-soft dark:bg-surface-elevated/50"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/10">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </span>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <div className="rounded-3xl border border-border/70 bg-card/90 p-6 shadow-soft backdrop-blur">
            {children}
            {footer ? <div className="mt-6 border-t border-border/60 pt-6 text-center text-sm text-muted-foreground">{footer}</div> : null}
          </div>
        </div>
      </div>
    </section>
  )
}

