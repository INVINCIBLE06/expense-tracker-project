import axios from 'axios';

const addExpense = async (expenseData, expenses, setExpenses, setActiveTab) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found. Please log in first.');
    }
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/exp/`, expenseData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    setExpenses([...expenses, response.data]);

    setActiveTab('list');
  } catch (error) {
    if (error.response) {
      console.error('Error adding expense:', error.response.data);
      throw new Error(error.response.data.error || 'Failed to add expense. Please try again.');
    } else if (error.request) {
      console.error('Network error:', error.request);
      throw new Error('Network error. Please check your internet connection.');
    } else {
      console.error('Error:', error.message);
      throw new Error('An unexpected error occurred while adding the expense. Please try again.');
    }
  }
};

export default addExpense;
