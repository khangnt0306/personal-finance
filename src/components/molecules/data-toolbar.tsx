import { Search } from "lucide-react"
import type { ReactNode } from "react"
import { cn } from "@lib/utils"
import { Input } from "@components/ui/input"
import { Button } from "@components/ui/button"

interface ViewOption {
  label: string
  value: string
  icon?: ReactNode
}

interface DataToolbarProps {
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  filters?: ReactNode
  actions?: ReactNode
  viewOptions?: ViewOption[]
  currentView?: string
  onViewChange?: (value: string) => void
  className?: string
}

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
        "flex flex-col gap-4 rounded-2xl border border-border/60 bg-white/70 p-4 shadow-soft backdrop-blur dark:bg-surface-elevated",
        className
      )}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="relative min-w-[240px] flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchValue}
              onChange={(event) => onSearchChange?.(event.target.value)}
              placeholder={searchPlaceholder}
              className="pl-11"
            />
          </div>
          {filters ? <div className="w-full min-[480px]:w-auto">{filters}</div> : null}
        </div>
        {actions ? <div className="flex flex-wrap justify-end gap-2">{actions}</div> : null}
      </div>
      {viewOptions?.length ? (
        <div className="flex flex-wrap items-center gap-2 rounded-full border border-border/60 bg-muted/40 p-1">
          {viewOptions.map((option) => (
            <Button
              key={option.value}
              variant={currentView === option.value ? "default" : "ghost"}
              size="sm"
              className={cn(
                "rounded-full px-4",
                currentView === option.value ? "shadow-soft" : "text-muted-foreground"
              )}
              onClick={() => onViewChange?.(option.value)}
            >
              {option.icon ? <span className="mr-2">{option.icon}</span> : null}
              {option.label}
            </Button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

