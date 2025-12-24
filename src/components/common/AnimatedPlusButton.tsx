import { Plus } from "lucide-react"
import { Button } from "@components/ui/button"
import { cn } from "@lib/utils"

interface AnimatedPlusButtonProps {
  label: string
  onClick?: () => void
  className?: string
}

export const AnimatedPlusButton = ({ label, onClick, className }: AnimatedPlusButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className={cn(
        "group p-4 pr-[12px] sm:p-6 sm:pr-[16px] flex justify-center relative overflow-hidden rounded-full bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 border border-sky-200/60 text-sky-700 shadow-md hover:shadow-xl hover:shadow-sky-100/50 hover:border-sky-300 hover:bg-gradient-to-br hover:from-cyan-50/50 hover:via-sky-100/50 hover:to-blue-100/50 transition-all duration-300 hover:px-6 sm:hover:px-8",
        className
      )}
    >
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Plus className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 transition-all duration-500 group-hover:rotate-180 group-hover:scale-110" />
        <p className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-xs group-hover:opacity-100 font-medium text-sm sm:text-base">
          {label}
        </p>
      </div>
    </Button>
  )
}


