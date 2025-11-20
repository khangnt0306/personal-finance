import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { motion } from "framer-motion"
import { cn } from "@lib/utils"
import { fadeSlide, elevatedTransition } from "../../styles"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <motion.div
      variants={fadeSlide}
      initial="hidden"
      animate="visible"
      transition={elevatedTransition}
    >
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0 bg-border/40 backdrop-blur-sm",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          className
        )}
        {...props}
      />
    </motion.div>
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }

