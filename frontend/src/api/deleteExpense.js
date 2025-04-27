import axios from 'axios';

const deleteExpense = async (id, expenses, setExpenses) => {
  try {
    const token = localStorage.getItem('token');
    console.log(`TOKEN`, token);
    if (!token) {
      throw new Error('No token found. Please log in first.');
    }

    await axios.put(
      `${process.env.REACT_APP_API_URL}/api/exp/delete/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    setExpenses(expenses.filter(exp => exp._id !== id));

  } catch (error) {
    if (error.response) {
      console.error('Error deleting expense:', error.response.data);
      throw new Error(error.response.data.error || 'Failed to delete expense. Please try again.');
    } else if (error.request) {
      console.error('Network error:', error.request);
      throw new Error('Network error. Please check your internet connection.');
    } else {
      console.error('Error:', error.message);
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
};

export default deleteExpense;
