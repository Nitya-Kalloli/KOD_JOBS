import axios from 'axios';

const API_KEY = '7f68683d31e3bd05f43d0596c8c19f81a26abf357046ffd6ce5747a3eed25492';
const BASE_URL = 'https://api.example.com/v1'; // You'll need to replace this with actual API URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export const getJobs = async () => {
  try {
    const response = await api.get('/jobs');
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}; 