import { StyleSheet, Text, View, Image } from 'react-native'
import { Link } from "expo-router"
import React from 'react'
import ThemedView from '../components/ThemedView'
import ThemedLogo from '../components/ThemedLogo'
import ThemedText from '../components/ThemedText'
import Space from '../components/Space'
import { Colors } from '../constants/Colors'

const index = () => {
    return (
        <ThemedView style={styles.container}>
            <ThemedLogo />
            <ThemedText style={styles.title} title={true}>
                FURNI-TRADE
            </ThemedText>
            <ThemedText style={styles.subtitle}>
                Buy and Sell Pre-loved Furniture with ease
            </ThemedText>
            <Space height={40} />

            <Link href={"./login"} style={[styles.link,{backgroundColor:Colors.primary}]}>
                <ThemedText style={styles.buttonText}>
                    Login
                </ThemedText>
            </Link>

            <Space height={15} />

            <Link href={"./register"} style={[styles.link,styles.buttonSecondary]}>
                <ThemedText style={styles.buttonTextSecondary}>
                    Register
                </ThemedText>
            </Link>

        </ThemedView>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30
    },
    title: {
        fontSize: 28,
        fontWeight: 900,
        marginTop: 10,
        letterSpacing: 5
    },
    subtitle: {
        fontSize: 16,
        marginTop: 5,
    },
    link: {
        width: "100%",
        paddingVertical:15,
        borderRadius:12,
        alignItems:"center",
        justifyContent:"center",
        textAlign:"center"
    },
    buttonSecondary:{
        borderWidth:1,
        borderColor:Colors.primary,
    },
    buttonText:{
        fontSize:17,
        color:"#fff",
        fontWeight:800
    },
    buttonTextSecondary:{
        color:Colors.primary,
        fontWeight:800,
        fontSize:17
    }


})
