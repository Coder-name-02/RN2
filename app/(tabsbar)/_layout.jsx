import { StyleSheet, useColorScheme } from 'react-native'
import { Ionicons } from "@expo/vector-icons"
import { Tabs, useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { Colors } from "../../constants/Colors"
import CreateTabButton from '../../components/CreateButton'
import { useUser } from '../../hooks/useUser'

const TabBarLayout = () => {

  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  // const { user } = useUser();
  // const router = useRouter()

  // useEffect(() => {
  //   if (!user) {
  //     router.replace("/login")
  //   }
  // }, [user])

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: theme.navBackground },
      tabBarActiveTintColor: theme.iconColorFocused,
      tabBarInactiveTintColor: theme.iconColor
    }}>
      <Tabs.Screen name='home' options={{
        title: "Home",
        tabBarIcon: ({ focused }) => (
          <Ionicons size={25} name={focused ? "home" : "home-outline"}
            color={focused ? theme.iconColorFocused : theme.iconColor}
          />
        )
      }} />
      {/* <Tabs.Screen name='create' options={{
        title:"Create",
        tabBarIcon:({focused})=>(
            <Ionicons size={25} name={ focused?"add" : "add-outline" } 
                  color={focused?theme.iconColorFocused:theme.iconColor }
            />
        )
        }}/> */}

      <Tabs.Screen name='create' options={{
        title: "",
        tabBarButton: () => <CreateTabButton />
      }}
      />
      <Tabs.Screen name='profile' options={{
        title: "Profile",
        tabBarIcon: ({ focused }) => (
          <Ionicons size={25} name={focused ? "person" : "person-outline"}
            color={focused ? theme.iconColorFocused : theme.iconColor}
          />
        )
      }} />
      <Tabs.Screen name='posts/[id]' options={{
        href: null,
        tabBarStyle: { display: "none" }
      }} />
      <Tabs.Screen name='profilePosts/[id]' options={{
        href: null,
        tabBarStyle: { display: "none" }
      }} />

    </Tabs>
  )
}

export default TabBarLayout
const styles = StyleSheet.create({})