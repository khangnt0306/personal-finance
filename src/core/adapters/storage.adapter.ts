import { APP_CONFIG } from "@core/config/app.config"

class StorageAdapter {
  private prefix = APP_CONFIG.storage.prefix

  private getKey(key: string): string {
    return `${this.prefix}${key}`
  }

  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.getKey(key))
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error)
      return null
    }
  }

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(this.getKey(key), JSON.stringify(value))
    } catch (error) {
      console.error(`Error writing to localStorage: ${key}`, error)
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(this.getKey(key))
    } catch (error) {
      console.error(`Error removing from localStorage: ${key}`, error)
    }
  }

  clear(): void {
    try {
      Object.keys(localStorage)
        .filter((key) => key.startsWith(this.prefix))
        .forEach((key) => localStorage.removeItem(key))
    } catch (error) {
      console.error("Error clearing localStorage", error)
    }
  }
}

export const storageAdapter = new StorageAdapter()

