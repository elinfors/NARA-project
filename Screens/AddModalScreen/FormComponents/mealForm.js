import React, { useState, useContext, useEffect} from 'react';
import { StyleSheet, View, ScrollView, Button, Text, TouchableOpacity,
     Image, TextInput, ShadowPropTypesIOS, Animated, 
     FlatList, Keyboard } from "react-native";
import { Slider } from 'react-native-elements';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {firebase} from '../../Firebase/config';
import moment from 'moment';
import styles from './stylesMealForm';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ProgressBar from './progressBar'

// import copy
import {didEatCopy, skippedCopy} from './formCopy'

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
    
    const [favorites, setFavorites] = useState([])

    // "HELP-STATES"
    const [commentHelp, setCommentHelp] = useState('')
    const [food, setFood] = useState('')
    const [eatCopy, setEatCopy] = useState()

    useEffect(()=>{
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
        if(currentStage === 2 && (Object.keys(foodObj).length === 0)){
            alert('You need to add something to your meal. If you skipped this meal - go back and choose "no"')
        }
 
        else if(currentStage === 3 && (mealTime === '' || feelRate ===''|| ateAt ===''|| ateWith ==='')){
            alert('You need to fill out all the questions')
        }
        else{
            handleGoToNext()
        }
    }

    
    const handleGoToNext = () =>{
        if(currentStage ===1 && didEat === false){
            setCurrentStage(currentStage+2)
        }
        else{
            setCurrentStage(currentStage+1)
        }
    }
    
    const handleBack = () => {
        if(currentStage === 3 && didEat === false){
            setCurrentStage(currentStage-2)
        }
        else{
            setCurrentStage(currentStage-1)
        }   
      }
    

    const handleFood = () =>{
        if(food != ''){
            foodObj[food] = 1
            setFood('')
        }
      }
    
    const handleFoodFav = (sentFood) =>{
        foodObj[sentFood] = 1
        setfoodObj({...foodObj})
    }

    const handleRemoveFood = (sentFood) =>{
        delete foodObj[sentFood]
        setfoodObj({...foodObj})
    }

    const handleComment = () =>{
        setComment(commentHelp)
        //setCommentHelp('')
        Keyboard.dismiss()
    }

    const handleFav = (sentFood) =>{
        if(!favorites.includes(sentFood)){
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
        else{
            handleRemoveFav(sentFood)
        }
    }

    const handleRemoveFav = (sentFood) =>{
        var favRef = firebase.firestore().collection('users').doc(userContext.user.uid)
        .collection('favorites').doc(currentMeal).collection('fooditems').doc(sentFood)

        favRef.delete().then(function(){
            console.log('favorite removed')
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
        }
        else{
            console.log("can't remove")
        }
    }
    const handleClose = () => {
        setModalVisible(false)
        setCurrentStage(0)
      }

    const handleSubmit = () =>{
 

        var mealsRef = firebase.firestore().collection('users').doc(userContext.user.uid).collection('meals')
        mealsRef.add({
            didEat: didEat,
            mealTime: mealTime,
            feelRate: feelRate,
            ateWith: ateWith,
            ateAt: ateAt,
            comment: comment,
            timestamp: moment().utcOffset('+01:00').format('YYYY-MM-DD HH:mm'),
            date: moment().utcOffset('+01:00').format('YYYY-MM-DD'),
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

    const LeftAction = () =>{
        <View><Text>Remove</Text></View>
    }

    /*const renderFoodList = (object) =>{
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
                        <Ionicons name={'ios-heart'} size={30} color={favorites.includes(food) ? 'black':'grey'} />
                    </TouchableOpacity>
                </View>
            </View>

        
        ) 
        })
    )}*/
    

      const renderText = (stage) => {
        if (stage === 1) {
           return (<>
        <View style={styles.didEatView}>
            <Text>Did you eat this meal?</Text>
            <View style={styles.stage1BtnView}>
                <TouchableOpacity 
                    style={ didEat ? styles.buttonStyleDidEat : styles.buttonStyleInactiveDidEat}
                    onPress={()=>setDidEat(true)}>
                    <Text style={didEat ? styles.buttonTitleDidEat : styles.buttonTitleInactiveDidEat}>YES</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={ didEat ? styles.buttonStyleInactiveDidEat : styles.buttonStyleDidEat}
                    onPress={()=>setDidEat(false)}>
                    <Text style={didEat ? styles.buttonTitleInactiveDidEat : styles.buttonTitleDidEat}>NO</Text>
                </TouchableOpacity>
            </View>
            </View>
           </>)
        }
        if(stage === 2){
          return  (<>
          <View style={styles.addFoodView}>
            <TextInput
                    style={styles.foodInput}
                    placeholder='Add Food'
                    placeholderTextColor="#aaaaaa"
                    onChangeText = {text => setFood(text)}
                    onSubmitEditing={()=>handleFood()}
                    value = {food}
                    returnKeyType="next"
                    autoCapitalize="word"
                    autoCorrect={false}
                />
            <View>
                <ScrollView style={styles.scrollView}>
                <Text style={{fontSize:10, marginTop:10}}>{Object.keys(foodObj).length == 0 ? '':'YOU JUST ADDED:' }</Text>
                    <View style={styles.listView}>
                    {Object.keys(foodObj).map(food => {
                    return(
                    <Swipeable renderLeftActions={()=>LeftAction()} onSwipeableLeftOpen={()=>console.log('open')}>
                    <View style={styles.listViewItem}>
                        <View style={{justifyContent:'flex-start', flex:1}}>
                            <Text style={{fontWeight:'600'}}>{food}</Text>
                        </View>

                        <View style={{justifyContent: 'flex-end', flex:1, flexDirection:'row', alignItems:'center'}}>
                            <TouchableOpacity style={styles.listIcons} onPress={()=>handleDecrese(food)}>
                                <Ionicons name={'ios-remove-circle-outline'} size={35} color={'#C4C4C4'} />
                            </TouchableOpacity>
                            <Text>{foodObj[food]}</Text>
                            <TouchableOpacity style={styles.listIcons} onPress={()=>handleIncrease(food)}>
                                <Ionicons name={'ios-add-circle-outline'} size={35} color={'#C4C4C4'} />
                            </TouchableOpacity>
                    
                            <TouchableOpacity style={styles.listIcons} onPress={()=>handleFav(food)}>
                                <Ionicons name={'ios-heart'} size={30} color={favorites.includes(food) ? 'black':'#C4C4C4'} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.listIcons} onPress={()=>handleRemoveFood(food)}>
                                <Ionicons name={'ios-close'} size={30} color={'#C4C4C4'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    </Swipeable>
                    ) 
                    })}
                    </View>
                    <Text style={{fontSize:10, marginTop:10}}>YOUR FAVORITES:</Text>
                    
                    <View style={styles.listView}>
                        {favorites.map(item =>{return (
                            <View style={styles.listViewItem}>
                                <View style={{justifyContent:'flex-start', flex:1}}>
                                    <TouchableOpacity onPress={()=>handleFoodFav(item)}>
                                        <Text>{item}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{justifyContent: 'flex-end', flex:1, flexDirection:'row'}}>
                                    <TouchableOpacity onPress={()=>handleRemoveFav(item)}>
                                        <Ionicons name={'ios-heart'} size={30} color={'black'} />
                                    </TouchableOpacity>
                                </View>

                        </View>

                        )})}
                    </View>
                </ScrollView>
            </View>
            </View>
          </>)
        }
        if(stage === 3){
          return  (<>
          <View style={{height:'90%'}}>
          {/* SECTION */}
          <View style={styles.section}>
             {/* HEADLINE */}
            <View style={styles.sectionHeadline}>
                <Text>{didEat === true ? didEatCopy.q1 : skippedCopy.q1}</Text>
            </View>
            {/* SECTION CONTENT (BUTTONS) */}
            <View style={styles.sectionContent}>
                <TouchableOpacity 
                        style={mealTime === 'now' ? styles.buttonStyle : styles.buttonStyleInactive}
                        onPress={()=>setMealTime('now')}>
                        <Text style={mealTime === 'now' ? styles.buttonTitle : styles.buttonTitleInactive}>
                            {didEat === true ? didEatCopy.q1answers.a1 : skippedCopy.q1answers.a1}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={mealTime === 'lessThanHour' ? styles.buttonStyle : styles.buttonStyleInactive}
                        onPress={()=>setMealTime('lessThanHour')}>
                        <Text style={mealTime === 'lessThanHour' ? styles.buttonTitle : styles.buttonTitleInactive}>
                            {didEat === true ? didEatCopy.q1answers.a2 : skippedCopy.q1answers.a2}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={mealTime === 'moreThanHour' ? styles.buttonStyle : styles.buttonStyleInactive}
                        onPress={()=>setMealTime('moreThanHour')}>
                        <Text style={mealTime === 'moreThanHour' ? styles.buttonTitle : styles.buttonTitleInactive}>
                            {didEat === true ? didEatCopy.q1answers.a3 : skippedCopy.q1answers.a3}</Text>
                    </TouchableOpacity>
                </View>
            {/* END SECTION */}
            </View>

            {/* SECTION */}
          <View style={styles.section}>
             {/* HEADLINE */}
            <View style={styles.sectionHeadline}>
                <Text>{didEat === true ? didEatCopy.q2 : skippedCopy.q2}</Text>
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
                    trackStyle={{ height: 7, backgroundColor: 'transparent' }}
                    thumbStyle={{ height: 20, width: 20, backgroundColor: '#A3C39D' }}
                    />
                    <Text style={{alignSelf:'center', fontSize:10}}>Value: {feeling[feelRate.toString()]}</Text>
                </View>
            </View>
            {/* END SECTION */}
            </View>

          {/* SECTION */}
          <View style={styles.section}>
             {/* HEADLINE */}
            <View style={styles.sectionHeadline}>
                <Text>{didEat === true ? didEatCopy.q3 : skippedCopy.q3}</Text>
            </View>
            {/* SECTION CONTENT (BUTTONS) */}
            <View style={styles.sectionContent}>
                <TouchableOpacity 
                        style={ateWith === 'myself' ? styles.buttonStyle : styles.buttonStyleInactive}
                        onPress={()=>setAteWith('myself')}>
                        <Text style={ateWith === 'myself' ? styles.buttonTitle : styles.buttonTitleInactive}>Myself</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ateWith === 'friends' ? styles.buttonStyle : styles.buttonStyleInactive}
                        onPress={()=>setAteWith('friends')}>
                        <Text style={ateWith === 'friends' ? styles.buttonTitle : styles.buttonTitleInactive}>Friends</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ateWith === 'family' ? styles.buttonStyle : styles.buttonStyleInactive}
                        onPress={()=>setAteWith('family')}>
                        <Text style={ateWith === 'family' ? styles.buttonTitle : styles.buttonTitleInactive}>Family</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ateWith === 'other' ? styles.buttonStyle : styles.buttonStyleInactive}
                        onPress={()=>setAteWith('other')}>
                        <Text style={ateWith === 'other' ? styles.buttonTitle : styles.buttonTitleInactive}>Other</Text>
                    </TouchableOpacity>
                </View>
            {/* END SECTION */}
            </View>

          {/* SECTION */}
          <View style={styles.section}>
             {/* HEADLINE */}
            <View style={styles.sectionHeadline}>
                <Text>{didEat === true ? didEatCopy.q4 : skippedCopy.q4}</Text>
            </View>
            {/* SECTION CONTENT (BUTTONS) */}
            <View style={styles.sectionContent}>
                <TouchableOpacity 
                        style={ateAt === 'home' ? styles.buttonStyle : styles.buttonStyleInactive}
                        onPress={()=>setAteAt('home')}>
                        <Text style={ateAt === 'home' ? styles.buttonTitle : styles.buttonTitleInactive}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ateAt === 'school' ? styles.buttonStyle : styles.buttonStyleInactive}
                        onPress={()=>setAteAt('school')}>
                        <Text style={ateAt === 'school' ? styles.buttonTitle : styles.buttonTitleInactive}>School</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ateAt === 'work' ? styles.buttonStyle : styles.buttonStyleInactive}
                        onPress={()=>setAteAt('work')}>
                        <Text style={ateAt === 'work' ? styles.buttonTitle : styles.buttonTitleInactive}>Work</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={ateAt === 'other' ? styles.buttonStyle : styles.buttonStyleInactive}
                        onPress={()=>setAteAt('other')}>
                        <Text style={ateAt === 'other' ? styles.buttonTitle : styles.buttonTitleInactive}>Other</Text>
                    </TouchableOpacity>
                </View>
            {/* END SECTION */}
            </View>

            </View>
            </>)
        }
        if(stage === 4){
          return  (<>
        <View style={styles.commentView}>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Text>{didEat === true ? didEatCopy.qComment : skippedCopy.qComment}</Text>
          <TextInput
                    style={styles.inputComment}
                    placeholder={didEat === true ? didEatCopy.placeHolder : skippedCopy.placeHolder}
                    placeholderTextColor="#aaaaaa"
                    onChangeText = {text => setCommentHelp(text)}
                    onSubmitEditing={()=>handleComment()}
                    value = {commentHelp}
                    returnKeyType="done"
                    autoCorrect={false}
                    multiline={true}
                />
        </TouchableWithoutFeedback>
        </View>

          </>)
        }
        if(stage === 5){
            return  (<>
            <View style={styles.submitView}>
                <Text style={{fontSize:17}}>Meal Submitted</Text>
                <Ionicons name={'ios-checkmark-circle-outline'} size={80} color={'#7CA179'} />
            </View>
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
            <TouchableOpacity onPress={()=>handleClose()}>
                <Ionicons name={'ios-close'} size={40} color={'black'} />
            </TouchableOpacity>
            </View>
            <ProgressBar style={{alignSelf:'flex-start'}} props={didEat}></ProgressBar>

            <View style={styles.constumContentView}>

                {renderText(currentStage)}
            </View>

            {/*SUBMIT BUTTON*/}
            {currentStage === 4 ?
            <View style={styles.nextBtnView}>
                <TouchableOpacity
                    style={styles.nextBtn}
                    onPress={()=>handleSubmit()}>
                    <Text style={styles.nextBtnTitle}>Submit</Text>
                </TouchableOpacity>
            </View>
            :
            currentStage === 5 ?
            <View></View>
            :
            /*NEXT BUTTON*/
            <View style={styles.nextBtnView}>
                <TouchableOpacity
                style={styles.nextBtn}
                onPress={()=>handleNext()}>
                <Text style={styles.nextBtnTitle}>Next</Text>
                </TouchableOpacity>
            </View>
            }

        </View>
        </>
    )

}
