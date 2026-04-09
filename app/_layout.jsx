


import { UserProvider } from '../Context/UserContext'
import { ItemsProvider } from '../Context/ItemsContext'
import AuthNavigathor from './AuthNavigator'

const RootLayout = () => {
  return (
    <UserProvider>
    <ItemsProvider>
      <AuthNavigathor />
    </ItemsProvider>
    </UserProvider>
  )
}

export default RootLayout

