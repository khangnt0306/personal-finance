import type { Budget } from "@core/types"
import { storageAdapter } from "@core/adapters/storage.adapter"
import { APP_CONFIG } from "@core/config/app.config"
import { generateId } from "@core/adapters/mock-data"
import type { BudgetFormData } from "@core/validation/schemas"
import { transactionService } from "@features/transactions"

class BudgetService {
  private getStorageKey() {
    return APP_CONFIG.storage.keys.budgets
  }

  getAll(): Budget[] {
    return storageAdapter.get<Budget[]>(this.getStorageKey()) || []
  }

  getById(id: string): Budget | null {
    const budgets = this.getAll()
    return budgets.find((b) => b.id === id) || null
  }

  getByCategory(categoryId: string): Budget | null {
    const budgets = this.getAll()
    return budgets.find((b) => b.categoryId === categoryId) || null
  }

  getSpentAmount(budgetId: string): number {
    const budget = this.getById(budgetId)
    if (!budget) return 0

    const transactions = transactionService.getByCategory(budget.categoryId)
    const filtered = transactions.filter(
      (t) => t.date >= budget.startDate && t.date <= budget.endDate && t.type === "expense"
    )
    return filtered.reduce((sum, t) => sum + t.amount, 0)
  }

  getRemainingAmount(budgetId: string): number {
    const budget = this.getById(budgetId)
    if (!budget) return 0
    return budget.amount - this.getSpentAmount(budgetId)
  }

  create(data: BudgetFormData): Budget {
    const budgets = this.getAll()
    const now = new Date().toISOString()
    const newBudget: Budget = {
      id: generateId(),
      ...data,
      createdAt: now,
      updatedAt: now,
    }
    budgets.push(newBudget)
    storageAdapter.set(this.getStorageKey(), budgets)
    return newBudget
  }

  update(id: string, data: Partial<BudgetFormData>): Budget | null {
    const budgets = this.getAll()
    const index = budgets.findIndex((b) => b.id === id)
    if (index === -1) return null

    budgets[index] = {
      ...budgets[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }
    storageAdapter.set(this.getStorageKey(), budgets)
    return budgets[index]
  }

  delete(id: string): boolean {
    const budgets = this.getAll()
    const filtered = budgets.filter((b) => b.id !== id)
    if (filtered.length === budgets.length) return false
    storageAdapter.set(this.getStorageKey(), filtered)
    return true
  }
}

export const budgetService = new BudgetService()

