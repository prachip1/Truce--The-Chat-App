import React,{useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import logo from '../image/logo.svg';

 


const Navbar = () =>{ 
  const {currentUser} = useContext(AuthContext)

    return(
        <div className="flex items-center bg-gray-800 h-14 p-9 justify-between text-gray-300"> 
            <span className="-ml-8">
            <img src={logo} alt="TRUCE"/>
            </span>

            <div className="flex gap-2.5 items-center">
            <img src={currentUser.photoURL}
            alt="user"  
            className="w-10 h-10 object-cover rounded-full border-solid border-2 border-green-600"/>

             <span className="text-lg">{currentUser.displayName}</span>
             
            </div>
        </div>
      
    )
}

export default Navbar;