import { formatCurrency } from '../utils/transactionHelpers.js'

export default function MonthlySummary({ monthKey, income, expenses }) {
  const net = income - expenses
  const netClass = net >= 0 ? 'positive' : 'negative'

  const [year, month] = monthKey.split('-')
  const label = new Date(Number(year), Number(month) - 1, 1).toLocaleDateString(
    undefined,
    { month: 'long', year: 'numeric' },
  )

  return (
    <section className="panel monthly-summary-panel">
      <h2>Monthly summary</h2>
      <p className="month-label">{label}</p>
      <dl className="monthly-stats">
        <div>
          <dt>Income</dt>
          <dd className="income">{formatCurrency(income)}</dd>
        </div>
        <div>
          <dt>Expenses</dt>
          <dd className="expense">{formatCurrency(expenses)}</dd>
        </div>
        <div>
          <dt>Net</dt>
          <dd className={netClass}>{formatCurrency(net)}</dd>
        </div>
      </dl>
    </section>
  )
}
