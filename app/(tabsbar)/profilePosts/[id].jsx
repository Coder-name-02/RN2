import React, { useEffect, useState } from 'react'
import {
    StyleSheet, Text, View, ScrollView, Image,
    Pressable, Linking, Alert, useColorScheme
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useUser } from '../../../hooks/useUser'
//
import { Ionicons } from '@expo/vector-icons'
import { useItem } from '../../../hooks/useItem'
import { Colors } from '../../../constants/Colors'
import ThemedView from '../../../components/ThemedView'
import ThemedText from '../../../components/ThemedText'


export default function Details() {

    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { user } = useUser()
    const { toggleFavourite, favorites, items, deleteItem } = useItem();

    const item = items.find(i => i.id === id);
    const isFavorite = item ? favorites.includes(item.id) : false;

    const [selectedImage, setSelectedImage] = useState(null)
    const isUserPost = item?.userId === user?.uid
    const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light

    const handleSafeCall = async (phone) => {
        if (!phone) {
            Alert.alert("No,Ph Num Avaliable")
        }

        const url = `tel:${phone}`;

        try {
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert("Device Can't make a Call")
            }

        } catch (error) {
            Alert.alert("Something is wrong")
        }
    }

    const handleDelete = (item) => {
        Alert.alert("Delete Post", "Are you Sure to delete?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete", style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteItem(item)
                            router.back()
                            router
                        } catch (err) {
                            console.log("handleDelete", err)
                        }
                    }

                }
            ])
    }


    useEffect(() => {
        if (item?.imageUrls?.length > 0) {
            setSelectedImage(item.imageUrls[0])
        }
    }, [item])

    if (!item) {
        return (
            <ThemedView style={styles.loadingContainer} safe={true}>
                <ThemedText style={styles.loadingText}>LOADING . . .</ThemedText>
            </ThemedView>
        )
    }

    return (
        <ThemedView style={styles.container} safe={true}>
            {/* Image */}
            <View style={styles.ImageWrapper}>
                <Image source={{ uri: selectedImage || "https://via.placeholder.com/300" }}
                    style={styles.mainImage}
                    resizeMode='cover'
                />
                {/* fav */}
                <View style={styles.floatingHeader}>
                    <Pressable style={styles.iconBtn} onPress={() => router.replace("/profile")} >
                        <Ionicons name='chevron-back' size={24} color="#111" />
                    </Pressable>
                    <Pressable style={styles.iconBtn} onPress={() => toggleFavourite(item.id, isFavorite)} >
                        <Ionicons name={isFavorite ? "heart" : "heart-outline"}
                            size={24}
                            color={isFavorite ? Colors.primary : "#111"} />
                    </Pressable>
                </View>
            </View>
            {/* Details Des  */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                style={[styles.sheet, { backgroundColor: theme.background }]}
            >
                {/* Title & Price Header */}
                <View style={styles.topSection}>
                    <View style={{ flex: 1 }}>
                        <ThemedText style={styles.type}>
                            {item.furnitureType ? item.furnitureType.toUpperCase() : "FURNITURE"}
                        </ThemedText>
                        <ThemedText style={styles.price}>$ {item.price}</ThemedText>
                    </View>
                </View>

                {/* 🔹 THUMBNAIL GALLERY */}
                {item.imageUrls?.length > 1 && (
                    <View style={styles.galleryContainer}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {item.imageUrls.map((img, index) => (
                                <Pressable key={index} onPress={() => setSelectedImage(img)}>
                                    <Image
                                        source={{ uri: img }}
                                        style={[
                                            styles.thumbnail,
                                            selectedImage === img && styles.activeThumb
                                        ]}
                                    />
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                )}

                {/* 🔹 DESCRIPTION */}
                <View style={styles.section}>
                    <ThemedText style={styles.sectionTitle} title={true}>Description</ThemedText>
                    <ThemedText style={styles.sectionText}>
                        {item.description || "No description provided for this item."}
                    </ThemedText>
                </View>

                {/* 🔹 DETAILS (Clean list layout instead of bulky cards) */}
                <View style={styles.section}>
                    <ThemedText style={styles.sectionTitle} title={true}>Details</ThemedText>

                    <View style={styles.detailRow}>
                        <Ionicons name="call-outline" size={25} color={Colors.primary} />
                        <ThemedText style={styles.detailText}>{item.contact || "No contact info"}</ThemedText>
                    </View>

                    <View style={styles.detailRow}>
                        <Ionicons name="cube-outline" size={25} color={Colors.primary} />
                        <ThemedText style={styles.detailText}>Condition: Pre-owned</ThemedText>
                    </View>
                </View>

                {/* Extra space at bottom to prevent footer overlap */}
                <View style={{ height: 50 }} />
            </ScrollView>
            {/* Footer */}
            {isUserPost ? (
                <View style={[styles.bottomBar, { backgroundColor: theme.background,justifyContent:"center" }]}>
                        <Pressable onPress={() => handleDelete(item)} style={[styles.contactBtn, { backgroundColor: Colors.warning }]}>
                            <Ionicons name='trash-outline' size={20} color="#fff" style={{ marginRight: 8 }} />
                            <Text style={styles.contactText} >deleted </Text>
                        </Pressable>
                </View>
            ) : (
                <View style={[styles.bottomBar, { backgroundColor: theme.background }]}>
                    <View style={styles.bottomPriceCol}>
                        <ThemedText style={styles.bottomLabel}> TotalPrice</ThemedText>
                        <ThemedText style={styles.bottomPrice}> $ {item.price}</ThemedText>
                    </View>
                    {/* contact btn */}
                    <Pressable onPress={() => handleSafeCall(item.contact)} style={[styles.contactBtn, { backgroundColor: Colors.primary }]}>
                        <Ionicons name='chatbubble-outline' size={20} color="#fff" style={{ marginRight: 8 }} />
                        <Text style={styles.contactText} >contact Seller </Text>
                    </Pressable>

                </View>)}
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        fontSize: 16,
        color: "#666",
    },
    //   image
    ImageWrapper: {
        position: "relative",
        width: "100%",
        height: 400,
    },
    mainImage: {
        width: "100%",
        resizeMode: "cover",
        height: "100%",
    }, mainImage: {
        width: "100%",
        resizeMode: "cover",
        height: "100%",
    },
    floatingHeader: {
        position: "absolute",
        top: 50,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        zIndex: 10,
    },
    iconBtn: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    //   Description
    sheet: {
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    scrollContent: {
        padding: 24,
    },
    topSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 20,
    },
    type: {
        fontSize: 13,
        color: Colors.primary,
        fontWeight: "700",
        letterSpacing: 1,
        marginBottom: 6,
    },
    price: {
        fontSize: 32,
        fontWeight: "900",
    },

    //  Thumbnails
    galleryContainer: {
        marginBottom: 24,
    },
    thumbnail: {
        width: 70,
        height: 70,
        borderRadius: 14,
        marginRight: 12,
        borderWidth: 2,
        borderColor: "transparent",
        backgroundColor: "#f5f5f5",
    },
    activeThumb: {
        borderColor: Colors.primary,
    },

    //  Sections
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 12,
    },
    sectionText: {
        fontSize: 16,
        lineHeight: 24,
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    detailText: {
        fontSize: 16,
        marginLeft: 12,
    },

    //bottom


    bottomBar: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 60,
        borderTopWidth: 1,
        borderColor: "#F0F0F0",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 10,
    },
    bottomPriceCol: {
        justifyContent: "center",
    },
    bottomLabel: {
        fontSize: 12,
        fontWeight: "600",
    },
    bottomPrice: {
        fontSize: 22,
        fontWeight: "800",
    },
    contactBtn: {
        flexDirection: "row",
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    contactText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
})