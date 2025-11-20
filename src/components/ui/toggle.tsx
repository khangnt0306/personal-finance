import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@lib/utils"

const toggleVariants = cva(
  "group relative inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 ease-sail focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/80 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 data-[state=on]:bg-accent/80 data-[state=on]:text-accent-foreground data-[state=on]:backdrop-blur-sm hover:bg-muted/60 hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-border/60 bg-transparent/80 backdrop-blur-sm hover:bg-accent/60 hover:text-accent-foreground",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-12 rounded-2xl px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size }), className)}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }

