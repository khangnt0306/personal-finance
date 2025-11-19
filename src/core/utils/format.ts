import { format as dateFormat, parseISO } from "date-fns"
import { APP_CONFIG } from "@core/config/app.config"

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount)
}

export const formatDate = (date: string | Date, format?: string): string => {
  const dateObj = typeof date === "string" ? parseISO(date) : date
  return dateFormat(dateObj, format || APP_CONFIG.dateFormat)
}

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("vi-VN").format(value)
}

