import axios from 'axios'

import { baseURL } from '@/config/settings'

export const api = axios.create({ baseURL })
