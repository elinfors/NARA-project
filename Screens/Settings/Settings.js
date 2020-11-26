import React, {useState, useEffect, useContext} from 'react'
import { StyleSheet, Image, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import styles from './SettingStyle';
import {firebase} from '../Firebase/config'
import {CurrentUserContext} from '../../App'



export default function Settings({navigation}) {

    const userContext = useContext(CurrentUserContext)

    const [userEmail, setUserEmail] = useState()
    const [userDisplayName, setUserDisplayName] = useState()

    useEffect(()=>{
        //var user = firebase.firestore().collection('users').doc(userContext.user.uid)
        
        var user = firebase.auth().currentUser;

        user.providerData.forEach(function (profile) {
            setUserEmail(profile.email)
            setUserDisplayName(profile.displayName)
        })

        
    }, [])

    const onLogoutPress = () => {
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
          }, function(error) {
            console.error('Sign Out Error', error);
          });
    }

    const handleChangeName = () =>{
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: "Lovisa",
          }).then(function() {
              setUserDisplayName(displayName)
            // Update successful.
          }).catch(function(error) {
            // An error happened.
          });

    }

    return (
        <>
        <Text>{userEmail}</Text>
        <Text>{userDisplayName}</Text>
        <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleChangeName()}>
                    <Text style={styles.buttonTitle}>Update name</Text>
        </TouchableOpacity>
        <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLogoutPress()}>
                    <Text style={styles.buttonTitle}>Sign out</Text>
        </TouchableOpacity>
        </>
    )

}