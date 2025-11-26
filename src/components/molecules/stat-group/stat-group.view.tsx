import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@lib/utils"
import { fadeSlide, withStagger } from "../../../styles"
import type { StatGroupProps } from "./stat-group.props"

export const StatGroup = ({ items, columns = 3, className }: StatGroupProps) => {
  return (
    <motion.div
      variants={withStagger()}
      initial="hidden"
      animate="visible"
      className={cn(
        "grid gap-4",
        columns === 2 && "md:grid-cols-2",
        columns === 3 && "md:grid-cols-2 xl:grid-cols-3",
        columns === 4 && "md:grid-cols-2 xl:grid-cols-4",
        className
      )}
    >
      {items.map((item) => {
        const deltaPositive = (item.delta ?? 0) >= 0

        return (
          <motion.article
            key={item.id}
            variants={fadeSlide}
            className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-soft backdrop-blur"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{item.label}</p>
                <p className="mt-3 text-3xl font-semibold text-foreground">{item.value}</p>
              </div>
              {item.icon ? (
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {item.icon}
                </div>
              ) : null}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              {item.helper ? <span>{item.helper}</span> : <span />}
              {item.delta !== undefined ? (
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
                    deltaPositive ? "text-emerald-600" : "text-rose-600"
                  )}
                >
                  {deltaPositive ? <ArrowUpRight className="mr-1 h-4 w-4" /> : <ArrowDownRight className="mr-1 h-4 w-4" />}
                  {Math.abs(item.delta).toFixed(1)}%
                </span>
              ) : null}
            </div>
          </motion.article>
        )
      })}
    </motion.div>
  )
}


