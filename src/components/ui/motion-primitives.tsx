import * as React from "react"
import type { JSX } from "react"
import { motion, type MotionProps } from "framer-motion"
import { fadeSlide, withStagger, elevatedTransition } from "../../styles"
import { cn } from "@lib/utils"

type ElementType = keyof JSX.IntrinsicElements

const motionElementMap = motion as unknown as Record<string, typeof motion.div>

interface MotionContainerProps extends MotionProps {
  as?: ElementType
  className?: string
  children?: React.ReactNode
}

export const MotionContainer = React.forwardRef<HTMLElement, MotionContainerProps>(
  ({ as = "div", className, children, ...props }, ref) => {
    const Component = motionElementMap[as] ?? motion.div
    return (
      <Component
        ref={ref as never}
        className={className}
        variants={fadeSlide}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={props.transition ?? elevatedTransition}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
MotionContainer.displayName = "MotionContainer"

interface MotionListProps extends MotionProps {
  as?: "ul" | "ol" | "div"
  className?: string
  children?: React.ReactNode
  staggerDelay?: number
  staggerChildren?: number
}

export const MotionList = React.forwardRef<HTMLElement, MotionListProps>(
  (
    {
      as = "div",
      className,
      children,
      staggerDelay = 0.06,
      staggerChildren = 0.04,
      ...props
    },
    ref
  ) => {
    const Component = motionElementMap[as] ?? motion.div
    return (
      <Component
        ref={ref as never}
        className={className}
        variants={withStagger(staggerDelay, staggerChildren)}
        initial="hidden"
        animate="visible"
        exit="exit"
        {...props}
      >
        {children}
      </Component>
    )
  }
)
MotionList.displayName = "MotionList"

interface MotionListItemProps extends MotionProps {
  className?: string
  children?: React.ReactNode
  rounded?: boolean
}

export const MotionListItem = React.forwardRef<HTMLDivElement, MotionListItemProps>(
  ({ className, children, rounded = true, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(rounded && "rounded-2xl", className)}
      variants={fadeSlide}
      {...props}
    >
      {children}
    </motion.div>
  )
)
MotionListItem.displayName = "MotionListItem"

