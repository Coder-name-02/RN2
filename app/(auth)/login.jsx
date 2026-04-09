import {React, useState }from 'react'
import { StyleSheet,Pressable,Text,View,TouchableWithoutFeedback,Keyboard,} from 'react-native'
import { Link } from 'expo-router'
import {Ionicons} from "@expo/vector-icons"
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Space from '../../components/Space'
import ThemedButton from '../../components/ThemedButton'
import { Colors } from '../../constants/Colors'
import ThemedTextInput from '../../components/ThemedTextInput'
import { useUser } from '../../hooks/useUser'

const Login = () => {

  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[showPassword,setShowPassword]=useState(false)
   const [errors,setErrors]=useState({})
   const {login}=useUser()

  const handleSubmit=async ()=>{
    try{
      const message=await login(email,password)
     // alert(message)
    }catch(error){
//alert(error)
      const firebaseErrors={}

      if(error.message === "Please Verified Email First"){
         firebaseErrors.email = "Please Verified Email First"
      }

if(error.code === "auth/invalid-email"){
    firebaseErrors.email = "Invalid email or password format"
     firebaseErrors.password = "Invalid email or password format"
}
if(error.code === "auth/missing-password"){
    firebaseErrors.email = "Invalid email format"
}

setErrors(firebaseErrors)
    }
  }

  return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//     <ThemedView style={styles.container}>
//       <ThemedText title={true} style={styles.title}>login Page</ThemedText>
//      <Space />
//      <ThemedTextInput placeholder='name@gmail.com' style={styles.authInput}
//      onChangeText={setEmail}    value={email}
//      />
//       <Space />
//       {/* password */}
//       <View style={styles.passwordContainer}>
//       <ThemedTextInput placeholder='Password' style={styles.passwordInput}
//      onChangeText={setPassword}    value={password} secureTextEntry={!showPassword}
//      />
//      <Pressable style={styles.eyeIcon} onPress={()=> setShowPassword(!showPassword) }>
//         <Ionicons  name={showPassword?"eye":"eye-off" } size={26} color="gray"/>
//      </Pressable>
//       </View>
     
//       <Space />
//     <ThemedButton onPress={handleSubmit}>
//       <Text style={{color:"#fff"}}> Login </Text>
//     </ThemedButton>

// <Text>Don't have an account?
//   <Link href={"/register"}>
//         <ThemedText>SignUp</ThemedText>
//      </Link>
// </Text>
//     </ThemedView>
//     </TouchableWithoutFeedback>

   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <View style={styles.contentWrapper}>

          {/* Header Section */}
          <View style={styles.header}>
            <ThemedText style={styles.title}>Welcome Back</ThemedText>
            <ThemedText style={styles.subtitle}>Sign in to continue to your account</ThemedText>
          </View>

          <View style={styles.form}>
            {/* Email*/}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Email Address</ThemedText>
            

              <ThemedTextInput
                placeholder="name@gmail.com"
                autoCapitalize="none"
                style={[styles.auth, errors.email && styles.errorInput]}
                onChangeText={(text) => {
                  setEmail(text)
                  setErrors(prev => ({ ...prev, email: null }))
                }}
                value={email}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            {/* Password*/}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Password</ThemedText>
              <View style={styles.passwordContainer}>
                <ThemedTextInput
                  placeholder='Password'
                  style={[styles.auth, errors.password && styles.errorInput]}
                  onChangeText={(text) => {
                    setPassword(text)
                    setErrors(prev => ({ ...prev, password: null }))
                  }}
                  value={password}
                  secureTextEntry={!showPassword}
                />
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                <Pressable
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={22}
                    color="#999"
                  />
                </Pressable>
              </View>
            </View>

            <Space size={10} />

            <ThemedButton onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </ThemedButton>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <Link href={"/register"}>
                <ThemedText style={styles.signUpLink}>Sign Up</ThemedText>
              </Link>
            </View>
          </View>

        </View>
      </ThemedView>
    </TouchableWithoutFeedback>

  )
}

export default Login

const styles = StyleSheet.create({
  // container:{
  //   flex:1,
  //   justifyContent:"center",
  //   alignItems:"center"
  // },
  // title:{
  //   textAlign:"center",
  //   fontSize:18,
  // },authInput:{
  //   width:"85%",
  //   maxWidth:400,
  //   fontSize:16
  // },passwordContainer:{
  //    width:"85%",
  //   maxWidth:400,
  //   position:"relative"
  // },passwordInput:{
  //   fontSize:16,
  //   paddingRight:60
  // },eyeIcon:{
  //   position:"absolute",
  //   right:0,
  //   padding:16,
  //   top:0
  // }
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 400,
  },
  header: {
    marginBottom: 40,
    alignItems: 'flex-start',
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.primary,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.6,
    marginTop: 8,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  auth: {
    width: "100%",
    height: 60,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  passwordContainer: {
    width: "100%",
    position: "relative",
    justifyContent: 'center',
  },
  passwordInput: {
    width: "100%",
    height: 55,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingRight: 50, 
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
 eyeIcon: {
  position: "absolute",
  right: 0,
  // backgroundColor:"#ffffff",
  top: 1,
  padding:17
},
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: '600',
     textAlign:"center",
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#666',
    fontSize: 15,
  },
  signUpLink: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 15,
  },
  errorInput: {
    borderColor: "#FF5252",
  },
  errorText: {
    color: "#FF5252",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
})

