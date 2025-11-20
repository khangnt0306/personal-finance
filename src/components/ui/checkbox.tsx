import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@lib/utils"
import { elevatedTransition } from "../../styles"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer group relative h-5 w-5 shrink-0 rounded-lg border border-border/60 bg-background/80 backdrop-blur-sm shadow-soft ring-offset-background transition-all duration-200 ease-sail focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/80 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary data-[state=checked]:shadow-glow hover:scale-105 active:scale-95",
      "before:pointer-events-none before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-primary/20 before:via-accent/10 before:to-primary/20 before:opacity-0 before:blur-sm before:transition-opacity before:duration-300 data-[state=checked]:before:opacity-100",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={elevatedTransition}
      >
        <Check className="h-4 w-4" />
      </motion.div>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

