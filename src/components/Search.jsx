import React, { useContext, useState } from "react";
import { collection, query, where, getDocs,doc, setDoc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import {db} from "../firebase";
import { AuthContext } from "../context/AuthContext";
 


const Search = () =>{ 

   const [userName, setUserName] = useState("");
   const [user, setUser] = useState(null);
   const [err, setErr] = useState(false);

   const { currentUser } = useContext(AuthContext);

   const handleSearch = async () => {
    
    const q = query(
                    collection(db, "users"), 
                    where("displayName", "==", userName)
                        );
    
    try{

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
       setUser(doc.data())
    });

    }catch(err){
       setErr(true)
    }

   };


   const handleKey = (e)=>{
    e.code === "Enter" && handleSearch();
   };

   const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUserName("")
  };
    return(
        <div className="border-2 border-b-gray-600">
            <div className="p-2.5">
            <input type="text" placeholder="👀 Looking for some crackheads...." 
            className="p-2 w-full rounded-md border-2 border-gray-400 outline-none hover:border-gray-800"
            onChange={e => setUserName(e.target.value)}
            onKeyDown={handleKey}
            value={userName}
            />
            </div> 

            {err && <p className="text-xl text-red-600">User not found</p>}
             {user && (
                 <div className="flex items-center mt-4 gap-2.5 cursor-pointer p-2.5 text-black" 
                 onClick={handleSelect}>

                 <img src={user.photoURL}
                    alt="user" 
                    className="w-16 h-16 object-cover rounded-full" 
                    />
    
                    <div className="text-gray-600 font-semibold">
                     <p className="text-black text-md">{user.displayName}</p> 
                    </div>
                </div>

             )}

           
     
        </div>
    );
};

export default Search;