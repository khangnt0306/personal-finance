import { useState, useEffect } from "react"
import type { Category } from "@core/types"
import { categoryService } from "../services/category.service"

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = () => {
    setLoading(true)
    try {
      const data = categoryService.getAll()
      setCategories(data)
    } catch (error) {
      console.error("Error loading categories:", error)
    } finally {
      setLoading(false)
    }
  }

  return {
    categories,
    loading,
    refetch: loadCategories,
  }
}

export const useCategoriesByType = (type: "income" | "expense") => {
  const { categories, loading, refetch } = useCategories()
  const filtered = categories.filter((cat) => cat.type === type)

  return {
    categories: filtered,
    loading,
    refetch,
  }
}

