import { format as dateFormat, parseISO } from "date-fns"
import { APP_CONFIG } from "@core/config/app.config"

export type Currency = "VND" | "USD" | "EUR"

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  VND: "₫",
  USD: "$",
  EUR: "€",
}

const CURRENCY_LOCALES: Record<Currency, string> = {
  VND: "vi-VN",
  USD: "en-US",
  EUR: "de-DE",
}

/**
 * Format a number as currency with thousand separators
 * @param value - The numeric value to format
 * @param currency - The currency type (VND, USD, EUR)
 * @returns Formatted currency string (e.g., "₫ 100,000,000")
 */
export const formatCurrency = (value: number, currency: Currency | string = "VND"): string => {
  const symbol = CURRENCY_SYMBOLS[currency as Currency] || currency
  const locale = CURRENCY_LOCALES[currency as Currency] || "en-US"
  
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
  }).format(value)
  
  return `${symbol} ${formatted}`
}

export const formatDate = (date: string | Date, format?: string): string => {
  const dateObj = typeof date === "string" ? parseISO(date) : date
  return dateFormat(dateObj, format || APP_CONFIG.dateFormat)
}

/**
 * Format a number with thousand separators (no currency symbol)
 * @param value - The numeric value to format
 * @param locale - The locale to use for formatting (default: "en-US")
 * @returns Formatted number string (e.g., "100,000,000")
 */
export const formatNumber = (value: number, locale: string = "en-US"): string => {
  if (!value && value !== 0) return ""
  
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
  }).format(value)
}

/**
 * Parse a formatted number string to a numeric value
 * Removes all non-digit characters except decimal point
 * @param value - The formatted string to parse (e.g., "100,000,000")
 * @returns Numeric value
 */
export const parseFormattedNumber = (value: string): number => {
  // Remove all non-digit characters except decimal point
  const cleaned = value.replace(/[^\d.]/g, "")
  return parseFloat(cleaned) || 0
}

/**
 * Format a number as percentage
 * @param value - The numeric value (0-100)
 * @returns Formatted percentage string (e.g., "50%")
 */
export const formatPercentage = (value: number): string => {
  return `${value}%`
}

