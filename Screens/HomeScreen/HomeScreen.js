import React, {useState, useEffect, useContext} from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {firebase} from '../Firebase/config'
import styles from './styles'
import {CurrentUserContext} from '../../App'
import Ionicons from 'react-native-vector-icons/Ionicons';



export default function HomeScreen({navigation}) {

    const [currentUser, setCurrentUser] = useState(null)

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


    useEffect(()=>{
        setCurrentUser(userId.user.uid)
        console.log(currentUser)
    }, [])

    return (
        <View>
            <View style={styles.dayBanner}>
                <TouchableOpacity>
                    <Ionicons name={'ios-arrow-back'} size={30} color={'black'} />
                </TouchableOpacity>
                <Text style={styles.headline}>TODAY</Text>
                <TouchableOpacity>
                    <Ionicons name={'ios-arrow-forward'} size={30} color={'black'} />
                </TouchableOpacity>

            </View>

            
            <Text style={styles.description}>Register today’s meal here! </Text>
           

            <TouchableOpacity
                    style={styles.mealCard}
                    onPress={() => navigation.navigate('Add')}>
                    <Text style={styles.cardTitle}>Breakfast</Text>
            </TouchableOpacity>
            <TouchableOpacity
                    style={styles.mealCard}
                    onPress={() => onLogoutPress()}>
                    <Text style={styles.cardTitle}>Snack</Text>
            </TouchableOpacity>
            <TouchableOpacity
                    style={styles.mealCard}
                    onPress={() => onLogoutPress()}>
                    <Text style={styles.cardTitle}>Lunch</Text>
            </TouchableOpacity>
            <TouchableOpacity
                    style={styles.mealCard}
                    onPress={() => onLogoutPress()}>
                    <Text style={styles.cardTitle}>Snack</Text>
            </TouchableOpacity>
            <TouchableOpacity
                    style={styles.mealCard}
                    onPress={() => onLogoutPress()}>
                    <Text style={styles.cardTitle}>Dinner</Text>
            </TouchableOpacity>
            <TouchableOpacity
                    style={styles.mealCard}
                    onPress={() => onLogoutPress()}>
                    <Text style={styles.cardTitle}>Snack</Text>
            </TouchableOpacity>
            {/*}
                <TextInput
                    style={styles.input}
                    placeholder='Mood'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setMood(text)}
                    value={Mood}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onAddLogg()}>
                    <Text style={styles.buttonTitle}>Add</Text>
                </TouchableOpacity>
    */}

        </View>
    );
};
