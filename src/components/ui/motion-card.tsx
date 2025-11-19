import * as React from "react"
import { motion, type MotionProps } from "framer-motion"
import { cn } from "@lib/utils"
import { elevatedTransition, fadeSlide } from "../../styles"

export type MotionCardProps = MotionProps & React.HTMLAttributes<HTMLDivElement>

export const MotionCard = React.forwardRef<HTMLDivElement, MotionCardProps>(
  (
    {
      className,
      variants = fadeSlide,
      initial = "hidden",
      animate = "visible",
      exit = "exit",
      transition = elevatedTransition,
      ...props
    },
    ref
  ) => (
    <motion.div
      ref={ref}
      className={cn(
        "rounded-3xl border border-border/60 bg-card/90 p-0 text-card-foreground shadow-soft backdrop-blur-xl",
        className
      )}
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      {...props}
    />
  )
)
MotionCard.displayName = "MotionCard"

