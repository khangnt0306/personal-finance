import * as React from "react"
import { motion } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@lib/utils"
import { fadeSlide, elevatedTransition } from "../../styles"

const alertVariants = cva(
  "relative w-full rounded-2xl border px-4 py-3 text-sm shadow-soft backdrop-blur-xl transition-all duration-300 ease-sail [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background/80 text-foreground border-border/60 hover:shadow-soft-lg",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive bg-destructive/10 backdrop-blur-xl",
        success:
          "border-green-500/50 text-green-700 dark:text-green-400 dark:border-green-500 [&>svg]:text-green-600 dark:[&>svg]:text-green-400 bg-green-50/80 dark:bg-green-950/20 backdrop-blur-xl",
        warning:
          "border-yellow-500/50 text-yellow-700 dark:text-yellow-400 dark:border-yellow-500 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400 bg-yellow-50/80 dark:bg-yellow-950/20 backdrop-blur-xl",
        info:
          "border-primary/50 text-primary dark:border-primary [&>svg]:text-primary bg-primary/10 backdrop-blur-xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, children, onDrag, onDragStart, onDragEnd, onAnimationStart, onAnimationEnd, ...props }, ref) => {
   
  void onDrag; void onDragStart; void onDragEnd; void onAnimationStart; void onAnimationEnd;
  return (
  <motion.div
    ref={ref}
    role="alert"
    variants={fadeSlide}
    initial="hidden"
    animate="visible"
    transition={elevatedTransition}
    className={cn(alertVariants({ variant }), className)}
    {...props}
  >
    {children}
  </motion.div>
  )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }

