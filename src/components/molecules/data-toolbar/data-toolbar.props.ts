import type { ReactNode } from "react"

 export interface ViewOption {
    label: string
    value: string
    icon?: ReactNode
  }
  
  export interface DataToolbarProps {
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
  