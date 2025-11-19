import * as React from "react"
import { motion, type MotionProps } from "framer-motion"
import { cn } from "@lib/utils"
import { hoverTransform } from "../../styles"
import { buttonVariants, type ButtonProps } from "./button"

export type MotionButtonProps = ButtonProps & MotionProps

export const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, variant, size, whileHover = hoverTransform.whileHover, whileTap = hoverTransform.whileTap, transition = hoverTransform.transition, ...props }, ref) => (
    <motion.button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      whileHover={whileHover}
      whileTap={whileTap}
      transition={transition}
      {...props}
    />
  )
)
MotionButton.displayName = "MotionButton"

