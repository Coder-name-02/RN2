
import { Image, useColorScheme } from 'react-native'
// images
import DarkLogo from '../assets/furniture_move.png'
import LightLogo from  '../assets/furniture_move.png'

const ThemedLogo = () => {
  const colorScheme = useColorScheme()
  
  const logo = colorScheme === 'dark' ? DarkLogo : LightLogo

  return (
    <Image source={logo}   style={{ 
         width:"80%",
         maxWidth: 500,
         height:"25%",
         resizeMode:"center"
        }} />
  )
}

export default ThemedLogo