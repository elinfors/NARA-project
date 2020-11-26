import 'react-native-gesture-handler';
import React, { useEffect, useState, createContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import moment from 'moment';


//import { LoginScreen, HomeScreen, RegistrationScreen } from './Screens'
import LoginScreen from "./Screens/LoginScreen/LoginScreen"
import HomeScreen from "./Screens/HomeScreen/HomeScreen"
import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen"
import MealPlan from './Screens/MealPlan/MealPlan'
import AddModal from './Screens/AddModalScreen/AddModalScreen'
import OverviewScreen from './Screens/OverviewScreen/OverviewScreen'
import AddMealModal from './Screens/MealPlan/AddMealModal'
import {firebase} from './Screens/Firebase/config'
import {decode, encode} from 'base-64'
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditMealPlan from './Screens/MealPlan/EditMealPlan'
import PrevReg from './Screens/PrevReg/PrevReg'
import Statistics from './Screens/Statistics/statistics'


if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

export const CurrentUserContext = createContext();
export const ModalVisibleContext = createContext();
export const CurrentMealContext = createContext();
export const MealPlanContext = createContext();
export const EditModalContext = createContext();
export const AddMealplanContext = createContext();
export const RegMealContext = createContext();
export const ChooseDateContex = createContext();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const OverviewStack = createStackNavigator();

const AddModalComponent = () =>{
  return null
}
const EditModalComponent = () =>{
  return null
}
const MealplanAddComponent = () =>{
  return null
}


export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [initializing,setInitializing]=useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [currentMeal, setCurrentMeal] = useState(null)
  const [currentStage, setCurrentStage] = useState(0)
  const [mealPlan, setMealPlan] = useState([])

  const [regMeal, setRegMeal] = useState({})
  const [choosenDate, setChoosenDate] = useState(moment().utcOffset('+01:00').format('YYYY-MM-DD'))


  //Meal plan context
  //const [mealPlan, setMealPlan] = useState([{name:'Breakfast', time:'07:00'}, {name:'Snack', time:'10.00'},{name:'Lunch', time:'12:00'}, {name: 'Snack', time:'15:00'}, {name:'Dinner', time:'19:00'}, {name:'Snack', time:'21:00'}])
  const [currentMealEdit, setCurrentMealEdit] = useState(null)

  // Edit modal context
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [addModalVisible, setAddModalVisible] = useState(false)

  
  function toggleVisible () {
    setModalVisible(visible => !visible);
  }

  useEffect(()=>{
    setMealPlan(mealPlan)
  
},[])
  
  mealPlanStack = () =>{
    return(
      <Stack.Navigator>
        <Stack.Screen name="Meal Plan" component = {MealPlan}></Stack.Screen>
        <Stack.Screen name="Edit" component={EditMealPlan}></Stack.Screen>
      </Stack.Navigator>
    )
  }

  overViewStack = () =>{
    return(
      <OverviewStack.Navigator>
        <OverviewStack.Screen name="Overview Stack" component = {OverviewScreen}></OverviewStack.Screen>
        <OverviewStack.Screen name="PrevReg" component={PrevReg}></OverviewStack.Screen>
        <OverviewStack.Screen name="Statistics" component={Statistics}></OverviewStack.Screen>
      </OverviewStack.Navigator>
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
            } 
            else if (route.name === 'Meal Plan'){
              iconName = focused ? 'ios-create' : 'ios-create';
            }
            else if (route.name === 'Overview'){
              iconName = focused ? 'ios-stats-chart' : 'ios-stats-chart';
            }
            else if (route.name === 'Settings') {
              iconName = focused ? 'ios-settings' : 'ios-settings';
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
        <Tab.Screen name = 'Overview' component = {overViewStack}/>
          
        <Tab.Screen name = 'Settings' component = {HomeScreen}/>


      </Tab.Navigator>
    )
  }

  const setSubscriber = () =>{
    const subscriber=firebase.auth().onAuthStateChanged((user)=>{  
      setUser(user)
      setInitializing(false)
      mealPlanExists(user)
    })
    return subscriber
  }

  const mealPlanExists = (user) =>{
    var mealplanExistsRef = firebase.firestore().collection('users').doc(user.uid)
    .collection('mealplan')

    mealplanExistsRef.onSnapshot(function(querySnapshot){
        var mealplanList = []
        querySnapshot.forEach(function(doc){
            mealplanList.push({name: doc.data().name, time: doc.data().time, notification: doc.data().notification, id: doc.data().id, notificationTime:doc.data().notificationTime})
        })

          if(mealplanList.length === 0){
            return createMealPlan(user)
          }
          else{
            return setMealPlan(mealplanList) 
            
          }
        //setMealPlan(mealplanList)
       

    })


  }

  const createMealPlan = (user) =>{

          var mealplanRef = firebase.firestore().collection('users').doc(user.uid)
          .collection('mealplan')
        

          mealplanRef.doc('Breakfast').set({
          name:'Breakfast',
          time:'07:00',
          notification: true,
          notificationTime: '0:15',
          id: 'Breakfast'

          })
          .then(function(){
              console.log('success')
          })
          .catch(function(error){
              console.log('error: ', error)
          })

          mealplanRef.doc("Snack1").set({
            name:'Snack',
            time:'11:00',
            notification: true,
            notificationTime: '0:15',
            id: "Snack1"

        })
        .then(function(){
            console.log('success')
        })
        .catch(function(error){
            console.log('error: ', error)
        })

        mealplanRef.doc("Lunch").set({
          name:'Lunch',
          time:'13:00',
          notification: true,
          notificationTime: '0:15',
          id: "Lunch"

        })
        .then(function(){
            console.log('success')
        })
        .catch(function(error){
            console.log('error: ', error)
        })

        mealplanRef.doc("Snack2").set({
          name:'Snack',
          time:'16:00',
          notification: true,
          notificationTime: '0:15',
          id: "Snack2"

        })
        .then(function(){
            console.log('success')
        })
        .catch(function(error){
            console.log('error: ', error)
        })
        mealplanRef.doc("Dinner").set({
          name:'Dinner',
          time:'19:00',
          notification: true,
          notificationTime: '0:15',
          id: "Dinner"

        })
        .then(function(){
            console.log('success')
        })
        .catch(function(error){
            console.log('error: ', error)
        })
        mealplanRef.doc("Snack3").set({
          name:'Snack',
          time:'21:00',
          notification: true,
          notificationTime: '0:15',
          id: "Snack3"

        })
        .then(function(){
            console.log('success')
        })
        .catch(function(error){
            console.log('error: ', error)
        })
      

  
  }

  useEffect(()=>{
    setSubscriber()
    
    

    }, [])

  if (initializing) return null  //Here you may use an Activity indicator

  return (
    <CurrentUserContext.Provider value = {{user}}>
      <ModalVisibleContext.Provider value={{modalVisible, setModalVisible, toggleVisible}}>
        <CurrentMealContext.Provider value={{currentMeal, setCurrentMeal, currentStage, setCurrentStage}}>
          <EditModalContext.Provider value={{editModalVisible, setEditModalVisible}}>
            <AddMealplanContext.Provider value ={{addModalVisible, setAddModalVisible}}>
            <MealPlanContext.Provider value={{mealPlan, setMealPlan, currentMealEdit, setCurrentMealEdit}}>
              <RegMealContext.Provider value = {{regMeal, setRegMeal}}>
                <ChooseDateContex.Provider value = {{choosenDate, setChoosenDate}}>
                  <NavigationContainer>
                    <Stack.Navigator>
                      {user ? (
                        <Stack.Screen name="NearBy" children={createBottomTabs}>
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
                </ChooseDateContex.Provider>
              </RegMealContext.Provider>
            </MealPlanContext.Provider>
            </AddMealplanContext.Provider>
          </EditModalContext.Provider>
        </CurrentMealContext.Provider>
      </ModalVisibleContext.Provider>
    </CurrentUserContext.Provider>

  );
}