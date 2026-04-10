import { createContext, useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { storage, BUCKET_ID } from "../lib/appwrite";
import { ID } from "react-native-appwrite";
import { db } from "../lib/firebase";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { push } from "expo-router/build/global-state/routing";
import { query, orderBy, onSnapshot } from "firebase/firestore";

export const ItemsContext = createContext()

export function ItemsProvider({ children }) {

    const [items, setItems] = useState([])
    const [favorites, setFavorites] = useState([])
    const { user } = useUser()

    //appwrite 
    async function uploadImages(images) {

        try {
            const uploadImagesIds = []

            for (let i = 0; i < images.length; i++) {
                const img = images[i]
                console.log("1step image upload", img.uri)

                const renponseFetch = await fetch(img.uri)
                const blob = await renponseFetch.blob()

                const ext = img.uri.split('.').pop()

                const file = {
                    name: `image_${Date.now()}.${ext}`,
                    type: blob.type || `image/${ext}`,
                    size: blob.size,
                    uri: img.uri,
                }

                const uploaded = await storage.createFile(
                    BUCKET_ID,
                    ID.unique(),
                    file
                )
                console.log("step2 Uploaded", uploaded)

                if (!uploaded || !uploaded.$id) {
                    throw new Error("Uploaded Failed")
                }

                uploadImagesIds.push(uploaded.$id)

            }

            return uploadImagesIds

        } catch (err) {
            throw err
        }

    }

    //firebase
    async function createItem(data) {
        const { furnitureType, description, price, contact, images } = data

        //upload images
        const imageIds = await uploadImages(images)
        //save firestore
        const docRef = await addDoc(collection(db, "posts"), {
            furnitureType,
            contact,
            description,
            price: Number(price),
            images: imageIds,
            userId: user.uid,
            createdAt: new Date(),
        })
    }
    //change id to url

    function addImageUrls(rows) {
        return rows.map((item) => ({
            ...item,
            imageUrls: (item.images || []).map(
                (filedId) =>
      //  //example=>
        //`https://sp.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${filedId}/view?project=69bf8cac00097f4b1848`
                      `projectEndPoint/storage/buckets/${BUCKET_ID}/files/${filedId}/view?project=projectId`
            )
        }))
    }


    function fetchAllFurnitue() {
        const q = query(
            collection(db, "posts"),
            orderBy("createdAt", "desc")
        )
        //listen in real-time
        const unsubscribe = onSnapshot(q, (snapshot) => {

            const fetchedItems = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            //add image url
            setItems(addImageUrls(fetchedItems))
        })
        return unsubscribe
    }

    async function toggleFavourite(postId, isFav) {
        try {
            const favRef = doc(db, "users", user.uid, "favorites", postId)

            if (isFav) {
                await deleteDoc(favRef)
            } else {
                await setDoc(favRef, {
                    postId,
                    createdAt: new Date(),
                })
            }

        } catch (err) {
            console.log("Fav Err:", err)
        }
    }

    function fetchFavourite() {
        const favRef = collection(db, "users", user.uid, "favorites")

        return onSnapshot(favRef, (snapshot) => {
            const favIds =snapshot.docs.map(doc=>doc.id)

            setFavorites(favIds)
         })

    }

    // appwrite delete images
    async function deleteImages(imageIds){
        for (const id of imageIds){
            await storage.deleteFile(BUCKET_ID,id)
        }
    }

    //firebase delete
    async function deleteItem(item) {
        try{
            console.log("Items",item)
            await deleteImages(item.images)
            await deleteDoc(doc(db,"posts",item.id))

        }catch(error){
            console.log("Delete error",error)
        }
    }

    useEffect(() => {
        if (!user) return;

        const unsubscribe = fetchAllFurnitue();
         const unsubFavs=fetchFavourite()

        return ()=>{
            unsubscribe()
            unsubFavs()
        }

    }, [user])

    return (
        <ItemsContext.Provider value={{ items, createItem, toggleFavourite, favorites,deleteItem}}>
            {children}
        </ItemsContext.Provider>
    )


}
