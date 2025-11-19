import { useState, useEffect } from "react"
import type { Budget } from "@core/types"
import { budgetService } from "../services/budget.service"

export const useBudgets = () => {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBudgets()
  }, [])

  const loadBudgets = () => {
    setLoading(true)
    try {
      const data = budgetService.getAll()
      setBudgets(data)
    } catch (error) {
      console.error("Error loading budgets:", error)
    } finally {
      setLoading(false)
    }
  }

  return {
    budgets,
    loading,
    refetch: loadBudgets,
  }
}

    