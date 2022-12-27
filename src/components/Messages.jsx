import React,{useState, useEffect, useContext} from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import {db} from "../firebase";


const Messages = () =>{
  
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    
    const unsub = onSnapshot(doc(db, "chats", data.chatId),(doc)=>{
      doc.exists() && setMessages(doc.data().messages)
    })
  
    return () => {
      unsub();
    }
  }, [data.chatId])
  

  console.log("this is from messages",messages)



 
    
    return(
        <div className=" bg-gray-300 p-2.5 h-[calc(100vh_-_166px)] overflow-scroll scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-rounded-full">
         {messages.map((msg) =>(

            <Message message={msg} key={msg.id}  />
          ))}

          
        </div>
    )
}

export default Messages;