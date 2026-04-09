// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { initializeAuth,getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzjBo9rV0vGu2HtTy51gML9rjdZAPc4Zk",
  authDomain: "intro-3de9a.firebaseapp.com",
  projectId: "intro-3de9a",
  storageBucket: "intro-3de9a.firebasestorage.app",
  messagingSenderId: "417821262741",
  appId: "1:417821262741:web:149f3620d8dc41ac656c9c",
  measurementId: "G-0QSQ18TL91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const auth=initializeAuth(app,{
  persistence:getReactNativePersistence(ReactNativeAsyncStorage)
})