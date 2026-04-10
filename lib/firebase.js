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
  apiKey: "API_KEY",
  authDomain: " AUTH_DOMAIN",
  projectId: "PROJECT_ID",
  storageBucket: "STROAGE_BUCKET",
  messagingSenderId: "ID",
  appId: "APP_ID",
  measurementId: "MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const auth=initializeAuth(app,{
  persistence:getReactNativePersistence(ReactNativeAsyncStorage)
})
