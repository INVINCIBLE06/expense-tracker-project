import axios from 'axios';

async function loginFunc(body) {
  try {

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/login`, body);
    localStorage.setItem('name', response?.data?.user?.name);
    const { token } = response.data;

    return token;
  } catch (error) {
    if (error.response) {
      console.error('Login error:', error.response.data);
      throw new Error(error.response.data.error || 'Login failed. Please try again.');
    } else if (error.request) {
      console.error('Network error:', error.request);
      throw new Error('Network error. Please check your internet connection.');
    } else {
      console.error('Error:', error.message);
      throw new Error('An error occurred. Please try again.');
    }
  }
}

export default loginFunc;
