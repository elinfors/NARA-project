import 'react-native-gesture-handler';
import React, { useEffect, useState, createContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//import { LoginScreen, HomeScreen, RegistrationScreen } from './Screens'
import LoginScreen from "./Screens/LoginScreen/LoginScreen"
import HomeScreen from "./Screens/HomeScreen/HomeScreen"
import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen"
import MealPlan from './Screens/MealPlan/MealPlan'
import AddModal from './Screens/AddModalScreen/AddModalScreen'
import {firebase} from './Screens/Firebase/config'
import {decode, encode} from 'base-64'
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditMealPlan from './Screens/MealPlan/EditMealPlan'


if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

export const CurrentUserContext = createContext();
export const ModalVisibleContext = createContext();
export const CurrentMealContext = createContext();
export const MealPlanContext = createContext();
export const EditModalContext = createContext();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AddModalComponent = () =>{
  return null
}
const EditModalComponent = () =>{
  return null
}


export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [initializing,setInitializing]=useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [currentMeal, setCurrentMeal] = useState(null)
  const [currentStage, setCurrentStage] = useState(0)

  //Meal plan context
  const [mealPlan, setMealPlan] = useState([{name:'Breakfast', time:'07:00'}, {name:'Snack', time:'10.00'},{name:'Lunch', time:'12:00'}, {name: 'Snack', time:'15:00'}, {name:'Dinner', time:'19:00'}, {name:'Snack', time:'21:00'}])
  const [currentMealEdit, setCurrentMealEdit] = useState(null)

  // Edit modal context
  const [editModalVisible, setEditModalVisible] = useState(false)

  
  function toggleVisible () {
    setModalVisible(visible => !visible);
  }
  
  mealPlanStack = () =>{
    return(
      <Stack.Navigator>
        <Stack.Screen name="Meal Plan" component = {MealPlan}></Stack.Screen>
        <Stack.Screen name="Edit" component={EditMealPlan}></Stack.Screen>
      </Stack.Navigator>
    )
  }

  createBottomTabs = () => {
    return(
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }
            else if (route.name === 'Meal Plan'){
              iconName = focused ? 'ios-create' : 'ios-create';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name = 'Home' component = {HomeScreen}/>
        <Tab.Screen name = 'Meal Plan' component = {MealPlan}/>
        <Tab.Screen name = 'Edit' component = {EditModalComponent} options = {{
        tabBarButton: ()=>(<EditMealPlan/>),}}/>
        <Tab.Screen name = 'Add' component = {AddModalComponent} options = {{
          tabBarButton: ()=>(<AddModal/>),}}/>

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
      <ModalVisibleContext.Provider value={{modalVisible, setModalVisible, toggleVisible}}>
        <CurrentMealContext.Provider value={{currentMeal, setCurrentMeal, currentStage, setCurrentStage}}>
          <EditModalContext.Provider value={{editModalVisible, setEditModalVisible}}>
            <MealPlanContext.Provider value={{mealPlan, setMealPlan, currentMealEdit, setCurrentMealEdit}}>
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
            </MealPlanContext.Provider>
          </EditModalContext.Provider>
        </CurrentMealContext.Provider>
      </ModalVisibleContext.Provider>
    </CurrentUserContext.Provider>

  );
}