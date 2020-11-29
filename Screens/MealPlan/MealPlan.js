import React, {useState, useEffect, useContext} from 'react'
import { StyleSheet, Image, Text, TextInput, TouchableOpacity, View, ScrollView, Switch } from 'react-native'
import {firebase} from '../Firebase/config'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CurrentUserContext} from '../../App'
import {MealPlanContext} from '../../App'
import {EditModalContext} from '../../App'
import {AddMealplanContext} from '../../App'

const pen = require('../../assets/penIcon.png')

export default function MealPlan({navigation}) {
    
    const [currentUser, setCurrentUser] = useState(null)

    const userId = useContext(CurrentUserContext)
    const {mealPlan, setMealPlan, currentMealEdit, setCurrentMealEdit} = useContext(MealPlanContext)
    const {addModalVisible, setAddModalVisible} = useContext(AddMealplanContext)
    const {editModalVisible, setEditModalVisible} = useContext(EditModalContext)

    const [isEnabledAll, setIsEnabledAll] = useState(false)

    //console.log(userId)

    const toggleSwitch = () => {
        setIsEnabledAll(!isEnabledAll);
 
    }
/*
    const setNotifications = () =>{
        var mealPlanRef = firebase.firestore().collection('users').doc(userId.user.uid).collection('mealplan')
        mealPlanRef.onSnapshot(function(querySnapshot){
            
            querySnapshot.forEach(function(doc){
                //Do for every doc in collection
                doc.ref.update({
                    notification: true
                })
                .then(function(){
                    console.log('success')
                })
                .catch(function(error){
                    console.log('error: ', error)
                })

            })
        })
    }*/


    const removeMeal = (meal) =>{
        const index = mealPlan.indexOf(meal);
        if (mealPlan[index].active == true){
            console.log(mealPlan[index].active + " " + mealPlan[index].name)
             mealPlan[index].active=false
             setMealPlan(mealPlan)
        }
        else{
            console.log(mealPlan[index].active + " " + mealPlan[index].name)
            mealPlan[index].active=true
            setMealPlan(mealPlan)
        }
       
    }

    const onPressEdit = (meal) =>{
        setEditModalVisible(true)
        setCurrentMealEdit(meal)
    }

    const addMeal = () =>{
        setCurrentMealEdit(null)
        setEditModalVisible(true)

    }

    mealPlanList = (mealPlan) => {
        
        mealPlan.sort((a, b) => (a.time.substr(0,2) > b.time.substr(0,2)) ? 1 
        : (a.time.substr(0,2) === b.time.substr(0,2)) 
        ? ((a.time.substr(3,4) > b.time.substr(3,4)) 
        ? 1 : -1) : -1)

        return mealPlan.map(meal => {
            var notis = ''
            if(meal.notification===true){
                notis = 'ON'
            }
            else if (meal.notification === false){
                notis = 'OFF'
            }
          return (
            <TouchableOpacity
                onPress={()=>onPressEdit(meal)}>

            
            <View style={styles.mealCard}>
                <View>
                    <Text style={styles.mealTitle}>{meal.name}</Text>
                    <Text style={styles.mealTime}>TIME: {meal.time}</Text>
                </View>
              <View>
                  <Text style={meal.notification ? styles.mealNotisOn : styles.mealNotisOff}>notification: {notis}</Text></View>
                  <View  style={styles.settingsBtn}>   
                <TouchableOpacity
                        onPress={() => onPressEdit(meal)}>
                             <Ionicons name={'ios-settings'} size={25} color={'gray'}/>

                </TouchableOpacity>
                </View>
            </View>
            </TouchableOpacity>
          );
        });
      };


    useEffect(()=>{
        setCurrentUser(userId.user.uid)
        setMealPlan(mealPlan)
    }, [])


    return (
        <>
        <View style={styles.headlineTextView}>
            <Text style={styles.headlineText}>MEAL PLAN</Text>
            <Text style={styles.headlineTextSmall}>Set a plan for what meals you strive to eat each day</Text>
        </View>
            
        <ScrollView style ={styles.scrollView}> 

        <View style = {styles.switchView}>
            <Text style={{marginRight:'2%'}}>Notification for all meals</Text>
            <Switch
            trackColor='#ffffff'
            thumbColor={isEnabledAll ? "#f4f3f4" : "#ffffff"}
            ios_backgroundColor="#e2e2e2"
            onValueChange={toggleSwitch}
            value={isEnabledAll}
            />
        </View>
        
            <View>{mealPlanList(mealPlan)}
           </View>
           <View style={styles.nextBtnView}>
                <TouchableOpacity
                    onPress={()=>addMeal()}
                        style={styles.nextBtn}>
                    <Text style={styles.nextBtnTitle}>ADD A MEAL</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        </>
    )
};


const styles = StyleSheet.create({

    headlineView:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:20
    },
    headlineTextView:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    headlineText:{
        fontSize:25,
        marginBottom:5
    },
    headlineTextSmall:{
        fontSize:15,
        color:'grey'
    },

    scrollView:{
        height:'70%'
    },

    switchView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        marginRight:'5%'
    },

    mealCard:{
        /*
        backgroundColor: '#ffffff',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        height: 60,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection:'row'
        */
       backgroundColor: '#ffffff',
        borderRadius: 5,
        height: 60,
        alignItems: "center",
        justifyContent: 'space-between',
        marginHorizontal: '5%',
        marginTop:'3%',
        flexDirection:'row',

        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.4,
        elevation: 4,
        shadowRadius: 5 ,
        shadowOffset : { width: 1, height: 10},
        
    },
    mealTitle:{
        fontWeight:'500',
        fontSize:17,
        marginLeft:'10%'
    },
    mealTime:{
        marginLeft:'10%'

    },
    mealNotisOn:{
        fontSize:12
    },
    mealNotisOff:{
        fontSize:12,
        color:'#C4C4C4'
    },
    mealTitle2:{
        marginLeft:30,
        color:'red'
    },
    removeBtn:{
        marginRight:30
    },
    nextBtnView:{
        justifyContent:'flex-end',
        alignItems: 'center',
        flex: 1,
        marginBottom:10
      },
      nextBtn:{
        backgroundColor: '#7CA179',
        borderRadius: 5,
        height: 40,
        width:150,
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 1, height: 13},
        marginHorizontal: 10,
        marginTop:'7%',
      },
      nextBtnTitle:{
          color: "#ffffff",
      },
      settingsBtn:{
          marginRight:10
      }

    
  });
