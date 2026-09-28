import { formatCurrency } from '../utils/transactionHelpers.js'

export default function BalanceSummary({ balance, income, expenses, budgetWarning }) {
  const balanceClass =
    balance > 0 ? 'positive' : balance < 0 ? 'negative' : 'neutral'

  return (
    <section className="balance-summary" aria-label="Account summary">
      <div className="balance-card primary">
        <p className="label">Current balance</p>
        <p className={`value ${balanceClass}`}>{formatCurrency(balance)}</p>
        <p className="hint">Income minus expenses</p>
      </div>
      <div className="balance-card">
        <p className="label">Total income</p>
        <p className="value income">{formatCurrency(income)}</p>
      </div>
      <div className="balance-card">
        <p className="label">Total expenses</p>
        <p className="value expense">{formatCurrency(expenses)}</p>
      </div>
      {budgetWarning && (
        <div className="budget-alert" role="alert">
          {budgetWarning}
        </div>
      )}
    </section>
  )
}
