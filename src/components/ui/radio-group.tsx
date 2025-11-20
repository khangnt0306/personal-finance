import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { motion } from "framer-motion"
import { Circle } from "lucide-react"
import { cn } from "@lib/utils"
import { elevatedTransition } from "../../styles"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "group relative aspect-square h-5 w-5 rounded-full border border-border/60 bg-background/80 backdrop-blur-sm text-primary shadow-soft ring-offset-background transition-all duration-200 ease-sail focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/80 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 hover:scale-110 active:scale-95 data-[state=checked]:border-primary data-[state=checked]:shadow-glow",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-primary/20 before:via-accent/10 before:to-primary/20 before:opacity-0 before:blur-sm before:transition-opacity before:duration-300 data-[state=checked]:before:opacity-100",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={elevatedTransition}
        >
          <Circle className="h-3 w-3 fill-current text-current" />
        </motion.div>
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }

