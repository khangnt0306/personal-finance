import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { cn } from "@lib/utils"
import { fadeSlide, withStagger } from "../../../styles"
import type { PageHeaderProps } from "./page-header.props"

export const PageHeader = ({
  title,
  description,
  breadcrumbs,
  highlights,
  actions,
  className,
  children,
}: PageHeaderProps) => {
  return (
    <motion.section
      variants={withStagger(0.05, 0.05)}
      initial="hidden"
      animate="visible"
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border/60 bg-white/80 p-8 text-foreground shadow-soft backdrop-blur-xl dark:bg-surface-elevated",
        className
      )}
    >
      <div className="absolute inset-px rounded-[calc(1.5rem-2px)] bg-gradient-to-br from-primary/15 via-accent/20 to-transparent opacity-70 blur-2xl" />
      <div className="relative z-10 space-y-8">
        <motion.div variants={fadeSlide} className="space-y-6">
          {breadcrumbs?.length ? (
            <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              {breadcrumbs.map((crumb, index) => (
                <span key={crumb.label} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link
                      to={crumb.href}
                      className="transition-colors hover:text-primary"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 ? (
                    <span className="text-muted-foreground/70">/</span>
                  ) : null}
                </span>
              ))}
            </nav>
          ) : null}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-display font-semibold tracking-tight text-foreground">
                {title}
              </h1>
              {description ? (
                <p className="mt-3 max-w-2xl text-base text-muted-foreground">{description}</p>
              ) : null}
            </div>
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        </motion.div>

        {children}

        {highlights?.length ? (
          <motion.div
            variants={fadeSlide}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {highlights.map((highlight) => (
              <div
                key={highlight.label}
                className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-sm backdrop-blur"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {highlight.label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-foreground">{highlight.value}</p>
                {highlight.helper ? (
                  <p className="text-sm text-muted-foreground">{highlight.helper}</p>
                ) : null}
              </div>
            ))}
          </motion.div>
        ) : null}
      </div>
    </motion.section>
  )
}

