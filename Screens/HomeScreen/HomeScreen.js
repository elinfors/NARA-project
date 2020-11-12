import React, {useState, useEffect, useContext} from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import {firebase} from '../Firebase/config'
import styles from './styles'
import {CurrentUserContext} from '../../App'
import {ModalVisibleContext} from '../../App'
import {CurrentMealContext} from '../../App'
import {MealPlanContext} from '../../App'
import Ionicons from 'react-native-vector-icons/Ionicons';



export default function HomeScreen({navigation}) {

    const [currentUser, setCurrentUser] = useState(null)
    const {modalVisible, setModalVisible, toggleVisible} = useContext(ModalVisibleContext)
    const {currentMeal, setCurrentMeal, currentStage, setCurrentStage} = useContext(CurrentMealContext)
    const {mealPlan, setMealPlan} = useContext(MealPlanContext)

    const [Food, setFood] = useState('')
    const [Mood, setMood] = useState('')


    //const userId = props.extraData.uid
    const userId = useContext(CurrentUserContext)
    //console.log(userId)


    const onAddLogg = () => {
        const usersRef = firebase.firestore().collection('users')

        usersRef.doc(userId.user.uid).collection('meal').add({
            food: Food,
            mood: Mood
        })
    }
/*
    const addMeals = ()=>{
    const meals = []
    var usersRef = firebase.firestore().collection('users').doc(userId).collection('meal')
    usersRef.get()
    .then(snapshot => {
        snapshot.forEach(doc => {

           meals.push(doc.data().mood)
           console.log(meals)
        });
    })
    .catch(err => {
        console.log('Error getting documents', err);
    }); 
    }
    */
   function addMeal(meal_type){
        setModalVisible(true)
        setCurrentMeal(meal_type)
        setCurrentStage(1)

   }

   mealPlanList = (mealPlan) => {
    mealPlan.sort((a, b) => (a.time.substr(0,2) > b.time.substr(0,2)) ? 1 
        : (a.time.substr(0,2) === b.time.substr(0,2)) 
        ? ((a.time.substr(3,4) > b.time.substr(3,4)) 
        ? 1 : -1) : -1)
    //(a.color === b.color) ? ((a.size > b.size) ? 1 : -1) : -1 )
  
    return mealPlan.map(meal => {
        console.log("mealtime", meal.time.substr(0,2))
        console.log("mealtime", meal.time.substr(3,4))
      return (
        <TouchableOpacity
                    style={styles.mealCard}
                    onPress={() => addMeal(meal.name)}>
                    <Text style={styles.cardTitle}>ADD {meal.name.toUpperCase()}</Text>
            </TouchableOpacity>
      );
    });
  };

    useEffect(()=>{
        setCurrentUser(userId.user.uid)
        setMealPlan(mealPlan)
        console.log(currentUser)
    }, [])

    return (
        <View>
            <View style={styles.dayBanner}>
                <TouchableOpacity>
                    <Ionicons name={'ios-arrow-back'} size={30} color={'white'} />
                </TouchableOpacity>
                <Text style={styles.headline}>TODAY</Text>
                <TouchableOpacity>
                    <Ionicons name={'ios-arrow-forward'} size={30} color={'white'} />
                </TouchableOpacity>

            </View>

            
            <Text style={styles.description}>Register today’s meal here! </Text>
            <ScrollView>
                <View>{mealPlanList(mealPlan)}
            </View>
            </ScrollView>
           
{/*
            <TouchableOpacity
                    style={styles.mealCard}
                    onPress={() => {addMeal('Breakfast')}}>
                    <Text style={styles.cardTitle}>Breakfast</Text>
            </TouchableOpacity>
            <TouchableOpacity
                    style={styles.mealCard}
                    onPress={() => {addMeal('Morning snack')}}>
                    <Text style={styles.cardTitle}>Morning snack</Text>
            </TouchableOpacity>
            <TouchableOpacity
                    style={styles.mealCard}
                    onPress={() => {addMeal('Lunch')}}>
                    <Text style={styles.cardTitle}>Lunch</Text>
            </TouchableOpacity>
            <TouchableOpacity
                    style={styles.mealCard}
                    onPress={() => {addMeal('Afternoon snack')}}>
                    <Text style={styles.cardTitle}>Afternoon snack</Text>
            </TouchableOpacity>
            <TouchableOpacity
                    style={styles.mealCard}
                    onPress={() => {addMeal('Dinner')}}>
                    <Text style={styles.cardTitle}>Dinner</Text>
            </TouchableOpacity>
            <TouchableOpacity
                    style={styles.mealCard}
                    onPress={() => {addMeal('Evening snack')}}>
                    <Text style={styles.cardTitle}>Evening snack</Text>
            </TouchableOpacity>

    */}

        </View>
    );
};
