import { io, Socket } from 'socket.io-client';

let sock: Socket | null = null;

export function getSocket(): Socket {
  if (!sock) {
    sock = io({ path: '/socket.io', withCredentials: true, transports: ['websocket'] });
  }
  return sock;
}
