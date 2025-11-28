import { Search } from "lucide-react"
import { cn } from "@lib/utils"
import { Input } from "@components/ui/input"
import { Button } from "@components/ui/button"
import type { DataToolbarProps } from "./data-toolbar.props"


export const DataToolbar = ({
  searchPlaceholder = "Search records…",
  searchValue,
  onSearchChange,
  filters,
  actions,
  viewOptions,
  currentView,
  onViewChange,
  className,
}: DataToolbarProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-border/60 bg-white/70 p-3 sm:p-4 shadow-soft backdrop-blur dark:bg-surface-elevated",
        className
      )}
    >
      <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2 sm:gap-3">
          <div className="relative min-w-[200px] sm:min-w-[240px] flex-1">
            <Search className="pointer-events-none absolute left-3 sm:left-4 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchValue}
              onChange={(event) => onSearchChange?.(event.target.value)}
              placeholder={searchPlaceholder}
              className="pl-9 sm:pl-11 text-sm h-9 sm:h-10"
            />
          </div>
          {filters ? <div className="w-full min-[480px]:w-auto">{filters}</div> : null}
        </div>
        {actions ? <div className="flex flex-wrap justify-end gap-1.5 sm:gap-2">{actions}</div> : null}
      </div>
      {viewOptions?.length ? (
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 rounded-full border border-border/60 bg-muted/40 p-0.5 sm:p-1">
          {viewOptions.map((option) => (
            <Button
              key={option.value}
              variant={currentView === option.value ? "default" : "ghost"}
              size="sm"
              className={cn(
                "rounded-full px-3 sm:px-4 text-xs sm:text-sm h-8 sm:h-9",
                currentView === option.value ? "shadow-soft" : "text-muted-foreground"
              )}
              onClick={() => onViewChange?.(option.value)}
            >
              {option.icon ? <span className="mr-1 sm:mr-2 scale-75 sm:scale-100">{option.icon}</span> : null}
              <span className="hidden xs:inline">{option.label}</span>
            </Button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

