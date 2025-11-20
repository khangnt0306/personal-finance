import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

export interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Pick a date",
  disabled = false,
  className,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            "h-10 rounded-xl border-border/60 bg-background/80 backdrop-blur-sm",
            "hover:bg-accent/80 hover:border-border transition-all duration-200",
            "shadow-soft hover:shadow-soft-lg",
            !date && "text-muted-foreground",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
          <span className={cn(date ? "text-foreground" : "text-muted-foreground")}>
            {date ? format(date, "PPP") : placeholder}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0 rounded-2xl border-border/60 bg-popover/95 backdrop-blur-xl shadow-soft-lg overflow-hidden" 
        align="start"
        sideOffset={8}
      >
        <div className="p-1">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            initialFocus
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

