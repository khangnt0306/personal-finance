import type { Category } from "@core/types"
import { storageAdapter } from "@core/adapters/storage.adapter"
import { APP_CONFIG } from "@core/config/app.config"
import { generateId } from "@core/adapters/mock-data"
import type { CategoryFormData } from "@core/validation/schemas"

class CategoryService {
  private getStorageKey() {
    return APP_CONFIG.storage.keys.categories
  }

  getAll(): Category[] {
    return storageAdapter.get<Category[]>(this.getStorageKey()) || []
  }

  getById(id: string): Category | null {
    const categories = this.getAll()
    return categories.find((cat) => cat.id === id) || null
  }

  getByType(type: "income" | "expense"): Category[] {
    const categories = this.getAll()
    return categories.filter((cat) => cat.type === type)
  }

  create(data: CategoryFormData): Category {
    const categories = this.getAll()
    const now = new Date().toISOString()
    const newCategory: Category = {
      id: generateId(),
      ...data,
      createdAt: now,
      updatedAt: now,
    }
    categories.push(newCategory)
    storageAdapter.set(this.getStorageKey(), categories)
    return newCategory
  }

  update(id: string, data: Partial<CategoryFormData>): Category | null {
    const categories = this.getAll()
    const index = categories.findIndex((cat) => cat.id === id)
    if (index === -1) return null

    categories[index] = {
      ...categories[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }
    storageAdapter.set(this.getStorageKey(), categories)
    return categories[index]
  }

  delete(id: string): boolean {
    const categories = this.getAll()
    const filtered = categories.filter((cat) => cat.id !== id)
    if (filtered.length === categories.length) return false
    storageAdapter.set(this.getStorageKey(), filtered)
    return true
  }
}

export const categoryService = new CategoryService()

