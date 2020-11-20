import React, { useState, useContext, useEffect} from 'react';
import { View, Text, TouchableOpacity, Rect, ScrollView} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {firebase} from '../../Firebase/config';
import moment from 'moment';
import styles from './stylesRegMeal';


// CONTEXT
import {ModalVisibleContext} from '../../App'
import {CurrentMealContext} from '../../App'
import {CurrentUserContext} from '../../App'
import {RegMealContext} from '../../App'

export default RegComp = () =>{

    const {regMeal, setRegMeal} = useContext(RegMealContext)
    const {currentMeal, setCurrentMeal, currentStage, setCurrentStage} = useContext(CurrentMealContext)
    const userContext = useContext(CurrentUserContext)
    const {modalVisible, setModalVisible, toggleVisible} = useContext(ModalVisibleContext)



    const handleRemove = () =>{
        //console.log(regMeal.uid)
        //console.log(regMeal)
        //console.log(regMeal.id)
        var allMeals = firebase.firestore().collection('users').doc(userContext.user.uid)
        .collection('meals').doc(regMeal.date).collection('mealsToday')
        allMeals.onSnapshot(function(querySnapshot){
            querySnapshot.forEach(function(doc){

                if(doc.data().type === regMeal.type){
                    allMeals.doc(doc.id).delete()
                }
                
            })
        })
        setModalVisible(false)

    }

    return(
        <>
        <View style={styles.ModalView}>

            <View style={styles.headlineView}>
            <View></View>
            <Text>Todays {regMeal.type} 👋!</Text>
            <TouchableOpacity onPress={()=>handleClose()}>
                <Ionicons name={'ios-close'} size={40} color={'black'} />
            </TouchableOpacity>
            </View>

            <View style={styles.constumContentView}>
                <View style={styles.regMealView}>
                <ScrollView style={styles.scrollView}>

                {/*
                <View style={styles.listView}>
                {Object.keys(regMeal.food).map(item => {
                    return(
                    <View style={styles.listViewItem}>
                        <View style={{justifyContent:'flex-start', flex:1}}>
                                <Text style={{fontWeight:'600'}}>{item}</Text>
                        </View>
                        <View style={{justifyContent:'flex-end', flex:1}}>
                                <Text style={{fontWeight:'600', alignSelf:'flex-end'}}>{regMeal.food[item]}</Text>
                        </View>
                    </View>
                    )
                })}
                </View>*/}
                <View style={styles.questionView}>
                    <Text style={styles.questionHeadline}>When did you eat this meal?</Text>
                    <Text style={styles.questionText}>{regMeal.compTime}</Text>
                </View>

                <View style={styles.questionView}>
                    <Text style={styles.questionHeadline}>How are you feeling overall?</Text>
                    <Text style={styles.questionText}>{regMeal.feelRate}</Text>
                </View>
                <View style={styles.questionView}>
                    <Text style={styles.questionHeadline}>Who did you eat your meal with?</Text>
                    <Text style={styles.questionText}>{regMeal.compWith}</Text>
                </View>
                <View style={styles.questionView}>
                    <Text style={styles.questionHeadline}>Where did you eat your meal?</Text>
                    <Text style={styles.questionText}>{regMeal.compAt}</Text>
                </View>

                <View style={styles.questionView}>
                    <Text style={styles.questionHeadline}>Is there anything you would like to elaborate on?</Text>
                    <Text style={styles.commentText}>{regMeal.comment === '' ? 'No Comment Added' : regMeal.comment}</Text>
                </View>
                </ScrollView>
         
            </View>
            </View>

            {/*Next BUTTON*/}
                <View style={styles.nextBtnView}>
                <TouchableOpacity
                style={styles.nextBtn}
                onPress={()=>handleRemove()}>
                <Text style={styles.nextBtnTitle}>Remove Meal</Text>
                </TouchableOpacity>
            </View>
            
        
        </View>
        </>
    )
}