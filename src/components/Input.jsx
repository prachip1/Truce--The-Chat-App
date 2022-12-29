import React,{ useContext, useState } from "react";
import {GrAttachment} from 'react-icons/gr';
import {BsImageFill} from 'react-icons/bs';
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

import { doc, updateDoc, arrayUnion, Timestamp, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuidv4 } from 'uuid';

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";



const Input  =() =>{

    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
  
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);


    const handleSend = async () => {
        if (img) {
            const storageRef = ref(storage, uuidv4());
      
            const uploadTask = uploadBytesResumable(storageRef, img);
          
            console.log(uploadTask)
            uploadTask.on('state_changed', 
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            }, 
            (error) => {
              // Handle unsuccessful uploads
            }, 
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                console.log('File available at', downloadURL);
             await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: uuidv4(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    img:downloadURL,
                  }),
                });
              });
            }
          );
          
      
        
                
               
          {/*  uploadTask.on(
              (error) => {
               console.log("error is ", error)
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                  await updateDoc(doc(db,"chats",data.chatId), {
                    messages: arrayUnion({
                      id: uuidv4(),
                      text,
                      senderId: currentUser.uid,
                      date: Timestamp.now(),
                      img: downloadURL,
                    }),
                  });
                });
              }
            );*/ }
          } 
          
          else {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuidv4(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
              }),
            });
          }
      
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
              text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });
      
          await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
              text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });
      
          setText("");
          setImg(null);
   
    }


    return(
        <div className="h-16 text-gray-900 p-4 flex items-center justify-between  bg-white">
            
            <input type="text" 
            placeholder="Send some cake 🎂" 
            onChange={(e) => setText(e.target.value)}
            className="w-full border-none outline-none text-sm lg:text-lg"
            value={text}/>

            <div className="flex items-center"> {/*send div*/}
          

                <input type="file" 
                 id="file"
                 style={{display: "none"}} 
                onChange={(e) =>setImg(e.target.files[0])}
                 />

                <label htmlFor="file">
                   <BsImageFill className="w-4 h-4 -mr-6 lg:w-6
                    lg:h-6 cursor-pointer" />
                </label>
                <button 
                onClick={handleSend}
                className="text-xl -mr-4 font-bold text-gray-900 lg:text-gray-200 lg:p-4 w-20 lg:text-2xl lg:ml-4"
                > 
                🍽 </button>
            </div>

        </div>
    )
}

export default Input;