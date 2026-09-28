import { useMemo, useState } from 'react'
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from '../constants/categories.js'

const emptyForm = {
  type: 'expense',
  amount: '',
  category: EXPENSE_CATEGORIES[0],
  description: '',
  date: new Date().toISOString().slice(0, 10),
}

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm)

  const categories = useMemo(
    () => (form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES),
    [form.type],
  )

  function updateField(field, value) {
    setForm((prev) => {
      const next = { ...prev, [field]: value }
      if (field === 'type') {
        next.category =
          value === 'income' ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0]
      }
      return next
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const amount = Number.parseFloat(form.amount)
    if (!Number.isFinite(amount) || amount <= 0) return
    if (!form.description.trim()) return

    onAdd({
      id: crypto.randomUUID(),
      type: form.type,
      amount,
      category: form.category,
      description: form.description.trim(),
      date: form.date,
    })

    setForm({
      ...emptyForm,
      type: form.type,
      category:
        form.type === 'income' ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0],
    })
  }

  return (
    <section className="panel transaction-form-panel">
      <h2>Add transaction</h2>
      <form className="transaction-form" onSubmit={handleSubmit}>
        <div className="type-toggle" role="group" aria-label="Transaction type">
          <button
            type="button"
            className={form.type === 'expense' ? 'active expense' : ''}
            onClick={() => updateField('type', 'expense')}
          >
            Expense
          </button>
          <button
            type="button"
            className={form.type === 'income' ? 'active income' : ''}
            onClick={() => updateField('type', 'income')}
          >
            Income
          </button>
        </div>

        <label>
          Amount
          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0.00"
            value={form.amount}
            onChange={(e) => updateField('amount', e.target.value)}
            required
          />
        </label>

        <label>
          Category
          <select
            value={form.category}
            onChange={(e) => updateField('category', e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Description
          <input
            type="text"
            placeholder="What was this for?"
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
            maxLength={120}
            required
          />
        </label>

        <label>
          Date
          <input
            type="date"
            value={form.date}
            onChange={(e) => updateField('date', e.target.value)}
            required
          />
        </label>

        <button type="submit" className="btn-primary">
          Add {form.type === 'income' ? 'income' : 'expense'}
        </button>
      </form>
    </section>
  )
}
