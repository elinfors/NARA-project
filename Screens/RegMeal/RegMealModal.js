import React, { useState, useContext, useEffect} from 'react';
import { View, Text, TouchableOpacity, Rect, ScrollView} from "react-native";
import {Divider } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {firebase} from '../../Firebase/config';
import moment from 'moment';
import styles from './stylesRegMeal';

import {didEatCopy, skippedCopy} from '../AddModalScreen/FormComponents/formCopy'


// CONTEXT
import {ModalVisibleContext} from '../../App'
import {CurrentMealContext} from '../../App'
import {CurrentUserContext} from '../../App'
import {RegMealContext} from '../../App'

export default RegMeal = () =>{

    const {regMeal, setRegMeal} = useContext(RegMealContext)
    const {currentMeal, setCurrentMeal, currentStage, setCurrentStage} = useContext(CurrentMealContext)
    const userContext = useContext(CurrentUserContext)
    const {modalVisible, setModalVisible, toggleVisible} = useContext(ModalVisibleContext)

    const feeling = {1: 'Depressed', 2: 'Sad', 3: 'Neutral', 4:'Good', 5:'Happy'}

    const handleRemove = () =>{
        if(regMeal.type === 'Extra Snack'){
            var allMeals = firebase.firestore().collection('users').doc(userContext.user.uid)
            .collection('extraSnack').doc(regMeal.date).collection('mealsToday')
            allMeals.onSnapshot(function(querySnapshot){
                querySnapshot.forEach(function(doc){

                    if(doc.data().type === regMeal.type){
                        allMeals.doc(doc.id).delete()
                    }
                    
                })
            })
        }
        else{
           var allMeals = firebase.firestore().collection('users').doc(userContext.user.uid)
            .collection('meals').doc(regMeal.date).collection('mealsToday')
            allMeals.onSnapshot(function(querySnapshot){
                querySnapshot.forEach(function(doc){

                    if(doc.data().type === regMeal.type){
                        allMeals.doc(doc.id).delete()
                    }
                    
                })
            }) 
        }
        
        setModalVisible(false)

    }

    const ListHeadline = () =>{
        return(
            <>
            <View style={styles.listHeadlineView}>
                <View style={{justifyContent:'flex-start', flex:1}}>
                                <Text style={{fontSize:10,fontWeight:'500'}}>YOUR MEAL:</Text>
                        </View>
                        <View style={{justifyContent:'flex-end', flex:1}}>
                                <Text style={{fontSize:10, alignSelf:'flex-end', marginEnd:10, fontStyle:'italic'}}>amount:</Text>
                        </View>
                </View>
            </>
        )
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
                <View style={styles.listView}>
                {regMeal.didEat === true ? 
                ListHeadline()
                :
                null
                }
                
                {Object.keys(regMeal.food).map(item => {
                    return(
                    <View style={styles.listViewItem}>
                        <View style={{justifyContent:'flex-start', flex:1}}>
                                <Text style={{fontWeight:'600'}}>{item}</Text>
                        </View>
                        <View style={{justifyContent:'flex-end', flex:1}}>
                                <Text style={{fontWeight:'600', alignSelf:'flex-end', marginEnd:10, color:'#C4C4C4'}}>{regMeal.food[item]}</Text>
                        </View>
                    </View>
                    )
                })}
                </View>
                <View style={styles.questionView}>
                    <Text style={styles.questionHeadline}>{regMeal.didEat === true ? didEatCopy.q1 : skippedCopy.q1}</Text>
                    <Text style={styles.questionText}>{regMeal.mealTime}</Text>
                </View>
                <Divider></Divider>
                <View style={styles.questionView}>
                    <Text style={styles.questionHeadline}>{regMeal.didEat === true ? didEatCopy.q2 : skippedCopy.q2}</Text>
                    <Text style={styles.questionText}>{feeling[regMeal.feelRate]}</Text>
                </View>
                <Divider></Divider>
                <View style={styles.questionView}>
                    <Text style={styles.questionHeadline}>{regMeal.didEat === true ? didEatCopy.q3 : skippedCopy.q3}</Text>
                    <Text style={styles.questionText}>{regMeal.ateWith}</Text>
                </View>
                <Divider></Divider>
                <View style={styles.questionView}>
                    <Text style={styles.questionHeadline}>{regMeal.didEat === true ? didEatCopy.q4 : skippedCopy.q4}</Text>
                    <Text style={styles.questionText}>{regMeal.ateAt}</Text>
                </View>
                <Divider></Divider>
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