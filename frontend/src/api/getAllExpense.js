import axios from 'axios';

const getAllExpenses = async (setExpenses) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please log in first.');
    }
    const updatedExpensesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/exp/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    setExpenses(updatedExpensesResponse.data);

  } catch (error) {
    if (error.response) {
      console.error('Error fetching expenses:', error.response.data);
      throw new Error(error.response.data.error || 'Failed to fetch expenses. Please try again.');
    } else if (error.request) {
      console.error('Network error:', error.request);
      throw new Error('Network error. Please check your internet connection.');
    } else {
      console.error('Error:', error.message);
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
};

export default getAllExpenses;