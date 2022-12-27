import React, { useContext } from "react";

import Input from "./Input";
import Messages from "./Messages";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { ChatContext } from "../context/ChatContext";


const Chat = () =>{ 

    const { data } = useContext(ChatContext);
    console.log(data)
 
    return(
        <div className="flex-2 ">
            <div className="bg-gray-500 p-5 flex justify-between"> {/*top bar*/}
                <span className="text-gray-200 text-xl">{data.user?.displayName}</span>
                <button 
                className="bg-green-500 p-2 cursor-pointer rounded-sm font-semibold text-white"
                onClick={()=> signOut(auth)}
                >
                Logout
                </button>


            </div>
            <div>
            <Messages />
            <Input />
            </div>
        </div>
    )
}

export default Chat;