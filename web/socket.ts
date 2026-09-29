import { io, Socket } from 'socket.io-client';

let sock: Socket | null = null;

export function getSocket(): Socket {
  if (!sock) {
    sock = io({
      path: '/socket.io',
      withCredentials: true,
      transports: ['polling', 'websocket'],
      upgrade: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000
    });

    sock.on('connect', () => console.log('[socket] connected', sock?.id));
    sock.on('disconnect', r => console.log('[socket] disconnected', r));
    sock.on('connect_error', e => console.error('[socket] connect_error', e.message));
  }
  return sock;
}