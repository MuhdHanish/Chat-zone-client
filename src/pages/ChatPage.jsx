import React, { useEffect, useState } from 'react'
import axios from '../api/axios'

const ChatPage = () => {
  const [chats,setChats] = useState([])
  useEffect(()=>{
     axios
       .get("/api/chat")
       .then((response) => {
         setChats(response.data.chats);
       })
       .catch((err) => {
         console.log(err);
       })
           return ()=>{

    }
  },[])
  return (
    <div>
      {
        chats.length!==0 ? chats.map(chat=>{
          return <h3 key={chat?._id}>{chat?.chatName}</h3>;
        }) :  <div>Loding</div>
      }
    </div>
  )
}

export default ChatPage