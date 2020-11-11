import React, { useState, useContext} from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity, Image } from "react-native";
import {CurrentMealContext} from '../../../App'


export default ProgressBar = ({props}) => {
    
    //const [amount, setAmount] = useState(0)
    const {currentMeal, setCurrentMeal, currentStage, setCurrentStage} = useContext(CurrentMealContext)


    const renderRectangles = () =>{
        console.log(props + 'props')
        if (props === true && currentStage > 1){
            return(
                <>
                <View style={currentStage > 2 ? styles.DoneRecView : styles.CurrentRecView}/>
                <View style={currentStage > 3 ? styles.DoneRecView : currentStage === 3?styles.CurrentRecView : styles.UndoneRecView}/>
                <View style={currentStage < 4 ? styles.UndoneRecView : styles.CurrentRecView}/>
                </>
            )
        }
        if(props === false && currentStage > 1){
            return(
                <>
                <View style={currentStage > 3 ? styles.DoneRecViewLong : styles.CurrentRecViewLong}/>
                <View style={currentStage < 4 ? styles.UndoneRecViewLong: styles.CurrentRecViewLong}/>
                </>
            )
        }
        if (props === 'comp'){
            return(
                <>
                <View style={currentStage > 1 ? styles.DoneRecView : styles.CurrentRecView}/>
                <View style={currentStage > 2 ? styles.DoneRecView : currentStage === 2?styles.CurrentRecView : styles.UndoneRecView}/>
                <View style={currentStage < 3 ? styles.UndoneRecView : styles.CurrentRecView}/>
                </>
            )
        }
        else{
            return null
        }
        
    }

    return(
        <>
        <View style={styles.progressBarView}>
            {renderRectangles()}
        </View>
        </>
    )

}

const styles = StyleSheet.create({
    progressBarView:{
        flexDirection:'row',
        width:'100%',
        marginBottom:5
    },
    DoneRecView:{
        width: '33.333333333%',
        height: 7,
        backgroundColor: '#7CA179',
        marginHorizontal:1
    },
    CurrentRecView:{
        width: '33.333333333%',
        height: 7,
        backgroundColor: 'rgba(124, 161, 121, 0.5)',
        marginHorizontal:1
    },
    UndoneRecView:{
        width: '33.333333333%',
        height: 7,
        backgroundColor: 'rgba(229, 229, 229, 1)',
        marginHorizontal:1
    },

    DoneRecViewLong:{
        width: '50%',
        height: 7,
        backgroundColor: '#7CA179',
        marginHorizontal:1
    },
    CurrentRecViewLong:{
        width: '50%',
        height: 7,
        backgroundColor: 'rgba(124, 161, 121, 0.5)',
        marginHorizontal:1
    },
    UndoneRecViewLong:{
        width: '50%',
        height: 7,
        backgroundColor: 'rgba(229, 229, 229, 1)',
        marginHorizontal:1
    }
    
  });