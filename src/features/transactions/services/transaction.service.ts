import type { Transaction } from "@core/types"
import { storageAdapter } from "@core/adapters/storage.adapter"
import { APP_CONFIG } from "@core/config/app.config"
import { generateId } from "@core/adapters/mock-data"
import type { TransactionFormData } from "@core/validation/schemas"

class TransactionService {
  private getStorageKey() {
    return APP_CONFIG.storage.keys.transactions
  }

  getAll(): Transaction[] {
    return storageAdapter.get<Transaction[]>(this.getStorageKey()) || []
  }

  getById(id: string): Transaction | null {
    const transactions = this.getAll()
    return transactions.find((t) => t.id === id) || null
  }

  getByDateRange(startDate: string, endDate: string): Transaction[] {
    const transactions = this.getAll()
    return transactions.filter(
      (t) => t.date >= startDate && t.date <= endDate
    )
  }

  getByCategory(categoryId: string): Transaction[] {
    const transactions = this.getAll()
    return transactions.filter((t) => t.categoryId === categoryId)
  }

  create(data: TransactionFormData): Transaction {
    const transactions = this.getAll()
    const now = new Date().toISOString()
    const newTransaction: Transaction = {
      id: generateId(),
      ...data,
      createdAt: now,
      updatedAt: now,
    }
    transactions.push(newTransaction)
    storageAdapter.set(this.getStorageKey(), transactions)
    return newTransaction
  }

  update(id: string, data: Partial<TransactionFormData>): Transaction | null {
    const transactions = this.getAll()
    const index = transactions.findIndex((t) => t.id === id)
    if (index === -1) return null

    transactions[index] = {
      ...transactions[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }
    storageAdapter.set(this.getStorageKey(), transactions)
    return transactions[index]
  }

  delete(id: string): boolean {
    const transactions = this.getAll()
    const filtered = transactions.filter((t) => t.id !== id)
    if (filtered.length === transactions.length) return false
    storageAdapter.set(this.getStorageKey(), filtered)
    return true
  }
}

export const transactionService = new TransactionService()

