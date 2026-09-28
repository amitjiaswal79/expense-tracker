import { useMemo, useState } from 'react'
import BalanceSummary from './components/BalanceSummary.jsx'
import CategoryChart from './components/CategoryChart.jsx'
import MonthlySummary from './components/MonthlySummary.jsx'
import TransactionFilters from './components/TransactionFilters.jsx'
import TransactionForm from './components/TransactionForm.jsx'
import TransactionList from './components/TransactionList.jsx'
import { useTransactionStorage } from './hooks/useTransactionStorage.js'
import {
  calculateBalance,
  calculateTotals,
  currentMonthKey,
  filterAndSortTransactions,
  formatCurrency,
  spendingByCategory,
} from './utils/transactionHelpers.js'
import './App.css'

export default function App() {
  const { transactions, setTransactions, budgetLimit, setBudgetLimit } =
    useTransactionStorage()

  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date-desc')
  const [monthFilter, setMonthFilter] = useState(currentMonthKey())

  const { income, expenses } = useMemo(
    () => calculateTotals(transactions),
    [transactions],
  )
  const balance = useMemo(() => calculateBalance(transactions), [transactions])

  const visibleTransactions = useMemo(
    () =>
      filterAndSortTransactions(transactions, {
        categoryFilter,
        sortBy,
        monthFilter: '',
      }),
    [transactions, categoryFilter, sortBy],
  )

  const monthTransactions = useMemo(
    () =>
      transactions.filter((transaction) =>
        transaction.date.startsWith(monthFilter),
      ),
    [transactions, monthFilter],
  )

  const monthTotals = useMemo(
    () => calculateTotals(monthTransactions),
    [monthTransactions],
  )

  const categoryTotals = useMemo(
    () => spendingByCategory(monthTransactions),
    [monthTransactions],
  )

  const budgetWarning = useMemo(() => {
    const limit = Number.parseFloat(budgetLimit)
    if (!Number.isFinite(limit) || limit <= 0) return null
    if (monthTotals.expenses <= limit) return null
    const over = monthTotals.expenses - limit
    return `Budget exceeded for ${monthFilter}: over by ${formatCurrency(over)}.`
  }, [budgetLimit, monthFilter, monthTotals.expenses])

  function handleAdd(transaction) {
    setTransactions((prev) => [transaction, ...prev])
  }

  function handleDelete(id) {
    setTransactions((prev) => prev.filter((transaction) => transaction.id !== id))
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">React course project</p>
          <h1>Personal Expense Tracker</h1>
          <p className="subtitle">
            Log income and expenses, track your balance, and review spending by
            category.
          </p>
        </div>
      </header>

      <main className="app-layout">
        <div className="column primary-column">
          <BalanceSummary
            balance={balance}
            income={income}
            expenses={expenses}
            budgetWarning={budgetWarning}
          />
          <TransactionForm onAdd={handleAdd} />
          <TransactionFilters
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            monthFilter={monthFilter}
            onMonthChange={setMonthFilter}
            budgetLimit={budgetLimit}
            onBudgetChange={setBudgetLimit}
          />
          <TransactionList
            transactions={visibleTransactions}
            onDelete={handleDelete}
          />
        </div>

        <aside className="column sidebar-column">
          <MonthlySummary
            monthKey={monthFilter}
            income={monthTotals.income}
            expenses={monthTotals.expenses}
          />
          <CategoryChart categoryTotals={categoryTotals} />
        </aside>
      </main>
    </div>
  )
}
