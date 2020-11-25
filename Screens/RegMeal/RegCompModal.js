import React, { useState, useContext, useEffect} from 'react';
import { View, Text, TouchableOpacity, Rect, ScrollView} from "react-native";
import {Divider } from 'react-native-elements';
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

    const feeling = {1: 'Depressed', 2: 'Sad', 3: 'Neutral', 4:'Good', 5:'Happy'}

    const handleRemove = () =>{
        var allComp = firebase.firestore().collection('users').doc(userContext.user.uid)
        .collection('comp').doc(regMeal.date).collection('compToday')
        allComp.onSnapshot(function(querySnapshot){
            querySnapshot.forEach(function(doc){

                if(doc.data().timestamp === regMeal.timestamp){
                    //console.log(regMeal.compType)
                    allComp.doc(doc.id).delete()
                }
                
            })
        })
        setModalVisible(false)
        setCurrentStage(0)
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
                    <Text style={styles.questionHeadline}>How did you compensate?</Text>
                    <Text style={styles.questionText}>{regMeal.compType}</Text>
                </View>
                <Divider></Divider>
                <View style={styles.questionView}>
                    <Text style={styles.questionHeadline}>When did you compensate?</Text>
                    <Text style={styles.questionText}>{regMeal.compTime}</Text>
                </View>
                <Divider></Divider>
                <View style={styles.questionView}>
                    <Text style={styles.questionHeadline}>How are you feeling overall?</Text>
                    <Text style={styles.questionText}>{feeling[regMeal.feelRate]}</Text>
                </View>
                <Divider></Divider>
                <View style={styles.questionView}>
                    <Text style={styles.questionHeadline}>Who were you with when this occured?</Text>
                    <Text style={styles.questionText}>{regMeal.compWith}</Text>
                </View>
                <Divider></Divider>
                <View style={styles.questionView}>
                    <Text style={styles.questionHeadline}>Where were you when you compensated?</Text>
                    <Text style={styles.questionText}>{regMeal.compAt}</Text>
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
                <Text style={styles.nextBtnTitle}>Remove Compensation</Text>
                </TouchableOpacity>
            </View>
            
        
        </View>
        </>
    )
}