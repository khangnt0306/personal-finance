import { useState, useEffect } from "react"
import type { Transaction } from "@core/types"
import { transactionService } from "../services/transaction.service"

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTransactions()
  }, [])

  const loadTransactions = () => {
    setLoading(true)
    try {
      const data = transactionService.getAll()
      setTransactions(data)
    } catch (error) {
      console.error("Error loading transactions:", error)
    } finally {
      setLoading(false)
    }
  }

  return {
    transactions,
    loading,
    refetch: loadTransactions,
  }
}

