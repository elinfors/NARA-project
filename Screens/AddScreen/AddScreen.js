import React, {useState, useEffect, useContext} from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {firebase} from '../Firebase/config'
import {CurrentUserContext} from '../../App'




export default function AddScreen() {
    
    const [currentUser, setCurrentUser] = useState(null)

    const userId = useContext(CurrentUserContext)
    //console.log(userId)

    const onLogoutPress = () => {
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
          }, function(error) {
            console.error('Sign Out Error', error);
          });
    }


    useEffect(()=>{
        setCurrentUser(userId.user.uid)
        console.log(currentUser)
    }, [])


    return (
        <View>
            <TouchableOpacity
                   
                    onPress={() => onLogoutPress()}>
                    <Text >Log out</Text>
            </TouchableOpacity>
           
            
        </View>
    )
};
