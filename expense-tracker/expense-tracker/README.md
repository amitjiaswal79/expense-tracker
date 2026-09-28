# Personal Expense Tracker

A React single-page app for logging income and expenses, viewing a running balance, filtering and sorting transactions, and reviewing monthly spending patterns. Built for the React course project assignment (Option 2).

## Features

- Add transactions with type (income/expense), amount, category, description, and date
- Running balance plus total income and total expenses
- Transaction list with delete for individual entries
- Filter by category and sort by date or amount
- Monthly summary panel and spending-by-category bar chart
- Optional monthly budget with an alert when spending exceeds the limit
- Data persisted in `localStorage` (survives page refresh)

## Technologies

- React 19 (functional components)
- Vite
- Plain CSS (responsive layout)

## Setup

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

Other scripts:

```bash
npm run build
npm run preview
npm run lint
```

## Project structure

- `src/components/` — UI components (`TransactionForm`, `TransactionList`, `BalanceSummary`, etc.)
- `src/hooks/useTransactionStorage.js` — `useState` + `useEffect` sync with `localStorage`
- `src/utils/transactionHelpers.js` — balance, filters, sorting, and chart helpers
- `src/constants/categories.js` — category lists and storage keys

## Screenshots

Add 2–3 screenshots of the running app here before submission (dashboard, transaction list, monthly chart).

## Known limitations

- Currency is formatted as USD for display only (no multi-currency support).
- No edit-in-place for existing transactions (delete and re-add if needed).
- Charts are simple CSS bar charts (no external chart library).
