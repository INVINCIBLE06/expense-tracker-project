import axios from 'axios';

const editExpense = async (expenseData, expenses, setExpenses, setActiveTab) => {
  try {
    
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found. Please log in first.');
    }

    
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/exp/${expenseData._id}`, expenseData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',  
      },
    });

    setExpenses(expenses.map(exp => exp._id === expenseData._id ? response.data : exp));

    setActiveTab('list');
  } catch (error) {
    if (error.response) {
      console.error('Error updating expense:', error.response.data);
      throw new Error(error.response.data.error || 'Failed to update expense. Please try again.');
    } else if (error.request) {
      console.error('Network error:', error.request);
      throw new Error('Network error. Please check your internet connection.');
    } else {
      console.error('Error:', error.message);
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
};

export default editExpense;
