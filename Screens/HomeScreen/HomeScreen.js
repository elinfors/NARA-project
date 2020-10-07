import React from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {firebase} from '../Firebase/config'
import styles from './styles';

export default function HomeScreen(props) {

    const userId = props.extraData.email
    console.log(userId)

    const onLogoutPress = () => {
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
          }, function(error) {
            console.error('Sign Out Error', error);
          });
    }
    return (
        <View>
            <Text>{userId}</Text>
            <Text>Hej</Text>
            <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLogoutPress()}>
                    <Text style={styles.buttonTitle}>Log out</Text>
                </TouchableOpacity>
        </View>
    )
}