import React, { useState, useEffect } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import Dashboard from '../components/Dashboard';
import addExpense from '../api/addNewExpense';
import deleteExpense from '../api/deleteExpense';
import getAllExpenses from '../api/getAllExpense';
import editExpense from '../api/editExpense';
import '../styles/main.css';
import { useNavigate } from 'react-router-dom';

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [activeTab, setActiveTab] = useState('add');
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); 
      return;
    }

    setLoading(true);
    getAllExpenses(setExpenses)
      .catch((err) => {
        setError('Failed to load expenses. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleEdit = (expense) => {
    setExpenseToEdit(expense);
    setActiveTab('add'); 
};

  return (
    <div className="container">
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          Add Expense
        </button>
        <button
          className={`tab ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          View Expenses
        </button>
        <button
          className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {activeTab === 'add' && (
        <ExpenseForm
          onSubmit={(expenseData) => addExpense(expenseData, expenses, setExpenses, setActiveTab)}
          setActiveTab={setActiveTab}
          expense={expenseToEdit}
          onCancel={() => setActiveTab('list')}
        />
      )}
      {activeTab === 'list' && (
        <ExpenseList
          expenses={expenses}
          onEdit={(expenseData) => editExpense(expenseData, expenses, setExpenses, setActiveTab)}
          onDelete={(id) => deleteExpense(id, expenses, setExpenses)}
        />
      )}
      {activeTab === 'dashboard' && <Dashboard expenses={expenses} />}
    </div>
  );
};

export default ExpensesPage;