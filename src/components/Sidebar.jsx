import React from "react";

import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats"

 


const Sidebar = () =>{ 
    return(
        <div className="flex-1 relative bg-gray-300 h-full">
           {/* <img src={logo} alt="TRUCE"/>*/ }
         <Navbar />
         <Search />
         <Chats />
        </div>
    )
}

export default Sidebar;