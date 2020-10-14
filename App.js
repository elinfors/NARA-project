import 'react-native-gesture-handler';
import React, { useEffect, useState, createContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { LoginScreen, HomeScreen, RegistrationScreen } from './Screens'
import {firebase} from './Screens/Firebase/config'
import {decode, encode} from 'base-64'
import AddScreen from './Screens/AddScreen/AddScreen';

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

export const CurrentUserContext = React.createContext();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [initializing,setInitializing]=useState(true)

  createBottomTabs = () => {
    return(
      <Tab.Navigator>
        <Tab.Screen name = 'Home' component = {HomeScreen}/>
        <Tab.Screen name = 'Add' component = {AddScreen}/>
      </Tab.Navigator>
    )
  }
 
  useEffect(()=>{
    
      const subscriber=firebase.auth().onAuthStateChanged((user)=>{  
        setUser(user)
        setInitializing(false)
      })
      //console.log(user)
      //console.log(user.email)

      return subscriber
    }, [])

  if (initializing) return null  //Here you may use an Activity indicator

  return (
    <CurrentUserContext.Provider value = {{user}}>
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen name="Home" children={createBottomTabs}>
            {/*{props => <HomeScreen {...props} extraData={user} />}*/}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Registration" component={RegistrationScreen} />
              </>
          )}
          </Stack.Navigator>
      </NavigationContainer>
    </CurrentUserContext.Provider>

  );
}