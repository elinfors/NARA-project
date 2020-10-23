import React, {useState, useEffect} from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {firebase} from '../../../Firebase/config'
import styles from './styles';

export default function HomeScreen(props) {

    const [Food, setFood] = useState('')
    const [Mood, setMood] = useState('')



    const userId = props.extraData.uid
    //console.log(userId)

    const onLogoutPress = () => {
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
          }, function(error) {
            console.error('Sign Out Error', error);
          });
    }

    const onAddLogg = () => {
        const usersRef = firebase.firestore().collection('users')

        usersRef.doc(userId).collection('meal').add({
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


    return (
        <View>
           {/*} <Text>{userId}</Text>*/}
           <TouchableOpacity
                    style={styles.mealCard}
                    onPress={() => onLogoutPress()}>
                    <Text style={styles.mealTitle}>Breakfast</Text>
                </TouchableOpacity>
            
           
            <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLogoutPress()}>
                    <Text style={styles.buttonTitle}>Log out</Text>
                </TouchableOpacity>
            {/*}
                <TextInput
                    style={styles.input}
                    placeholder='Food'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFood(text)}
                    value={Food}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
    />*/}
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
                <Text>'tjena</Text>
        </View>
    )
};
