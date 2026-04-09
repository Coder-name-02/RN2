
import { StyleSheet } from 'react-native'

import Space from "../../components/Space"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"

const Create = () => {
  return (
    <ThemedView style={styles.container} safe={true}>

      <ThemedText title={true} style={styles.heading}>
       Create
      </ThemedText>
      <Space />

    </ThemedView>
  )
}

export default Create

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
   textAlign:"center"
  },
})
