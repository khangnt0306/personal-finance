import { motion } from "framer-motion"
import { cn } from "@lib/utils"

function Skeleton({
  className,
  children,
  onDrag,
  onDragStart,
  onDragEnd,
  onAnimationStart,
  onAnimationEnd,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
   
  void onDrag; void onDragStart; void onDragEnd; void onAnimationStart; void onAnimationEnd;
  return (
    <motion.div
      className={cn(
        "rounded-xl bg-muted/40 backdrop-blur-sm border border-border/40 shadow-soft",
        className
      )}
      animate={{
        opacity: [0.4, 0.6, 0.4],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export { Skeleton }

