import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { cn } from "@lib/utils"

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("inline-flex items-center justify-center gap-1", className)}
    {...props}
  />
))
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
      className={cn(
        "group relative inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 ease-sail focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/80 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 data-[state=on]:bg-accent/80 data-[state=on]:text-accent-foreground data-[state=on]:backdrop-blur-sm hover:bg-muted/60 hover:scale-105 active:scale-95",
        className
      )}
    {...props}
  />
))
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }

