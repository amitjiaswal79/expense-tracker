import { formatCurrency } from '../utils/transactionHelpers.js'

export default function CategoryChart({ categoryTotals }) {
  if (categoryTotals.length === 0) {
    return (
      <section className="panel chart-panel">
        <h2>Spending by category</h2>
        <p className="empty-state">Add expenses to see a category breakdown.</p>
      </section>
    )
  }

  const maxTotal = categoryTotals[0][1]

  return (
    <section className="panel chart-panel">
      <h2>Spending by category</h2>
      <ul className="category-chart">
        {categoryTotals.map(([category, total]) => {
          const widthPercent = maxTotal > 0 ? (total / maxTotal) * 100 : 0
          return (
            <li key={category}>
              <div className="chart-row-header">
                <span>{category}</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="chart-bar-track" aria-hidden="true">
                <div
                  className="chart-bar-fill"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
