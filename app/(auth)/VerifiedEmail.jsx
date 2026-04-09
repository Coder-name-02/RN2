
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Built into Expo
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';

const VerifiedEmail = () => {

    const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        {/* Icon for visual engagement */}
        <Ionicons name="mail-unread-outline" size={80} color={Colors.primary} />

        <ThemedText style={styles.title} title={true}>Check your email</ThemedText>
        
        <ThemedText style={styles.description}>
          We've sent a verification link to your email address. 
          Please click the link to activate your account.
        </ThemedText>
        <ThemedText style={styles.description}>
          Also Check the Spam Folder
        </ThemedText>

        <ThemedText style={styles.titleTwo} title={true}>Already VerifiedEmail</ThemedText>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push("/login")}
        >
          <Text style={styles.buttonText}>Go to Login</Text>
        </TouchableOpacity>

        
      </View>
    </ThemedView>
  );
};

export default VerifiedEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    justifyContent:"center",
    padding: 20,
  },
  content: {
    width:"100%",
    justifyContent: "center",
    alignItems: "center",
    maxWidth:400,
  },
  title: {
    fontSize: 24,
    fontWeight: 800,
    marginTop: 20,
    marginBottom: 10,
  },
   titleTwo: {
    fontSize: 16,
    fontWeight:600,
    marginTop: 20,
    marginBottom: 10,
    alignSelf:"flex-start"
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});
