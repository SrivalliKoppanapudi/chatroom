
import { useState } from 'react';
import './App.css'
import io from 'socket.io-client'
const socket = io.connect("https://chatroom-server-18if.onrender.com");
import Chats from './Chats'
function App() {
  const [username,setUsername]=useState("");
  const [room,setRoom]=useState("");
  const [showChats,setShowChats]=useState(false)
  const joinRoom=()=>{
    if(username!=="" && room !==""){
      socket.emit("join_room",room)//emitting event,join_room event should be in backend
    }
    setShowChats(true);
  }

  return (
    <>
      <div className='App'>
        {!showChats ?
        <div className='joinChatContainer'>
        <h3>Join A Chat</h3>
        <input type="text" placeholder='Name....'
            onChange={(event)=>{
              setUsername(event.target.value)
            }}
        
        />
        <input type="text" placeholder='Room id....' 
            onChange={(event)=>{
              setRoom(event.target.value)
            }}
        />
        <button onClick={joinRoom}>Join Room</button>
        </div>:
            <Chats socket={socket} username={username} room={room} />}
      </div>
    </>
  )
}

export default App
