import React, { useState, useContext} from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity, Image } from "react-native";
import Modal from 'react-native-modal';
import {MealPlanContext} from '../../App'
import Ionicons from 'react-native-vector-icons/Ionicons';


export default SettingsScreen = () => {
    const {currentMealEdit, setCurrentMealEdit} = useContext(MealPlanContext)

    return(
        <>
        
            <View style={styles.ModalView}>
                <View style={styles.headlineView}>  
                    <Text style={styles.textStyle}>EDIT👋!</Text>
                    <Text>{currentMealEdit.name}</Text>
                </View>
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    ModalView: {
      backgroundColor: 'white',
      padding: 22,
      //justifyContent: 'center',
      alignItems: 'stretch',
      borderTopRightRadius: 17,
      borderTopLeftRadius: 17,
      height: '90%'
    }
    
  });




