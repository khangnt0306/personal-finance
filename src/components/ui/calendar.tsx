import * as React from "react"
import { DayPicker } from "react-day-picker"
import { cn } from "@lib/utils"
import { buttonVariants } from "./button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col items-center space-y-4",
        month: "space-y-4 w-full",
        caption: "flex justify-center pt-1 relative items-center mb-4",
        caption_label: "text-sm font-semibold text-foreground",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 rounded-lg border-border/60 hover:bg-accent/80 transition-all duration-200"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex mb-2",
        head_cell:
          "text-muted-foreground rounded-lg w-9 font-normal text-[0.8rem] flex items-center justify-center",
        row: "flex w-full mt-2",
         cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-lg [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-lg last:[&:has([aria-selected])]:rounded-r-lg focus-within:relative focus-within:z-20",
         day: cn(
          " p-3 shadow-soft font-normal aria-selected:opacity-100 rounded-lg hover:bg-sky-100  transition-all duration-200  text-center w-full "
        ),
        day_range_end: "day-range-end",
        day_selected:
           "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-lg shadow-soft",
         day_today: "bg-accent/60 hover:bg-sky-100 text-accent-foreground font-semibold rounded-lg",
         day_outside:
           "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
         day_disabled: "text-muted-foreground opacity-50",
         day_range_middle:
           "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }

