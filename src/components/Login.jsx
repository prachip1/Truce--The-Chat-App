import React,{useState} from "react";
import { useNavigate, Link } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
const Login = () =>{

    const randomImg ='https://source.unsplash.com/1600x900/?friends'
    const [err, setErr] = useState(false);
     const navigate = useNavigate();

    const handleSubmit = async (e) => 
    {  e.preventDefault();
       
       const email = e.target[0].value;
       const password = e.target[1].value;
       try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/")
     
         } catch (err) 
         {
            setErr(true);
            console.log(err)
      
         }
      };
  
 
    return (
        <div className="flex justify-center items-center bg-gray-100 text-gray-900 pl-6 pr-6 ">
            <div className="h-screen w-1/2">
               <img src={randomImg} alt="images" className="h-screen w-auto rounded-md drop-shadow-lg"/>
            </div>
               <div className="bg-white p-20 h-screen w-1/2 ">
             
               <form className="flex flex-col gap-12 justify-center items-center" onSubmit={handleSubmit}>
               <h1 className="text-3xl text-bold">Login</h1>
                   

                     <input
                      type="email"
                      placeholder="email"
                      className="w-full p-3  rounded-sm border-2 border-gray-200" />

                      <input
                      type="password"
                      placeholder="password"
                      className="w-full p-3  rounded-sm border-2 border-gray-200"/>

                      <button className="bg-green-500 text-white w-full p-2 rounded-sm">Log In</button>
                      {err && <span className="text-red-500 -mt-4">Please check your Email or Password</span>}
                </form>
                <p className="text-center mt-2">Let's go Sign Up first <Link to="/register" className="text-sm font-bold ml-1 text-blue-600">Register</Link></p>
               </div>
           
                
            </div>
       
    )
}

export default Login;