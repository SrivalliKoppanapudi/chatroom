import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
const Chats = ({socket,username,room}) => {
    const [currentMsg,setCurrentmsg]=useState("");
    const [msgList,setMsgList]=useState([]);
    //wait unitl msg is sent async
    const sendMessage= async ()=>{
        if(currentMsg!==""){
            const msgData={
                room:room,
                author:username,
                message:currentMsg,
                time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes(),
            }
            await socket.emit("send_msg",msgData);
            setMsgList((list)=>[...list,msgData])
            setCurrentmsg("")
        }
    

    }

        //listen to events from backend
        useEffect(()=>{
            socket.on("receive_msg",(data)=>{
                console.log(data)
                setMsgList((list)=>[...list,data])
            })
        },[socket])
        //calls callback whenever socket changes

  return (
    <div className='chat-window'>

        <div className='chat-header'>
            <p>Live Chat</p>
        </div>
        <div className='chat-body'>
            <ScrollToBottom className='message-container'>
            {msgList.map((m)=>{
                return (
                    <div className='message' id={username === m.author?"you":"other"}>
                        <div>
                            < div className='message-content'>
                                <p>{m.message}</p>

                            </div>
                            <div className='message-meta'>
                                <p id='time'>{m.time}</p>
                                <p id='author'>{m.author}</p>

                            </div>
                        </div>
                    </div>
                )
            })}
            </ScrollToBottom>
        </div>
        <div className='chat-footer'>
            <input type="text" placeholder='heyyy' value={currentMsg}
                onChange={(event)=>{
                    setCurrentmsg(event.target.value)
                }}
                onKeyPress={(event)=>{
                    event.key==="Enter" && sendMessage();
                }}
            />
            <button onClick={sendMessage}>&#9658;</button>
        </div>

    </div>
  )
}

export default Chats