import axios from 'axios';

// Configure axios defaults globally
const setupAxios = () => {
  // Set base URL from environment
  axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}`;

  // Set default credentials for all requests
  axios.defaults.withCredentials = true;
};

export default setupAxios;
