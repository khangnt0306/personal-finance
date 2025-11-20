import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { motion } from "framer-motion"
import { cn } from "@lib/utils"
import { elevatedTransition } from "../../styles"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer group relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-input/40 backdrop-blur-sm shadow-soft transition-all duration-200 ease-sail focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:shadow-glow hover:scale-105 active:scale-95",
      "before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-primary/20 before:via-accent/10 before:to-primary/20 before:opacity-0 before:blur-sm before:transition-opacity before:duration-300 data-[state=checked]:before:opacity-100",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background/90 backdrop-blur-sm shadow-soft-lg ring-0 transition-transform duration-200 ease-sail data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }

