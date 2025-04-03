import { io } from 'socket.io-client'

import { baseURL } from '@/config/settings'

export const socket = io(baseURL, { autoConnect: false })
