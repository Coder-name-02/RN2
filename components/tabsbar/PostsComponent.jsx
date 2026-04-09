import { React, useState, useMemo } from "react"
import {
  StyleSheet, View, Image, Text, FlatList,
  TouchableOpacity, useWindowDimensions,
  TextInput, ScrollView
} from 'react-native'
import { Ionicons } from "@expo/vector-icons"
import {useRouter} from "expo-router"
// 
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import { Colors } from "../../constants/Colors"
import { useItem } from "../../hooks/useItem"


// Furniture Card
const FurnitureCard = ({ item }) => {
 // const [isFavorite, setIsFavorite] = useState(false);
  const {toggleFavourite,favorites}=useItem()
  const isFavorite=favorites.includes(item.id)
const router=useRouter();


  const displayImage = item.imageUrls?.length > 0
    ? item.imageUrls[0]
    : "https://via.placeholder.com/300";

  return (

    <View style={styles.card}>
    <TouchableOpacity onPress={()=>router.push(`/profilePosts/${item.id}`)}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: displayImage }} style={styles.image} />
        <TouchableOpacity
          style={styles.favBtn}
          onPress={() => toggleFavourite(item.id,isFavorite)}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={18}
            color={isFavorite ? Colors.primary : "#444"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.priceText} numberOfLines={1}>${item.price}</Text>
        <Text style={styles.typeText} numberOfLines={1}>
          {item.furnitureType ? item.furnitureType.charAt(0).toUpperCase() + item.furnitureType.slice(1) : "Unknown"}
        </Text>
      </View>
      </TouchableOpacity>
    </View>

  );
};


const PostsComponent = ({data}) => {

  const { width } = useWindowDimensions();


  let numColumns = 2;
  if (width >= 426) { numColumns = 3; }
  if (width >= 768) { numColumns = 4; }

  return (
      <FlatList
        data={data}
        key={numColumns}
        numColumns={numColumns}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FurnitureCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        ListEmptyComponent={
          <ThemedView style={styles.emptyContainer} safe={true}>
         <Ionicons name="cube-outline" size={48} color="#ccc" />
         <ThemedText style={styles.emptyText}>
         "No items Found yet"
         </ThemedText>
          </ThemedView>
        }
      />
  )
}

export default PostsComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F8F9FA", 
  },
  // Grid,Card Styles 
  listContent: {
    padding: 10,
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: "flex-start", // Changed to flex-start so last row aligns correctly
  },
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    // Fix for odd number of items in last row stretching
    maxWidth: '47%',
  },
  imageContainer: {
    position: "relative",
    width: "100%",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "stretch",
  },
  favBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailsContainer: {
    padding: 12,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  typeText: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
    fontWeight: "500",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 16,
    color: "#888",
  },
  //search filter
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    // Subtle shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  filterContainer: {
    paddingBottom: 10,
  
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 8, // Space between chips

  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
  },
  chipTextActive: {
    color: "#fff",
  },
});

