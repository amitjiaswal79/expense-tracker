import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from '../constants/categories.js'

const ALL_CATEGORIES = [
  'all',
  ...new Set([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES]),
]

export default function TransactionFilters({
  categoryFilter,
  onCategoryChange,
  sortBy,
  onSortChange,
  monthFilter,
  onMonthChange,
  budgetLimit,
  onBudgetChange,
}) {
  return (
    <section className="panel filters-panel">
      <h2>Filters &amp; budget</h2>
      <div className="filters-grid">
        <label>
          Category
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            {ALL_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'All categories' : category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sort by
          <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            <option value="date-desc">Date (newest first)</option>
            <option value="date-asc">Date (oldest first)</option>
            <option value="amount-desc">Amount (high to low)</option>
            <option value="amount-asc">Amount (low to high)</option>
          </select>
        </label>

        <label>
          Month (summary)
          <input
            type="month"
            value={monthFilter}
            onChange={(e) => onMonthChange(e.target.value)}
          />
        </label>

        <label>
          Monthly budget (optional)
          <input
            type="number"
            min="0"
            step="1"
            placeholder="e.g. 500"
            value={budgetLimit}
            onChange={(e) => onBudgetChange(e.target.value)}
          />
        </label>
      </div>
    </section>
  )
}
