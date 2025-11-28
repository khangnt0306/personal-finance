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
        "relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/60 bg-white/80 p-4 sm:p-6 lg:p-8 text-foreground shadow-soft backdrop-blur-xl dark:bg-surface-elevated",
        className
      )}
    >
      <div className="absolute inset-px rounded-[calc(1rem-2px)] sm:rounded-[calc(1.5rem-2px)] bg-gradient-to-br from-primary/15 via-accent/20 to-transparent opacity-70 blur-2xl" />
      <div className="relative z-10 space-y-4 sm:space-y-6 lg:space-y-8">
        <motion.div variants={fadeSlide} className="space-y-4 sm:space-y-6">
          {breadcrumbs?.length ? (
            <nav className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
              {breadcrumbs.map((crumb, index) => (
                <span key={crumb.label} className="flex items-center gap-1.5 sm:gap-2">
                  {crumb.href ? (
                    <Link
                      to={crumb.href}
                      className="transition-colors hover:text-primary truncate"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="truncate">{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 ? (
                    <span className="text-muted-foreground/70">/</span>
                  ) : null}
                </span>
              ))}
            </nav>
          ) : null}
          <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold tracking-tight text-foreground truncate">
                {title}
              </h1>
              {description ? (
                <p className="mt-2 sm:mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground line-clamp-2">{description}</p>
              ) : null}
            </div>
            {actions ? <div className="flex flex-wrap gap-2 sm:gap-3">{actions}</div> : null}
          </div>
        </motion.div>

        {children}

        {highlights?.length ? (
          <motion.div
            variants={fadeSlide}
            className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4"
          >
            {highlights.map((highlight) => (
              <div
                key={highlight.label}
                className="rounded-xl sm:rounded-2xl border border-border/70 bg-card/80 p-3 sm:p-4 shadow-sm backdrop-blur"
              >
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-muted-foreground truncate">
                  {highlight.label}
                </p>
                <p className="mt-1.5 sm:mt-2 text-lg sm:text-xl lg:text-2xl font-semibold text-foreground truncate">{highlight.value}</p>
                {highlight.helper ? (
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">{highlight.helper}</p>
                ) : null}
              </div>
            ))}
          </motion.div>
        ) : null}
      </div>
    </motion.section>
  )
}

