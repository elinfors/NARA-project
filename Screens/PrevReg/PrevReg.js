import React, { useState, useContext, useEffect} from 'react';
import { View, Text, TouchableOpacity, Rect, ScrollView} from "react-native";
import {firebase} from '../Firebase/config'
import styles from './PrevRegStyles'
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';


// CONTEXT  
import {CurrentUserContext} from '../../App'
import {ModalVisibleContext} from '../../App'
import {CurrentMealContext} from '../../App'
import {MealPlanContext} from '../../App'
import {RegMealContext} from '../../App'
import {ChooseDateContex} from '../../App'

export default function PrevReg({navigation}) {

    const [currentUser, setCurrentUser] = useState(null)
    const {modalVisible, setModalVisible, toggleVisible} = useContext(ModalVisibleContext)
    const {currentMeal, setCurrentMeal, currentStage, setCurrentStage} = useContext(CurrentMealContext)
    const {mealPlan, setMealPlan} = useContext(MealPlanContext)
    const userContext = useContext(CurrentUserContext)
    const {choosenDate, setChoosenDate} = useContext(ChooseDateContex)

    // CONTEXT FOR CLICKED MEAL THAT ARE ALREADY REGISTERD
    const {regMeal, setRegMeal} = useContext(RegMealContext)

    // state for meals from database
    const [previousReg, setPreviousReg] = useState([])

    //const [choosenDate, setChoosenDate] = useState(moment().utcOffset('+01:00').format('YYYY-MM-DD'))

    const getMealsByDate = (date) =>{
        var fromMealPlan = firebase.firestore().collection('users').doc(userContext.user.uid)
        .collection('meals').doc(date).collection('mealsToday')

        var extraSnack = firebase.firestore().collection('users').doc(userContext.user.uid)
        .collection('extraSnack').doc(date).collection('mealsToday')

        var compensation = firebase.firestore().collection('users').doc(userContext.user.uid)
        .collection('comp').doc(date).collection('compToday')


        fromMealPlan.onSnapshot(function(queryMealPlan){
            extraSnack.onSnapshot(function(queryExtra){
                compensation.onSnapshot(function(queryComp){
                    var regList = []
                    queryMealPlan.forEach(function(doc){
                        regList.push(doc.data())                  
                    })
                    queryExtra.forEach(function(doc){
                        regList.push(doc.data())
                    })
                    queryComp.forEach(function(doc){
                        regList.push(doc.data())
                    })
                    setPreviousReg(regList)
                })
            })
        })

        /*
        regList.sort((a, b) => (a.timestamp.substring(11,13) > b.timestamp.substring(11,13)) ? 1 
        : (a.timestamp.substring(11,13) === b.timestamp.substring(11,13)) 
        ? ((a.timestamp.substring(11,13) > b.timestamp.substring(11,13)) 
        ? 1 : -1) : -1)
        */
        
        //console.log(previousReg)
        //console.log((previousReg[0].timestamp).getTime())
    }

    const handleDateBack = () =>{
        console.log(mealPlan)
        var previousDay = moment(choosenDate, 'YYYY-MM-DD').subtract(1, 'days').format("YYYY-MM-DD")
        setChoosenDate(previousDay)
    }
    const handleDateForth = () =>{
        var nextDay = moment(choosenDate, 'YYYY-MM-DD').add(1, 'days').format("YYYY-MM-DD")
        setChoosenDate(nextDay)
    }

    const handelDateToday = () =>{
        var today = moment().utcOffset('+01:00').format('YYYY-MM-DD')
        setChoosenDate(today)
    }

    const getWeekday = (date) =>{
        return moment(date, 'YYYY-MM-DD').format('dddd'); 
    }

    const openDetailModal = (meal) =>{
        previousReg.forEach(function(item){
            if(meal.timestamp === item.timestamp){
                if(meal.type=== 'compensation'){
                    setRegMeal(item)
                    setModalVisible(true)
                    setCurrentStage(11)
                }
                else{
                    setRegMeal(item)
                    setModalVisible(true)
                    setCurrentStage(10)
                }
            }
        })
    }

    const handleClose = () =>{
        setModalVisible(false)
    }

    useEffect(()=>{
        getMealsByDate(choosenDate)
    }, [choosenDate])

    const mealsToReturn = (list) =>{
        return list.map(meal =>{
            var type = meal.type
            if(meal.type=== 'Snack1'||meal.type=== 'Snack2'||meal.type=== 'Snack3'){
                var type = 'Snack'
            }
            else{
                var type = meal.type
            }
            return (
                <TouchableOpacity
                        style={type === 'compensation' ? styles.mealCardComp:styles.mealCardDone}
                        onPress={() => openDetailModal(meal)}>
                        <Text style={styles.cardTitleDone}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
                </TouchableOpacity>
            );
        });
      };

    return(
        <>
        <View>
        <View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.headlineView}>
                    <TouchableOpacity onPress={()=>handleDateBack()}>
                        <Ionicons name={'ios-close'} size={40} color={'black'} />
                    </TouchableOpacity>
                    <View style={styles.headlineTextView}>
                        <Text style={styles.headlineText}>{getWeekday(choosenDate).toUpperCase()}</Text>
                        <Text style={styles.headlineTextSmall}>{choosenDate}</Text>
                        {choosenDate===moment().utcOffset('+01:00').format('YYYY-MM-DD')?
                        null:
                        <TouchableOpacity onPress={()=>handelDateToday()}
                        style={styles.headlineTextLink}>
                            <Text>Go to today</Text>
                        </TouchableOpacity>
                        }
                    </View>
                    {choosenDate===moment().utcOffset('+01:00').format('YYYY-MM-DD')?
                    <Ionicons name={'ios-close'} size={40} color={'grey'} />:
                    <TouchableOpacity onPress={()=>handleDateForth()}>
                        <Ionicons name={'ios-close'} size={40} color={'black'} />
                    </TouchableOpacity>
                    }
                </View>
                
            <View>
            {mealsToReturn(previousReg)}
            </View>

            </ScrollView>
            </View>
        </View>

        </>
    )
}