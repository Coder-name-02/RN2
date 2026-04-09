import { StyleSheet ,useColorScheme} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Stack,useRouter} from "expo-router"
import {Colors} from "../constants/Colors"
import { useUser } from '../hooks/useUser'
import { useEffect } from 'react'

const AuthNavigathor = () => {

const colorScheme=useColorScheme()
const theme=Colors[colorScheme] ?? Colors.light

const router=useRouter()
const {user}=useUser()

useEffect(()=>{
    if(user){
        router.replace("/home")
    }
},[user])

// console.log(colorScheme)

  return (
    <>
    <StatusBar style='auto'/>
    <Stack screenOptions={{
        headerStyle:{backgroundColor:theme.navBackground},
        headerTitleAlign:"center",
        }}>
        <Stack.Screen name='index'  options={{title:"Home",headerShown:false}}/>
        <Stack.Screen name='(auth)'  options={{headerShown:false}}/>
         <Stack.Screen name='(tabsbar)'  options={{headerShown:false}}/>
         <Stack.Screen name="createModal" options={{presentation:"modal",
         title:"Create",
          animation:"fade_from_bottom"}}/>
    </Stack>
   </>
  )
}

export default AuthNavigathor

const styles = StyleSheet.create({
  
})