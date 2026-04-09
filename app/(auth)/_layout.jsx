// import { StatusBar } from 'expo-status-bar'
// import { StyleSheet } from 'react-native'
// import { Stack} from "expo-router"
// import React from 'react'

// const AuthLayout = () => {
//   return (
//    <>
//     <StatusBar style='auto'/>
//     <Stack screenOptions={{headerShown:"false"}}>
//         <Stack.Screen name='login' options={{headerShown:"false"}} />
//         <Stack.Screen name='register' options={{headerShown:"false"}}/>
//     </Stack>
//    </>
//   )
// }

// export default AuthLayout

// const styles = StyleSheet.create({})



import { StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

const AuthLayout = () => {
  return (
    <>
      <StatusBar style='auto'/>
     <Stack screenOptions={{headerShown:false}}/>
    </>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})