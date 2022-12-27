// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDy2WxdY6ZULUGR3wvDgT9YhkbPWxZlUbs",
  authDomain: "truce-30f38.firebaseapp.com",
  projectId: "truce-30f38",
  storageBucket: "truce-30f38.appspot.com",
  messagingSenderId: "279388729791",
  appId: "1:279388729791:web:30f6f7b16d1c077c1cb10a",
  measurementId: "G-D6FCECBZ73"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
