import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(`https://hawks.api.experiwear.com/`, {
  path: '/users',
  reconnectionAttempts: 2,
  timeout: 10000,
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('connection established');
});

socket.on('disconnect', function (error) {
  console.log('Disconnected => ', error);
});

const useSocket = (eventName, callback) => {
  useEffect(() => {
    socket.on(eventName, callback);

    return function useSocketCleanup() {
      socket.off(eventName, callback);
    };
  }, [eventName, callback]);

  return socket;
};

export default useSocket;
