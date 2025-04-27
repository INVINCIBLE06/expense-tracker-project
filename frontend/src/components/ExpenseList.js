import React, { useState } from 'react';
import '../styles/table.css';
import ExpenseForm from './ExpenseForm';
import format from 'date-fns/format';

const ExpenseList = ({ expenses, onEdit, onDelete }) =>
{
    const [editingId, setEditingId] = useState(null);
    const [viewingExpense, setViewingExpense] = useState(null); // for modal

    const handleEdit = (expense) => {
        expense._id = editingId;
        onEdit(expense);
        setEditingId(null);
    };

    const handleView = (expense) =>
    {
        setViewingExpense(expense);
    };

    const closeModal = () =>
    {
        setViewingExpense(null);
    };

    return (
        <div>
            { expenses.length === 0 ? (
                <div className="no-expenses">No expenses recorded yet</div>
            ) : (
                <table className="expense-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { expenses.map((expense) => (
                            <React.Fragment key={ expense._id }>
                                { editingId === expense._id ? (
                                    <tr>
                                        <td colSpan="5">
                                            <ExpenseForm
                                                expense={ expense }
                                                onSubmit={ handleEdit }
                                                onCancel={ () => setEditingId(null) }
                                            />
                                        </td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td>{ format(new Date(expense.date), 'MMM dd, yyyy') }</td>
                                        <td>{ expense.category }</td>
                                        <td>{ expense.description }</td>
                                        <td>₹{ expense.amount.toFixed(2) }</td>
                                        <td>
                                            <button
                                                className="action-btn edit-btn"
                                                onClick={ () => { console.log(`aasa`, expense._id);
                                                setEditingId(expense._id) } }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="action-btn delete-btn"
                                                onClick={ () => onDelete(expense._id) }
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="action-btn view-btn"
                                                onClick={ () => handleView(expense) }
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ) }
                            </React.Fragment>
                        )) }
                    </tbody>
                </table>
            ) }

            {/* Modal */}
            { viewingExpense && (
                <div className="modal-overlay" onClick={ closeModal }>
                    <div className="modal-content" onClick={ (e) => e.stopPropagation() }>
                        <button className="close-btn" onClick={ closeModal }>&times;</button>
                        <h2 style={{ marginBottom:"20px", textAlign:'center' }}>Expense Details</h2>
                        <p><strong>Date:</strong> { format(new Date(viewingExpense.date), 'MMM dd, yyyy') }</p>
                        <p><strong>Category:</strong> { viewingExpense.category }</p>
                        <p><strong>Description:</strong> { viewingExpense.description }</p>
                        <p><strong>Amount:</strong> ₹{ viewingExpense.amount.toFixed(2) }</p>
                    </div>
                </div>
            ) }
        </div>
    );
};

export default ExpenseList;
