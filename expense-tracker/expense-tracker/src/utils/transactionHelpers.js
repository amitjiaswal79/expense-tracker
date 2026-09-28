export function calculateBalance(transactions) {
  return transactions.reduce((total, transaction) => {
    const signed =
      transaction.type === 'income' ? transaction.amount : -transaction.amount
    return total + signed
  }, 0)
}

export function calculateTotals(transactions) {
  return transactions.reduce(
    (totals, transaction) => {
      if (transaction.type === 'income') {
        totals.income += transaction.amount
      } else {
        totals.expenses += transaction.amount
      }
      return totals
    },
    { income: 0, expenses: 0 },
  )
}

export function filterAndSortTransactions(
  transactions,
  { categoryFilter, sortBy, monthFilter },
) {
  let result = [...transactions]

  if (categoryFilter !== 'all') {
    result = result.filter((t) => t.category === categoryFilter)
  }

  if (monthFilter) {
    result = result.filter((t) => t.date.slice(0, 7) === monthFilter)
  }

  result.sort((a, b) => {
    switch (sortBy) {
      case 'date-asc':
        return a.date.localeCompare(b.date)
      case 'amount-desc':
        return b.amount - a.amount
      case 'amount-asc':
        return a.amount - b.amount
      case 'date-desc':
      default:
        return b.date.localeCompare(a.date)
    }
  })

  return result
}

export function spendingByCategory(transactions) {
  const totals = {}

  for (const transaction of transactions) {
    if (transaction.type !== 'expense') continue
    totals[transaction.category] =
      (totals[transaction.category] ?? 0) + transaction.amount
  }

  return Object.entries(totals).sort(([, a], [, b]) => b - a)
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatDisplayDate(isoDate) {
  return new Date(isoDate + 'T12:00:00').toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function currentMonthKey() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  return `${now.getFullYear()}-${month}`
}
