import axios from 'axios';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'; // Replace with the actual API endpoint
const API_KEY = import.meta.env.REACT_APP_DEEPSEEK_API_KEY;

export const fetchDataFromDeepSeek = async (inputData) => {
  try {
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        // Add your request payload here
        input: inputData,
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data from DeepSeek:', error);
    throw error;
  }
};

export default fetchDataFromDeepSeek;
