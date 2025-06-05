
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'  
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyASW64CUD9BW79LpKJ84KbdfS9QdBK49XI",
  authDomain: "payafterfly-5a84b.firebaseapp.com",
  projectId: "payafterfly-5a84b",
  storageBucket: "payafterfly-5a84b.firebasestorage.app",
  messagingSenderId: "90251513375",
  appId: "1:90251513375:web:d21a344bacb5c0994b4f2a",
  measurementId: "G-LE0BFES4QX"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig); 
export const authentication=getAuth(app)
export const db=getFirestore(app)
