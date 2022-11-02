
import './App.css';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:3000/forecast', {transports: ['websocket']});
function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('budapest', (msg)=>{
      console.log(msg)
    })

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const sendPing = () => {
    socket.emit('ping');
  }
  
  const joinRoom = () =>{
    socket.emit('joinRoom', 'Budapest');
  }

  const leaveRoom = ( ) =>{
    socket.emit('leaveRoom', 'Budapest');
  }

  return (
    <div>
      <p>Connected: { '' + isConnected }</p>
      <p>Last pong: { lastPong || '-' }</p>
      <button onClick={ sendPing }>Send ping</button>
      <button onClick={joinRoom}> Leave</button>
      <button onClick={leaveRoom}> Join</button>
    </div>
  );
}

export default App;
