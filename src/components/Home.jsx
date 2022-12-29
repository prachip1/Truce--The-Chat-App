import React from "react";
import Login from "./Login";
import Register from "./Register";
import Sidebar from "./Sidebar";
import Chat from './Chat';


const Home = () => {
    return(
        <div className=" w-full h-full flex">
            <div className="h-screen border-r-2 border-gray-400 rounded-sm w-1/4 overflow-hidden">
            
            <Sidebar />
               
            </div>
            <div className="h-screen w-3/4">
            <Chat />
            </div>

        </div>
    )
}

export default Home;