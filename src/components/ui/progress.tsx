import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-3.5 w-full overflow-hidden rounded-full border border-border/60 bg-muted/60",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-gradient-to-r from-primary via-accent to-primary/80 transition-all duration-300 ease-sail"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
    <span className="pointer-events-none absolute inset-0 rounded-full bg-white/20 opacity-40 mix-blend-soft-light" />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

