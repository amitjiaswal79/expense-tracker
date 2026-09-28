import {
  formatCurrency,
  formatDisplayDate,
} from '../utils/transactionHelpers.js'

export default function TransactionItem({ transaction, onDelete }) {
  const isIncome = transaction.type === 'income'

  return (
    <li className={`transaction-item ${isIncome ? 'income' : 'expense'}`}>
      <div className="transaction-main">
        <div className="transaction-title-row">
          <strong>{transaction.description}</strong>
          <span className={`amount ${isIncome ? 'income' : 'expense'}`}>
            {isIncome ? '+' : '−'}
            {formatCurrency(transaction.amount)}
          </span>
        </div>
        <div className="transaction-meta">
          <span className="badge">{transaction.category}</span>
          <span>{formatDisplayDate(transaction.date)}</span>
          <span className="type-label">{isIncome ? 'Income' : 'Expense'}</span>
        </div>
      </div>
      <button
        type="button"
        className="btn-delete"
        onClick={() => onDelete(transaction.id)}
        aria-label={`Delete ${transaction.description}`}
      >
        Delete
      </button>
    </li>
  )
}
