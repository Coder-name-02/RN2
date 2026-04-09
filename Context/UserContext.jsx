import { createContext,useState,useEffect } from "react";
import { getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,
    sendEmailVerification,signOut ,
onAuthStateChanged
} from "firebase/auth";
import {auth,db} from "../lib/firebase"
import {doc,setDoc,getDoc} from "firebase/firestore"

 export const UserContext=createContext()

 export function UserProvider({children}){

    const[user,setUser]=useState(null)

    async function login(email,password) {
        try{

            const userCredential=await signInWithEmailAndPassword(auth,email,password);

            const LoggedInUser=userCredential.user
            if(!LoggedInUser.emailVerified){
                await signOut(auth)
            throw new Error("Please Verified Email First")
            }

            const userDocRef=doc(db,"users",LoggedInUser.uid);
            const userSnapShot=await getDoc(userDocRef)

            if(!userSnapShot.exists()){
                await setDoc(userDocRef,{
                    email:LoggedInUser.email,
                    createdAt: new Date()
                })
            }

            setUser(LoggedInUser)
            return "Login Success"

        }catch(error){
            throw error
        }
    }

    async function register(email,password) {
        try {
            const userCredential=await createUserWithEmailAndPassword(auth,email,password)
            //send email vertification
            await sendEmailVerification(userCredential.user)
            //signout before verified
            await signOut(auth)

            return "vertification sent"

        } catch (error) {
            throw error
        }
        
    }

    async function logout() {
        await signOut(auth)

       // setUser(null)
        return "logout succes"
    }

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
            {setUser(currentUser)}
        })

        return unsubscribe
    },[])


    return(
        <UserContext.Provider value={{user,logout,login,register}}>
                {children}
        </UserContext.Provider>
    )

 }