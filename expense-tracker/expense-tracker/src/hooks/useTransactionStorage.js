import { useEffect, useState } from 'react'
import { BUDGET_STORAGE_KEY, STORAGE_KEY } from '../constants/categories.js'

function readStoredTransactions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function readStoredBudget() {
  try {
    const raw = localStorage.getItem(BUDGET_STORAGE_KEY)
    if (raw == null || raw === '') return ''
    const value = Number(raw)
    return Number.isFinite(value) && value >= 0 ? String(value) : ''
  } catch {
    return ''
  }
}

export function useTransactionStorage() {
  const [transactions, setTransactions] = useState(readStoredTransactions)
  const [budgetLimit, setBudgetLimit] = useState(readStoredBudget)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    if (budgetLimit === '') {
      localStorage.removeItem(BUDGET_STORAGE_KEY)
    } else {
      localStorage.setItem(BUDGET_STORAGE_KEY, budgetLimit)
    }
  }, [budgetLimit])

  return {
    transactions,
    setTransactions,
    budgetLimit,
    setBudgetLimit,
  }
}
