import React, { useEffect, useState } from 'react'
import Total from './components/total.jsx'

const App = () => {
  const [expenses, setExpenses] = useState([])
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [categories, setCategories] = useState([])

  const resetForm = () => {
    setTitle('')
    setAmount('')
    setCategory('')
  }

  const handleAddExpense = () => {
    if (!title.trim() || !amount || !category.trim()) return

    const newExpense = {
      title: title.trim(),
      amount: Number(amount),
      category: category.trim(),
    }

    setExpenses(prev => [...prev, newExpense])
    resetForm()
  }

  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(expenses.map(expense => expense.category))
    )
    setCategories(uniqueCategories)
  }, [expenses])

  const filteredExpenses = filterCategory === 'All'
    ? expenses
    : expenses.filter(expense => expense.category === filterCategory)

  const totalAmount = filteredExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  )

  return (
    <div>
      <h1>Expense Tracker</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>
      <div>
        <label>Filter by Category: </label>
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <Total total={totalAmount} />
      <ul>
        {filteredExpenses.map((expense, index) => (
          <li key={index}>
            {expense.title} - ${expense.amount.toFixed(2)} {expense.category}
          </li>
        ))}
      </ul>

      
    </div>
  )
}

export default App
