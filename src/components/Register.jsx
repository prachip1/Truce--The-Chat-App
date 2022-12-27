import React,{useState} from "react";
import UserImg from "../image/User.png";

import { useNavigate, Link } from "react-router-dom";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { doc, setDoc } from "firebase/firestore";

const Register = () =>{

     const [err, setErr] = useState(false);
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();

    const randomImg ='https://source.unsplash.com/1600x900/?anime';

    const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();
      const displayName = e.target[0].value;
      const email = e.target[1].value;
      const password = e.target[2].value;
      const file = e.target[3].files[0];
  
      try {
        //Create user
        const res = await createUserWithEmailAndPassword(auth, email, password);
  
        //Create a unique image name
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);
  
        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              //Update profile
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              //create user on firestore
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
  
              //create empty user chats on firestore
              await setDoc(doc(db, "userChats", res.user.uid), {}); //for sidenav
              navigate("/");
            } catch (err) {
              console.log(err);
              setErr(true);
              setLoading(false);
            }
          });
        });
      } catch (err) {
        setErr(true);
        setLoading(false);
      }
    };
   



    return (
        <div className="flex justify-center items-center bg-gray-100 text-gray-900 pl-6 pr-6 ">
            <div className="h-screen w-1/2">
               <img src={randomImg} alt="images" className="h-screen w-auto rounded-md drop-shadow-lg"/>
            </div>
               <div className="bg-white p-20 h-screen w-1/2 ">
             
               <form className="flex flex-col gap-12 justify-center items-center" onSubmit={handleSubmit}>
               <h1 className="text-3xl text-bold">Sign Up</h1>
                    <input 
                     type="text"
                     placeholder="username"
                     className="w-full p-3  rounded-sm border-2 border-gray-200"/>

                     <input
                      type="email"
                      placeholder="email"
                      className="w-full p-3  rounded-sm border-2 border-gray-200" />

                      <input
                      type="password"
                      placeholder="password"
                      className="w-full p-3  rounded-sm border-2 border-gray-200"/>

                      <input style={{display:"none"}}
                      type="file"
                      id="file" />

                      <label htmlFor="file" className="flex justify-center items-center text-sm text-gray-400 gap-6">
                        <img src={UserImg} alt="" className="w-10 h-10 bg-gray-300 p-10" />
                        <span>Add an avatar</span>
                      </label>

                      <button className="bg-green-500 text-white w-full p-2 rounded-sm cursor-pointer">Register</button>
                     {err && <span className="text-red-500 -mt-4">Something is missing hmmm!</span>}
                 </form>
                <p className="text-center mt-1">Already Signed Up? <Link to="/login" className="text-sm font-bold ml-1 text-blue-600">Login</Link> </p>
               </div>
              
                
            </div>
       
    )
}

export default Register;