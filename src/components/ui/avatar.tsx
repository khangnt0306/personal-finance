import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { motion } from "framer-motion"
import { cn } from "@lib/utils"
import { hoverTransform, fadeSlide, elevatedTransition } from "../../styles"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "group relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border/60 bg-muted/80 backdrop-blur-sm shadow-soft transition-all duration-300 ease-sail hover:shadow-soft-lg hover:-translate-y-0.5",
      "before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-primary/20 before:via-accent/10 before:to-primary/20 before:opacity-0 before:blur-sm before:transition-opacity before:duration-300 group-hover:before:opacity-100",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <motion.div
    initial={{ scale: 1.1, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={elevatedTransition}
    className="h-full w-full"
  >
    <AvatarPrimitive.Image
      ref={ref}
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    />
  </motion.div>
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <motion.div
    variants={fadeSlide}
    initial="hidden"
    animate="visible"
    transition={elevatedTransition}
    className="h-full w-full"
  >
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted/80 backdrop-blur-sm text-sm font-semibold text-muted-foreground",
        className
      )}
      {...props}
    />
  </motion.div>
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }

