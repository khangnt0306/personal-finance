import type { Transaction, Category, Budget } from "@core/types"
import { storageAdapter } from "./storage.adapter"
import { APP_CONFIG } from "@core/config/app.config"

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

const defaultCategories: Category[] = [
  {
    id: "cat-1",
    name: "Salary",
    type: "income",
    icon: "💰",
    color: "#10b981",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cat-2",
    name: "Freelance",
    type: "income",
    icon: "💼",
    color: "#3b82f6",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cat-3",
    name: "Food & Dining",
    type: "expense",
    icon: "🍔",
    color: "#ef4444",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cat-4",
    name: "Transportation",
    type: "expense",
    icon: "🚗",
    color: "#f59e0b",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cat-5",
    name: "Shopping",
    type: "expense",
    icon: "🛍️",
    color: "#8b5cf6",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "cat-6",
    name: "Bills & Utilities",
    type: "expense",
    icon: "💡",
    color: "#06b6d4",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const initializeMockData = () => {
  // Initialize categories
  const existingCategories = storageAdapter.get<Category[]>(
    APP_CONFIG.storage.keys.categories
  )
  if (!existingCategories || existingCategories.length === 0) {
    storageAdapter.set(APP_CONFIG.storage.keys.categories, defaultCategories)
  }

  // Initialize transactions
  const existingTransactions = storageAdapter.get<Transaction[]>(
    APP_CONFIG.storage.keys.transactions
  )
  if (!existingTransactions || existingTransactions.length === 0) {
    const mockTransactions: Transaction[] = []
    storageAdapter.set(APP_CONFIG.storage.keys.transactions, mockTransactions)
  }

  // Initialize budgets
  const existingBudgets = storageAdapter.get<Budget[]>(
    APP_CONFIG.storage.keys.budgets
  )
  if (!existingBudgets || existingBudgets.length === 0) {
    const mockBudgets: Budget[] = []
    storageAdapter.set(APP_CONFIG.storage.keys.budgets, mockBudgets)
  }
}

export { generateId }

