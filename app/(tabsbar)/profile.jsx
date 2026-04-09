
// import { StyleSheet,Text } from 'react-native'

// import Space from "../../components/Space"
// import ThemedText from "../../components/ThemedText"
// import ThemedView from "../../components/ThemedView"
// import {useUser} from "../../hooks/useUser"
// import ThemedButton from "../../components/ThemedButton"

// const Profile = () => {

// const {user,logout}=useUser()

// const handleLogout= async()=>{
//   try {
//     const message= await logout()
//     alert(message)
//   } catch (error) {
//     alert(error)
//   }
// }

//   return (
//     <ThemedView style={styles.container}>

//       <ThemedText title={true} style={styles.heading}>
//         {user ? user.email : "Email"}
//       </ThemedText>
//       <Space />

//       <ThemedText>Time to start</ThemedText>
//       <Space />
//       <ThemedButton onPress={handleLogout}>
//         <Text>Logout</Text>
//       </ThemedButton>

//     </ThemedView>
//   )
// }

// export default Profile

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   heading: {
//     fontWeight: "bold",
//     fontSize: 18,
//     textAlign: "center",
//   },
// })


import { React, useState } from "react"
import { useRouter } from "expo-router"
import { View, TouchableOpacity, StyleSheet, Text, useColorScheme, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useUser } from "../../hooks/useUser"
import { useItem } from "../../hooks/useItem"
import ThemedView from "../../components/ThemedView"
import ThemedText from "../../components/ThemedText"
import { Colors } from "../../constants/Colors"
import PostsComponent from "../../components/tabsbar/PostsComponent"

const Profile = () => {
  const { user, logout } = useUser();
  const { items, favorites } = useItem();
const router=useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  const [activeTab, setActiveTab] = useState("myPosts")

  //filter
  const myItems = items.filter(item => item.userId === user?.uid);
  const favItems = items.filter(item => favorites.includes(item.id));

  const dataToShow = activeTab === "myPosts" ? myItems : favItems;

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you Sure to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "LogOut", style: "destructive",
          onPress: async () => {
            try {
               await logout()
  router.replace("/login")
              // alert(message)
            } catch (error) {
              alert(error)
            }
          }
        }
      ])
  }

  return (
    <ThemedView style={styles.container} safe={true}>
      {/* Nav */}
      <View style={styles.topNav}>
        <ThemedText style={[styles.navTitle]}>User Profile</ThemedText>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>
      {/* email,stats */}
      <View style={styles.profileHeader}>
        <ThemedText style={styles.emailText} title={true}>{user?.email || "Guest User"}</ThemedText>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{myItems.length}</Text>
            <Text style={styles.statLabel}>Listings</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{favItems.length}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
        </View>
      </View>
      {/* TABS */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[{ color: theme.textColor }, styles.tabButton, activeTab === "myPosts" && styles.activeTabButton]}
          onPress={() => setActiveTab("myPosts")}
        >
          <Ionicons
            name={activeTab === "myPosts" ? "grid" : "grid-outline"}
            size={20}
            color={activeTab === "myPosts" ? Colors.primary : "#888"}
            style={styles.tabIcon}
          />
          <ThemedText style={[{ color: theme.textColor }, styles.tabText, activeTab === "myPosts" && styles.activeTabText]}>
            My Posts
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[{ color: theme.textColor }, styles.tabButton, activeTab === "favorites" && styles.activeTabButton]}
          onPress={() => setActiveTab("favorites")}
        >
          <Ionicons
            name={activeTab === "favorites" ? "heart" : "heart-outline"}
            size={20}
            color={activeTab === "favorites" ? Colors.primary : "#888"}
            style={styles.tabIcon}
          />
          <ThemedText style={[{ color: theme.textColor }, styles.tabText, activeTab === "favorites" && styles.activeTabText]}>
            Favorites
          </ThemedText>
        </TouchableOpacity>
      </View>
      {/*  */}
      <View style={[styles.contentContainer]}>
        {/* profile posts */}
        <PostsComponent data={dataToShow} />
      </View>
    </ThemedView>
  )


}

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1 },
  // nav
  topNav: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    position: "relative",
  },
  navTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  logoutBtn: {
    position: "absolute",
    right: 20,
    padding: 5,
  },
  //email,stats
  profileHeader: {
    alignItems: "center",
    paddingVertical: 20,
  },
  emailText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  // Stats
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statBox: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
  },
  statLabel: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
    fontWeight: "500",
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: "#E0E0E0",
  },
  // Tabs
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 10,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderColor: "transparent",
  },
  activeTabButton: {
    borderColor: Colors.primary,
  },
  tabIcon: {
    marginRight: 6,
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
  },
  activeTabText: {
    fontWeight: "800",
    color: Colors.primary,
  },
  // Content Details
  contentContainer: {
    flex: 1,
    // backgroundColor: "#fff", 
  }
})