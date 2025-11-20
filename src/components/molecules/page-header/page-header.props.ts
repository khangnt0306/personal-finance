import type { ReactNode } from "react"

 export interface Breadcrumb {
    label: string
    href?: string
  }
  
  export interface Highlight {
    label: string
    value: string
    helper?: string
  }
  
  export interface PageHeaderProps {
    title: string
    description?: string
    breadcrumbs?: Breadcrumb[]
    highlights?: Highlight[]
    actions?: ReactNode
    className?: string
    children?: ReactNode
  }