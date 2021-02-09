import axios from 'axios';

const api = axios.create({ baseURL: 'https://rocket-box.herokuapp.com' });

export default api;
