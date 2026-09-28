import TransactionItem from './TransactionItem.jsx'

export default function TransactionList({ transactions, onDelete }) {
  if (transactions.length === 0) {
    return (
      <section className="panel transaction-list-panel">
        <h2>Transactions</h2>
        <p className="empty-state">
          No transactions match your filters yet. Add income or an expense to get
          started.
        </p>
      </section>
    )
  }

  return (
    <section className="panel transaction-list-panel">
      <h2>Transactions ({transactions.length})</h2>
      <ul className="transaction-list">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  )
}
