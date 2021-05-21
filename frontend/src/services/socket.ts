import { io } from 'socket.io-client';

const uri = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';
const options = { autoConnect: false };
const socket = io(uri, options);

export default socket;
