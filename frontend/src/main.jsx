import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import io from 'socket.io-client';
const socket = io('http://0.0.0.0:8000')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App socket={socket}/>
  </React.StrictMode>,
)
