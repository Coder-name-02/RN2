import {
  StyleSheet, Text, View,
  Keyboard, TouchableNativeFeedback,
  ScrollView, Image, useColorScheme,
  TouchableWithoutFeedback,KeyboardAvoidingView,Platform
} from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { Dropdown } from "react-native-element-dropdown"
import { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from "expo-image-picker"
import { Alert } from 'react-native'
import { useItem } from '../hooks/useItem'
//Themed
import Space from '../components/Space'
import ThemedButton from '../components/ThemedButton'
import ThemedText from '../components/ThemedText'
import ThemedView from '../components/ThemedView'
import ThemedTextInput from "../components/ThemedTextInput"
import { Colors } from '../constants/Colors'
import { useUser } from '../hooks/useUser'
import { deleteField } from 'firebase/firestore'

const FURNITURE_TYPES = [
  { label: 'Chair', value: 'chair' },
  { label: 'Table', value: 'table' },
  { label: 'Sofa', value: 'sofa' },
  { label: 'Bed', value: 'bed' },
  { label: 'Cabinet', value: 'cabinet' },
  { label: 'Desk', value: 'desk' },
  { label: 'Other', value: 'other' },
];


const createModal = () => {

  const [images, setImages] = useState([])
  const [contact, setContact] = useState("")
  const [price, setPrice] = useState("")
  const [furnitureType, setFurnitureType] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isFocus, setIsFocus] = useState(false);

  const { user } = useUser()
  const router = useRouter()
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  const {createItem}=useItem()

 const handleSubmit= async()=>{

  setError(null)

  if(!furnitureType.trim()) return setError("Furniture can't be empty")
  if (!description.trim()) return setError("Description can't be empty")
  if (!price || price <= 0) return setError("Price can't be empty")
  if (!contact.trim()) return setError("Contact can't be empty")
  if (!images || images.length === 0)
    return setError("Please upload at least one image")

  setLoading(true)
  try{
    await createItem({
      furnitureType,
      description,
      price,
      contact,
      images
    })

    //reset
    setFurnitureType("")
    setDescription("")
    setPrice("")
    setContact("")
    setImages([])

    router.replace("/home")
  }catch(error){
    setError("Upload failed")
    console.log("Submit Error",error)
  }

  setLoading(false)
 }

  async function pickImage() {

    console.log("image press")

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permission.granted) {
      Alert.alert("permission required")
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 3 - images.length,
      quality: 0.7
    });

    if (result.canceled) { return; }

    const selectedImages = result.assets.map((asset) => ({
      uri: asset.uri
    }))

    setImages((prev) => [...prev, ...selectedImages])

    console.log("Image Add:", selectedImages)


  }


  function removeImage(index) {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    )
  }

  return (
    <KeyboardAvoidingView style={{flex:1}}
    behavior={Platform.OS === "ios"?"padding":"height"}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container} safe={true}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.scrollContent}>


            {/*  */}
            <View style={styles.contentWrapper}>
              {/* header */}
              <View style={styles.header}>
                <ThemedText style={styles.title}>New Listing</ThemedText>
                <ThemedText style={styles.subtitle}>Turn Your Unused furniture into Cash</ThemedText>
              </View>
              {/* image */}
              <View style={styles.card}>
                <ThemedText style={styles.cardLabel}>Products Photos</ThemedText>
                <Text style={styles.cardText}>Add up to 3 photos of your item</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageRows}>
                  {images.map((img, index) => (
                    <View key={index} style={styles.imageWrapper}>
                      <Image source={{ uri: img.uri }} style={styles.thumbnail} />
                      <TouchableOpacity onPress={() => removeImage(index)} style={styles.removeBtn}>
                        <Ionicons name='close' size={14} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  ))}

                  {
                    images.length < 3 && (
                      <TouchableOpacity style={styles.uploadPlaceholder} onPress={pickImage}>
                        <Ionicons name="camera-outline" size={32} color={Colors.primary} />
                      </TouchableOpacity>)
                  }



                </ScrollView>
              </View>

              {/* card 1 */}
              <View style={styles.card}>
                <ThemedText style={styles.cardLabel}>Item Information</ThemedText>
                <View style={styles.inputGroup}>
                  <Text style={styles.fieldLabel}>Furniture Category</Text>
                  <Dropdown
                    placeholder={!isFocus ? "Select Category" : "..."}
                    data={FURNITURE_TYPES}
                    labelField="label"
                    valueField="value"
                    maxHeight={300}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    search
                    searchPlaceholder='Search ...'
                    onChange={item => {
                      setFurnitureType(item.value)
                      setIsFocus(false)
                    }}
                    value={furnitureType}
                    style={[styles.dropdown, isFocus && { borderColor: Colors.primary }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    renderLeftIcon={() => (
                      <Ionicons name="grid-outline" size={20} style={styles.icon}
                        color={isFocus ? Colors.primary : "gray"}
                      />
                    )}
                  />
                </View>
                {/* input1 */}
                <View style={styles.inputGroup}>
                  <Text style={styles.fieldLabel}>Price</Text>
                  <ThemedTextInput style={styles.input} value={price} placeholder="0.000"
                    onChangeText={setPrice} keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.fieldLabel}>Detailed Description</Text>
                  <ThemedTextInput
                    style={styles.multiline}
                    placeholder="Describe condition, dimensions, and color..."
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={4}
                  />
                </View>

              </View>

              {/* card 2 */}
              <View style={styles.card}>
                <ThemedText style={styles.cardLabel}>Contact Details</ThemedText>
                <View style={styles.inputGroup}>
                  <Text style={styles.fieldLabel}>Phone Number</Text>
                  <ThemedTextInput
                    style={styles.input}
                    placeholder="+1 234 567 890"
                    value={contact}
                    onChangeText={setContact}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
              { error && <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
                </View>}

              <ThemedButton onPress={handleSubmit} style={styles.submitBtn} disabled={loading}>
                <Text style={styles.buttonText}> 
                {loading?"Publishing ...":"Publish Listing"}
                </Text>
              </ThemedButton>

            </View>
          </View>
        </ScrollView>
      </ThemedView>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  )
}

export default createModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 40
  }, contentWrapper: {
    width: "92%",
    maxWidth: 400
  }, header: {
    marginBottom: 24,
    paddingLeft: 4
  }, title: {
    fontSize: 32,
    fontWeight: 800,
    color: Colors.primary
  }, subtitle: {
    fontSize: 16,
    marginTop: 4,
  }, card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#c3c3c3",
    elevation: 3
  }, cardLabel: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    marginLeft: 4
  }, fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    marginBottom: 8,
    marginLeft: 4
  }, inputGroup: {
    marginBottom: 18
  }, input: {
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: "#fafafa",
    borderColor: "#E0E0E0",
    fontSize: 17
  }, multiline: {
    width: "100%",
    minHeight: 100,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
    fontSize: 16,
  },
  submitBtn: {
    height: 60,
    borderRadius: 15,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: '700',
  },
  // dropdown
  dropdown: {
    height: 55,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#FAFAFA"
  }, placeholderStyle: {
    fontSize: 16,
    color: "#999"
  }, selectedTextStyle: {
    fontSize: 16
  }, inputSearchStyle: {
    height: 50,
    fontSize: 16,
    borderRadius: 8
  }, icon: {
    marginRight: 8
  },
  //image
  cardText: {
    fontSize: 13,
    color: "#999",
    marginBottom: 16
  }, uploadPlaceholder: {
    width: 85,
    height: 85,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderColor: "#E0E0E0",
    borderStyle: "dashed"
  }, thumbnail: {
    width: 85,
    height: 85,
    borderRadius: 15,
  }, imageWrapper: {
    marginRight: 12
    , position: "relative"
  },
  imageRows: {
    overflow: "visible",
  },
   removeBtn: {
    position: "absolute",
    top: -8,
    right: -8,
    height: 24,
    width: 24,
    backgroundColor: "#ff5352",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10
  },
      errorBox: {
    backgroundColor: '#FFF1F1',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFD1D1',
  },
  errorText: {
    color: '#FF5252',
    textAlign: 'center',
    fontWeight: '600',
  }

})
