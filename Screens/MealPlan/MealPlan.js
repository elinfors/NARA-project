import React, {useState, useEffect, useContext} from 'react'
import { StyleSheet, Image, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
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

    //console.log(userId)

    const onLogoutPress = () => {
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
          }, function(error) {
            console.error('Sign Out Error', error);
          });
    }
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
        console.log(meal)
        console.log("EDIT PRESSED")
    }

    const addMeal = () =>{
        setAddModalVisible(true)

    }

    mealPlanList = (mealPlan) => {
        
        mealPlan.sort((a, b) => (a.time.substr(0,2) > b.time.substr(0,2)) ? 1 
        : (a.time.substr(0,2) === b.time.substr(0,2)) 
        ? ((a.time.substr(3,4) > b.time.substr(3,4)) 
        ? 1 : -1) : -1)

        return mealPlan.map(meal => {
            console.log("MEAL: ",meal)
          return (
            <TouchableOpacity
                onPress={()=>onPressEdit(meal)}>

            
            <View style={styles.mealCard}>
                <View>
              <Text style={styles.mealTitle}>{meal.name}</Text>
              </View>
              <View>
                  <Text>TIME: {meal.time}</Text></View>
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
        console.log(currentUser)
        setMealPlan(mealPlan)
    }, [])


    return (
        <>
        <View>
            <TouchableOpacity
                    onPress={() => onLogoutPress()}>
                    <Text>Log out</Text>
            </TouchableOpacity>
            
        </View>
        <ScrollView>
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
    mealCard:{
        backgroundColor: '#ffffff',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        height: 60,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection:'row'
        
    },
    mealTitle:{
        marginLeft:34
    },
    mealTitle2:{
        marginLeft:34,
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
        marginTop:50,
      },
      nextBtnTitle:{
          color: "#ffffff",
      },
      settingsBtn:{
          marginRight:10
      }

    
  });
