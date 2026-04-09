import {React, useState }from 'react'
import { StyleSheet,Pressable,Text,TouchableWithoutFeedback,Keyboard, View} from 'react-native'
import { Link, useRouter } from 'expo-router'
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Space from '../../components/Space'
import ThemedButton from '../../components/ThemedButton'
import ThemedTextInput from '../../components/ThemedTextInput'
import Checkbox from "expo-checkbox"
import { Colors } from '../../constants/Colors'
import { useUser } from "../../hooks/useUser"


const Register = () => {

  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
   const[confirmPassword,setConfirmPassword]=useState("")
    const[showPassword,setShowPassword]=useState(false)
    const [errors,setErrors]=useState({})

     const {register}=useUser();
     const router=useRouter()

  const handleSubmit=async ()=>{
   
    let newErrors={}

    if(!email.trim()){
      newErrors.email="Email is required"
    }
    if(!password.trim()){
      newErrors.password="Password is required"
    }
    if(!confirmPassword.trim()){
      newErrors.confirmPassword="Confrim Password is required"
    }

    //
    if(email && !email.endsWith("@gmail.com")){
      newErrors.email="Must Include @gmail.com"
    }


    //Strong Password
     const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
     
     if(password && !passwordRegex.test(password) ){
      newErrors.password="Min 8,a-z,A-Z,0-9,Special Char"
     }

     //Confirm Password
     if(password && confirmPassword && password !== confirmPassword){
      newErrors.confirmPassword="Passwords do not Match"
     }
     
     setErrors(newErrors)

     if(Object.keys(newErrors).length === 0){
      try{
        const message = await register(email, password);
      // alert(message);
         router.push("VerifiedEmail")
      }catch (err){
       // alert(err.code)
        let firebaseErrors={}

        if(err.code === "auth/email-already-in-use"){
          // firebaseErrors.email="Email Already In use"
             firebaseErrors.email = "This email is already registered"
        }
        
        if (err.code === "auth/invalid-email") {
          firebaseErrors.email = "Invalid email format"
        }

        if (err.code === "auth/weak-password") {
          firebaseErrors.password = "Password is too weak"
        }

          setErrors(firebaseErrors)

      }

     }

  }

  return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//     <ThemedView style={styles.container}>
//       <ThemedText title={true} style={styles.title}>Register Page</ThemedText>
//      <Space />


//      <ThemedTextInput placeholder='name@gmail.com'  value={email} 
//      style={[styles.authInput,errors.email && styles.errorInput]}
//      onChangeText={
//       (text)=> { 
//         setEmail(text) 
//         setErrors(prev=>({...prev,email:null}))
//         } 
//       }   
//      />
//      {/* errorText */}
//      {errors.email &&( <Text style={styles.errorText}>{errors.email}</Text>)}
    

//       <Space />
//       <ThemedTextInput placeholder='password'  value={password} secureTextEntry={!showPassword}
//      style={[styles.authInput,errors.password && styles.errorInput]}
//      onChangeText={
//       (text)=> { 
//         setPassword(text) 
//         setErrors(prev=>({...prev,password:null}))
//         } 
//       }   
//      />
//      {/* errorText */}
//      {errors.password &&( <Text style={styles.errorText}>{errors.password}</Text>)}
//       <Space />

//       <ThemedTextInput placeholder='Confirmpassword'  value={confirmPassword} secureTextEntry={!showPassword}
//      style={[styles.authInput,errors.confirmPassword && styles.errorInput]}
//      onChangeText={
//       (text)=> { 
//         setConfirmPassword(text) 
//         setErrors(prev=>({...prev,confirmPassword:null}))
//         } 
//       }   
//      />
//      {/* errorText */}
//      {errors.confirmPassword &&( <Text style={styles.errorText}>{errors.confirmPassword}</Text>)}
//       <Space />
//       <View style={styles.checkboxContainer}>
//       <Checkbox  value={showPassword}
//       color={Colors.primary}
//             onValueChange={setShowPassword}
//       />
//       <Text style={{marginLeft:8}}>Show Password</Text>
//       </View>
      

//     <ThemedButton onPress={handleSubmit}>
//       <Text style={{color:"#fff"}}> SignUp</Text>
//     </ThemedButton>

// <Text>Already have an account?
//   <Link href={"/login"}>
//         <ThemedText>SignIn</ThemedText>
//      </Link>
// </Text>



//     </ThemedView>
//     </TouchableWithoutFeedback>
 <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        {/* Max Width Wrapper */}
        <View style={styles.contentWrapper}>
          
          <View style={styles.header}>
            <ThemedText style={styles.title}>Create Account</ThemedText>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Email Address</ThemedText>
              <ThemedTextInput
                placeholder="name@gmail.com"
                style={[styles.auth, errors.email && styles.errorInput]}
                onChangeText={(text) => {
                  setEmail(text)
                  setErrors(prev => ({ ...prev, email: null }))
                }}
                value={email}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Password</ThemedText>
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
            </View>

            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Confirm Password</ThemedText>
              <ThemedTextInput
                placeholder='Confirm Password'
                style={[styles.auth, errors.confirmPassword && styles.errorInput]}
                onChangeText={(text) => {
                  setConfirmPassword(text)
                  setErrors(prev => ({ ...prev, confirmPassword: null }))
                }}
                value={confirmPassword}
                secureTextEntry={!showPassword}
              />
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                value={showPassword}
                onValueChange={setShowPassword}
                color={Colors.primary}
              />
              <ThemedText style={styles.checkboxLabel}>Show Password</ThemedText>
            </View>

            <Space size={24} />

            <ThemedButton onPress={handleSubmit}>
              <Text style={styles.buttonText}>Register</Text>
            </ThemedButton>

            <View style={styles.footer}>
              <ThemedText>Already have an account? </ThemedText>
              <Link href={"/login"}>
                <Text style={styles.signInLink}>Sign In</Text>
              </Link>
            </View>
          </View>
        </View>
      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default Register

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
  // },checkboxContainer:{
  //   flexDirection:"row",
  //   width:"85%",
  //   maxWidth:400,
  //   alignItems:"center"
  // },errorText:{
  //   color:"red",
  //     width:"85%",
  //   maxWidth:400,
  //   fontSize:12,
  //   marginTop:4
  // },
  // errorInput:{
  //   borderColor:"red",
  //   borderWidth:1
  // }
   container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',  
    paddingHorizontal: 20,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 400,            
  },
  header: {
    marginBottom: 32,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginLeft: 4,
  },
  auth: {
    width: "100%",
    height: 60,
    borderRadius: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#8484848c',
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign:"center",
    fontWeight: '600',
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInLink: {
    color: Colors.primary,
    fontWeight: 'bold',
  }

})