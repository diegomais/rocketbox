import axios from 'axios';
import { getEnvironment } from '../config/environment';

const { baseURL } = getEnvironment();

const api = axios.create({ baseURL });

export default api;
