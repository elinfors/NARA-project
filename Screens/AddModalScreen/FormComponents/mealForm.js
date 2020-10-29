import React, { useState, useContext, useEffect} from 'react';
import { StyleSheet, View, ScrollView, Button, Text, TouchableOpacity, Image, TextInput, ShadowPropTypesIOS, Animated } from "react-native";
import { Slider } from 'react-native-elements';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {firebase} from '../../Firebase/config';
import moment from 'moment';

// CONTEXT
import {ModalVisibleContext} from '../../../App'
import {CurrentMealContext} from '../../../App'
import {CurrentUserContext} from '../../../App'

var plusBtn = require('../../../Components/Images/plusBtn.png')

export default MealForm = () => {
    const {modalVisible, setModalVisible, toggleVisible} = useContext(ModalVisibleContext)
    const {currentMeal, setCurrentMeal, currentStage, setCurrentStage} = useContext(CurrentMealContext)
    const userContext = useContext(CurrentUserContext)
    const [inputMeal, setInputMeal] = useState('')

    const feeling = {1: 'Jamie', 2: 'devastated', 3: 'heart broken', 4:'good', 5:'happy'}


    // STATES TO SEND TO FIREBASE
    const [didEat, setDidEat] = useState(true)
    //const [foodList , setFoodList] = useState([])
    const [foodObj, setfoodObj] = useState({})
    const [mealTime, setMealTime] = useState('')
    const [feelRate, setFeelRate] = useState(1)
    const [ateWith, setAteWith] = useState('')
    const [ateAt, setAteAt] = useState('')
    const [comment, setComment] = useState('')
    
    const [favorites, setFavorites] = useState(null)

    // "HELP-STATES"
    const [commentHelp, setCommentHelp] = useState('')
    const [food, setFood] = useState('')

    useEffect(()=>{
        console.log('favorites',favorites)
        var savedFavRef = firebase.firestore().collection('users').doc(userContext.user.uid)
        .collection('favorites').doc(currentMeal)
        .collection('fooditems')

        savedFavRef.onSnapshot(function(querySnapshot){
            var favList = []
            querySnapshot.forEach(function(doc){
                favList.push(doc.data().foodItem)
            })
            setFavorites(favList)

        })
    },[])


    const handleNext = () => {
        setCurrentStage(currentStage+1)


      }
    
    const handleBack = () => {
        setCurrentStage(currentStage-1)
      }

    const handleFood = () =>{
        if(food != ''){
            foodObj[food] = 1
            console.log(foodObj)
            setFood('')
        }
      }

    const handleComment = () =>{
        setComment(commentHelp)
        //setCommentHelp('')
        console.log(comment)
    }

    

    const handleFav = (sentFood) =>{

        var favRef = firebase.firestore().collection('users').doc(userContext.user.uid)
        .collection('favorites').doc(currentMeal).collection('fooditems').doc(sentFood)
        favRef.set({
            foodItem: sentFood
        })
        .then(function(){
            console.log('success')
        })
        .catch(function(error){
            console.log('error: ', error)
        })
    }

    const handleIncrease = (sentFood) =>{
        //let obj = foodObj
        foodObj[sentFood] += 1
        setfoodObj({...foodObj})
        console.log('food ojbect before increase',foodObj)
    }
    const handleDecrese = (sentFood) =>{
        if(foodObj[sentFood] > 1){
           foodObj[sentFood] -= 1
           setfoodObj({...foodObj})
           console.log('food ojbect before decrease',foodObj)
        }
        else{
            console.log("can't remove")
        }
    }

    const handleSubmit = () =>{
        console.log('SUBMIT:')
        console.log(didEat)
        //console.log(foodList)
        console.log(mealTime)
        console.log(feelRate)
        console.log(ateWith)
        console.log(ateAt)
        console.log(comment)

        var mealsRef = firebase.firestore().collection('users').doc(userContext.user.uid).collection('meals')
        mealsRef.add({
            didEat: didEat,
            mealTime: mealTime,
            feelRate: feelRate,
            ateWith: ateWith,
            ateAt: ateAt,
            comment: comment,
            timestamp: moment().utcOffset('+01:00').format('YYYY-MM-DD HH:mm'),
            food: foodObj,
            type: currentMeal
        })
        .then(function(){
            console.log('success')
        })
        .catch(function(error){
            console.log('error: ', error)
        })

    setCurrentStage(currentStage+1)
    setTimeout(() => {
        setModalVisible(false)
      }, 1500);
        
    }

    const renderFoodList = (object) =>{
        return( Object.keys(object).map(food => {
            
            return(
            <View style={styles.listViewItem}>
                <View style={{justifyContent:'flex-start', flex:1}}>
                    <Text>{food}</Text>
                </View>

                <View style={{justifyContent: 'flex-end', flex:1, flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>handleDecrese(food)}>
                        <Ionicons name={'ios-remove-circle-outline'} size={30} color={'black'} />
                    </TouchableOpacity>
                    <Text>{object[food]}</Text>
                    <TouchableOpacity onPress={()=>handleIncrease(food)}>
                        <Ionicons name={'ios-add-circle-outline'} size={30} color={'black'} />
                    </TouchableOpacity>
            
                    <TouchableOpacity onPress={()=>handleFav(food)}>
                        <Ionicons name={'ios-heart'} size={30} color={'black'} />
                    </TouchableOpacity>
                </View>
            </View>

        
        ) 
        })
    )}
    

      const renderText = (stage) => {
        if (stage === 1) {
           return (<>
            <Text>Did you eat this meal?</Text>
            <TouchableOpacity 
                style={ didEat ? styles.buttonStyle : styles.buttonStyleInactive}
                onPress={()=>setDidEat(true)}>
                <Text>YES</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={ didEat ? styles.buttonStyleInactive : styles.buttonStyle}
                onPress={()=>setDidEat(false)}>
                <Text>NO</Text>
            </TouchableOpacity>
           </>)
        }
        if(stage === 2){
          return  (<>
            <TextInput
                    style={styles.input}
                    placeholder='Add Food'
                    placeholderTextColor="#aaaaaa"
                    onChangeText = {text => setFood(text)}
                    onSubmitEditing={()=>handleFood()}
                    value = {food}
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
           {/*} <View>
                <ScrollView>*/}
                    <View style={styles.listView}>
                        {renderFoodList(foodObj)}
                    </View>
                    <Text>Favorites</Text>
                    
                    <View style={styles.listView}>
                        {favorites.map(item =>{return (
                            <View style={styles.listViewItem}>
                                <View style={{justifyContent:'flex-start', flex:1}}>
                                    <Text>{item}</Text>
                                </View>
                                <View style={{justifyContent: 'flex-end', flex:1, flexDirection:'row'}}>
                                    <TouchableOpacity onPress={()=>handleFav(food)}>
                                        <Ionicons name={'ios-heart'} size={30} color={'black'} />
                                    </TouchableOpacity>
                                </View>

                        </View>

                        )})}
                    </View>
                {/*</ScrollView>
            </View>*/}
        
          </>)
        }
        if(stage === 3){
          return  (<>
          <View style={{height:'90%'}}>
          <ScrollView>
          {/* SECTION */}
          <View style={styles.section}>
             {/* HEADLINE */}
            <View style={styles.sectionHeadline}>
                <Text>When did you eat this meal?</Text>
            </View>
            {/* SECTION CONTENT (BUTTONS) */}
            <View style={styles.sectionContent}>
                <TouchableOpacity 
                        style={mealTime === 'now' ? styles.buttonStyle3Active : styles.buttonStyle3}
                        onPress={()=>setMealTime('now')}>
                        <Text>I just ate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={mealTime === 'lessThanHour' ? styles.buttonStyle3Active : styles.buttonStyle3}
                        onPress={()=>setMealTime('lessThanHour')}>
                        <Text>Less than 1 hour ago</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={mealTime === 'moreThanHour' ? styles.buttonStyle3Active : styles.buttonStyle3}
                        onPress={()=>setMealTime('moreThanHour')}>
                        <Text>More than 1 hour ago</Text>
                    </TouchableOpacity>
                </View>
            {/* END SECTION */}
            </View>

            {/* SECTION */}
          <View style={styles.section}>
             {/* HEADLINE */}
            <View style={styles.sectionHeadline}>
                <Text>How are you feeling overall?</Text>
            </View>
            {/* SECTION CONTENT (SLIDER) */}
            <View style={styles.sectionContent}>
                <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                    <Slider
                    value={feelRate}
                    onValueChange={value => setFeelRate(value)}
                    maximumValue={5}
                    minimumValue={1}
                    step={1}
                    trackStyle={{ height: 10, backgroundColor: 'transparent' }}
                    thumbStyle={{ height: 20, width: 20, backgroundColor: '#A3C39D' }}
                    />
                    <Text>Value: {feeling[feelRate.toString()]}</Text>
                </View>
            </View>
            {/* END SECTION */}
            </View>

          {/* SECTION */}
          <View style={styles.section}>
             {/* HEADLINE */}
            <View style={styles.sectionHeadline}>
                <Text>I ate my meal with:</Text>
            </View>
            {/* SECTION CONTENT (BUTTONS) */}
            <View style={styles.sectionContent}>
                <TouchableOpacity 
                        style={ateWith === 'myself' ? styles.buttonStyle3Active : styles.buttonStyle3}
                        onPress={()=>setAteWith('myself')}>
                        <Text>Myself</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ateWith === 'friends' ? styles.buttonStyle3Active : styles.buttonStyle3}
                        onPress={()=>setAteWith('friends')}>
                        <Text>Friends</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ateWith === 'family' ? styles.buttonStyle3Active : styles.buttonStyle3}
                        onPress={()=>setAteWith('family')}>
                        <Text>Family</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ateWith === 'other' ? styles.buttonStyle3Active : styles.buttonStyle3}
                        onPress={()=>setAteWith('other')}>
                        <Text>Other</Text>
                    </TouchableOpacity>
                </View>
            {/* END SECTION */}
            </View>

          {/* SECTION */}
          <View style={styles.section}>
             {/* HEADLINE */}
            <View style={styles.sectionHeadline}>
                <Text>I ate my meal at:</Text>
            </View>
            {/* SECTION CONTENT (BUTTONS) */}
            <View style={styles.sectionContent}>
                <TouchableOpacity 
                        style={ateAt === 'home' ? styles.buttonStyle3Active : styles.buttonStyle3}
                        onPress={()=>setAteAt('home')}>
                        <Text>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ateAt === 'school' ? styles.buttonStyle3Active : styles.buttonStyle3}
                        onPress={()=>setAteAt('school')}>
                        <Text>School</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ateAt === 'work' ? styles.buttonStyle3Active : styles.buttonStyle3}
                        onPress={()=>setAteAt('work')}>
                        <Text>Work</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ateAt === 'other' ? styles.buttonStyle3Active : styles.buttonStyle3}
                        onPress={()=>setAteAt('other')}>
                        <Text>Other</Text>
                    </TouchableOpacity>
                </View>
            {/* END SECTION */}
            </View>

            </ScrollView>
            </View>
            </>)
        }
        if(stage === 4){
          return  (<>
          <TextInput
                    style={styles.input}
                    placeholder='Add Comment'
                    placeholderTextColor="#aaaaaa"
                    onChangeText = {text => setCommentHelp(text)}
                    onSubmitEditing={()=>handleComment()}
                    value = {commentHelp}
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
          </>)
        }
        if(stage === 5){
            return  (<>
            <Text>Meal Submitted</Text>
            </>)
          }
    }

    return(
        <>
        <View style={styles.ModalView}>

            <View style={styles.headlineView}>
            <TouchableOpacity onPress={()=>handleBack()}>
                <Ionicons name={'ios-arrow-back'} size={30} color={'black'} />
            </TouchableOpacity>
            <Text style={styles.textStyle}>{currentMeal} 👋!</Text>
            <TouchableOpacity>
                <Ionicons name={'ios-close'} size={40} color={'black'} />
            </TouchableOpacity>
            </View>

            <View style={styles.constumContentView}>
                {renderText(currentStage)}
            </View>

            {/*SUBMIT BUTTON*/}
            {currentStage === 4 ?
            <View style={styles.nextBtnView}>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={()=>handleSubmit()}>
                    <Text style={styles.buttonTitle}>Submit</Text>
                </TouchableOpacity>
            </View>
            :
            currentStage === 5 ?
            <View></View>
            :
            /*NEXT BUTTON*/
            <View style={styles.nextBtnView}>
                <TouchableOpacity
                style={styles.buttonStyle}
                onPress={()=>handleNext()}>
                <Text style={styles.buttonTitle}>Next</Text>
                </TouchableOpacity>
            </View>
            }

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
    },
    headlineView:{
      flex: 1,
      flexDirection: 'row',
      justifyContent:'space-between'
    },
    constumContentView:{
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    },
    contentTitle: {
      fontSize: 20,
      marginBottom: 12,
    },
    contentView: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    nextBtnView:{
      justifyContent:'center',
      alignItems: 'center',
      flex: 1
    },


    buttonStyle: {
      backgroundColor: '#7CA179',
      borderRadius: 50,
      marginBottom:10,
      height: 40,
      width:80,
      alignItems: "center",
      justifyContent: 'center'
    },
    buttonStyleInactive: {
        backgroundColor: 'white',
        borderColor: 'grey',
        borderRadius: 100,
        marginBottom:10,
        height: 40,
        width:80,
        alignItems: "center",
        justifyContent: 'center'
      },
    buttonTitle: {
      color: 'white',
      fontSize: 16,
      fontWeight: "bold"
    },
    textStyle:{
    },
    input: {
        height: 48,
        width: 300,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#EFEFEF',
        borderColor: 'grey',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },

    // STAGE 1 - add food
    listView:{
        flex:1,
        flexDirection:'column',
    },
    listViewItem:{
        flex:1,
        flexDirection:'row',
        //justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
        width: '100%'
    },

    // STAGE 3 - WHAT DID YOU FEEL....
    section:{
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
        padding:10
    },
    sectionHeadline:{
        flex: 1,
        flexDirection: 'row',
        justifyContent:'center',
        paddingBottom:5
    },
    sectionContent:{
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
        
    },
    buttonStyle3:{
        height: 50,
        backgroundColor: '#FFFFFF',
        shadowRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {width:0, height:2},
        borderColor: 'grey',
        borderWidth: 1,
        padding:5,
        borderRadius: 20
    },
    buttonStyle3Active:{
        height: 50,
        backgroundColor: '#7CA179',
        shadowRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {width:0, height:2},
        borderColor: 'grey',
        borderWidth: 1,
        padding:5,
        borderRadius: 20
    }
    
  });