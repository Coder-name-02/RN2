// import { StyleSheet ,useColorScheme} from 'react-native'
// import { StatusBar } from 'expo-status-bar'
// import { Stack} from "expo-router"
// import React from 'react'
// import {Colors} from "../constants/Colors"
// import { UserProvider } from '../Context/UserContext'

// const RootLayout = () => {

// const colorScheme=useColorScheme()
// const theme=Colors[colorScheme] ?? Colors.light




// // console.log(colorScheme)

//   return (
//     <UserProvider>
//     <StatusBar style='auto'/>
//     <Stack screenOptions={{
//         headerStyle:{backgroundColor:theme.navBackground},
//         headerTitleAlign:"center",
//         }}>
//         <Stack.Screen name='index'  options={{title:"Home",headerShown:false}}/>
//         <Stack.Screen name='(auth)'  options={{headerShown:false}}/>
//          <Stack.Screen name='(tabsbar)'  options={{headerShown:false}}/>
//          <Stack.Screen name="createModal" options={{presentation:"modal",
//          title:"Create",
//           animation:"fade_from_bottom"}}/>
//     </Stack>
//    </UserProvider>
//   )
// }

// export default RootLayout

// const styles = StyleSheet.create({
  
// })

//stack /
//       /contact
//      /
//


import { UserProvider } from '../Context/UserContext'
import { ItemsProvider } from '../Context/ItemsContext'
import AuthNavigathor from './AuthNavigator'

const RootLayout = () => {
  return (
    <UserProvider>
    <ItemsProvider>
      <AuthNavigathor />
    </ItemsProvider>
    </UserProvider>
  )
}

export default RootLayout

