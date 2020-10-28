import React, {useState, useEffect, useContext} from 'react'
import { StyleSheet, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {firebase} from '../Firebase/config'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CurrentUserContext} from '../../App'
import {MealPlanContext} from '../../App'
import {EditModalContext} from '../../App'

const pen = require('../../assets/penIcon.png')

export default function MealPlan({navigation}) {
    
    const [currentUser, setCurrentUser] = useState(null)

    const userId = useContext(CurrentUserContext)
    const {mealPlan, setMealPlan, currentMealEdit, setCurrentMealEdit} = useContext(MealPlanContext)
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

    mealPlanList = (mealPlan) => {
        return mealPlan.map(meal => {
          return (
            <TouchableOpacity
                onPress={()=>onPressEdit(meal)}>

            
            <View style={styles.mealCard}>
                <View>
              <Text style={styles.mealTitle}>{meal.name}</Text>
              {console.log(meal.name + meal.active)}
              </View>
              <View>
                  <Text>TIME: {meal.time}</Text></View>
                <TouchableOpacity
                        onPress={() => removeMeal(meal)}>
                             <Ionicons name={'ios-create'} size={30} color={'black'} />

                </TouchableOpacity>
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
        <View>
            <View>{mealPlanList(mealPlan)}
           </View>
        </View>
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
    }

    
  });
