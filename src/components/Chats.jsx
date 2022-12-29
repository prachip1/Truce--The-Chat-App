import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="flex flex-col">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="p-2.5 flex flex-col  gap-2.5 cursor-pointer hover:bg-gray-800 hover:text-gray-200 lg:items-center lg:flex-row"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
          value={chats[0]}
        >
          <img src={chat[1].userInfo?.photoURL} alt="" className="w-14 h-14 rounded-full object-cover"/>
          <div className="userChatInfo">
            <span className="ml-4 lg:ml-2">{chat[1].userInfo?.displayName}</span>
            <p className="hidden lg:flex lg:ml-2 md:flex">{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;