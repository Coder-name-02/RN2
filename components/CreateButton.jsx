
import { Pressable, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function CreateTabButton() {
    const router = useRouter();

    return (
        <Pressable
            style={styles.wrapper}
            onPress={() => router.push("/createModal")}
        >
            <View style={styles.btn}>
                <Ionicons name="add" size={30} color="white" />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        top: -25,
        justifyContent: "center",
        alignItems: "center",
    },
    btn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center"
    },
});