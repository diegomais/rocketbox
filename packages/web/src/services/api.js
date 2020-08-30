import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rocket-box-backend.herokuapp.com'
});

export default api;