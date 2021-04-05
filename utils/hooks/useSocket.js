
import { useEffect } from 'react'
import io from 'socket.io-client'

import { SOCKET_URL } from 'config'

const socket = io(`${SOCKET_URL}/fanbands`, {
  reconnectionAttempts: 2,
  timeout: 10000,
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('connection established')
  socket.emit('test', { timestamp: new Date() });
})

socket.on('disconnect', function (error) {
  console.log('Disconnected => ', error);
});

socket.on('test', function (data) {
  console.log(data);
});

socket.on('connect_error', function (data) {
  console.error(data);
});

const useSocket = (eventName, callback) => {
  useEffect(() => {
    socket.on(eventName, callback)

    return function useSocketCleanup() {
      socket.off(eventName, callback)
    }
  }, [eventName, callback])

  return socket;
}

export default useSocket;