import { io } from 'socket.io-client';
import { variables } from './helpers/variables';

const URL = variables.SOCKET_URL;

export const socket = io(URL);
