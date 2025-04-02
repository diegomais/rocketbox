import { io } from 'socket.io-client';
import { getEnvironment } from '../config/environment';

const { baseURL } = getEnvironment();
const socket = io(baseURL, { autoConnect: false });

export default socket;
