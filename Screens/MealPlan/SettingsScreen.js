import React, { useState, useContext} from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity, Image, Switch, ScrollView } from "react-native";
import Modal from 'react-native-modal';
import {firebase} from '../Firebase/config'
import {MealPlanContext} from '../../App'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CurrentUserContext} from '../../App'
import {Picker} from '@react-native-picker/picker';
import {EditModalContext} from '../../App'


export default SettingsScreen = () => {
    const {currentMealEdit, setCurrentMealEdit} = useContext(MealPlanContext)
    const userContext = useContext(CurrentUserContext)
    const {editModalVisible, setEditModalVisible} = useContext(EditModalContext)
    const [hour, setHour] = useState(currentMealEdit.time.substr(0,2))
    const [minute, setMinute] = useState(currentMealEdit.time.substr(3,4))
    const [reminderHour, setReminderHour] = useState(currentMealEdit.notificationHour)
    const [reminderMinute, setReminderMinute] = useState(currentMealEdit.notificationMin)
    const [isEnabled, setIsEnabled] = useState(currentMealEdit.notification);


    var name = currentMealEdit.name.toUpperCase();

    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
    }

    const handleSubmit = () =>{
        var mealRef = firebase.firestore().collection('users').doc(userContext.user.uid).collection('mealplan').doc(currentMealEdit.id)
        mealRef.set({
            name: currentMealEdit.name,
            time: hour + ":"+ minute,
            notification: isEnabled, 
            notificationHour: reminderHour,
            notificationMin: reminderMinute,
            id: currentMealEdit.id
        })
        .then(function(){
            console.log('success')
        })
        .catch(function(error){
            console.log('error: ', error)
        })

    setTimeout(() => {
        setEditModalVisible(false)
      }, 1000);

    }

    const handleRemove = () =>{
        var mealRef = firebase.firestore().collection('users').doc(userContext.user.uid).collection('mealplan').doc(currentMealEdit.id)
        mealRef.delete().then(function(){
            alert(currentMealEdit.name + " removed from meal plan")
            setTimeout(() => {
                setEditModalVisible(false)
              }, 2000);
        })
    }

    const handleClose = () => {
        setEditModalVisible(false)
      }



    return(
        <>
        
            <View style={styles.ModalView}>
                <View style={styles.headlineView}>  
                    <TouchableOpacity onPress={()=>handleClose()}>
                        <Ionicons name={'ios-close'} size={40} color={'black'} />
                    </TouchableOpacity>
                    <Text style={styles.settingsText}>SETTINGS</Text> 
                    <Text>   </Text>
                </View>

                            {/*ITEM 1*/}
                            <View style={{flex:1, alignItems:'center'}}>  
                                <Text style={styles.mealTitle}>{name}</Text> 
                            </View>
                            {/*ITEM 2*/}
                            <View style={{flex:1}}>
                                <Text>At what time would you like to eat?</Text>
                            </View>
                            {/*ITEM 3*/}
                            <View style={styles.pickers}>
                                <Picker
                                selectedValue={hour}
                                style={{height: 30, width: 150}}
                                onValueChange={(itemValue, itemIndex) =>
                                setHour(itemValue)
                                }>
                                <Picker.Item label="00" value="00" />
                                <Picker.Item label="01" value="01" />
                                <Picker.Item label="02" value="02" />
                                <Picker.Item label="03" value="03" />
                                <Picker.Item label="04" value="04" />
                                <Picker.Item label="05" value="05" />
                                <Picker.Item label="06" value="06" />
                                <Picker.Item label="07" value="07" />
                                <Picker.Item label="09" value="09" />
                                <Picker.Item label="10" value="10" />
                                <Picker.Item label="11" value="11" />
                                <Picker.Item label="12" value="12" />
                                <Picker.Item label="13" value="13" />
                                <Picker.Item label="14" value="14" />
                                <Picker.Item label="15" value="15" />
                                <Picker.Item label="16" value="16" />
                                <Picker.Item label="17" value="17" />
                                <Picker.Item label="18" value="18" />
                                <Picker.Item label="19" value="19" />
                                <Picker.Item label="20" value="20" />
                                <Picker.Item label="21" value="21" />
                                <Picker.Item label="22" value="22" />
                                <Picker.Item label="23" value="23" />
                                </Picker>
                                <Picker
                                selectedValue={minute}
                                style={{height: 30, width: 150}}
                                onValueChange={(itemValue, itemIndex) =>
                                setMinute(itemValue)
                                }>
                                <Picker.Item label="00" value="00" />
                                <Picker.Item label="15" value="15" />
                                <Picker.Item label="30" value="30" />
                                <Picker.Item label="45" value="45" />
                                </Picker>
                            </View>
                            
                            {/*ITEM 4 - items should be on the same row*/}
                            <View style={styles.noticeView}>
                                <Text style={{paddingVertical:10}}>Notification to register meal</Text>
                            
                    
                                <Switch
                                    trackColor='#ffffff'
                                    thumbColor={isEnabled ? "#f4f3f4" : "#ffffff"}
                                    ios_backgroundColor="#e2e2e2"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
                        
                            </View>
                {isEnabled ? 
                <>
                    {/*ITEM 5*/}
                    <View style={{flex:1}}>
                        <Text>How long after your meal-time do you want to be reminded?</Text>
                    </View>
                    {/*ITEM 6*/}
                    <View style={styles.pickers}>
                        {console.log('i picker ', reminderHour)}
                        <Picker
                        selectedValue={reminderHour}
                        style={{height: 30, width: 100}}
                        onValueChange={(itemValue2, itemIndex) =>
                        setReminderHour(itemValue2)
                        }>
                            <Picker.Item label="0 h" value="0" />
                            <Picker.Item label="1 h" value="1" />
                        </Picker>

                        <Picker
                        selectedValue={reminderMinute}
                        style={{height: 30, width: 100}}
                        onValueChange={(itemValue, itemIndex) =>
                        setReminderMinute(itemValue)
                        }> 
                            <Picker.Item label="0 min" value="0" />
                            <Picker.Item label="1 min" value="1" />
                            <Picker.Item label="2 min" value="2" />
                            <Picker.Item label="3 min" value="3" />
                            <Picker.Item label="4 min" value="4" />
                            <Picker.Item label="5 min" value="5" />
                            <Picker.Item label="6 min" value="6" />
                            <Picker.Item label="7 min" value="7" />
                            <Picker.Item label="8 min" value="8" />
                            <Picker.Item label="9 min" value="9" />
                            <Picker.Item label="10 min" value="10" />
                            <Picker.Item label="11 min" value="11" />
                            <Picker.Item label="12 min" value="12" />
                            <Picker.Item label="13 min" value="13" />
                            <Picker.Item label="14 min" value="14" />
                            <Picker.Item label="15 min" value="15" />
                            <Picker.Item label="16 min" value="16" />
                            <Picker.Item label="17 min" value="17" />
                            <Picker.Item label="18 min" value="18" />
                            <Picker.Item label="19 min" value="19" />
                        </Picker>
                    </View>
                </>
                
                : <View style={styles.pickers}>

                </View> }

                        {/*ITEM 7*/}
                        <View style={{flex:1.5, alignItems:'center', marginTop:20}}>
                        <TouchableOpacity
                            style={styles.nextBtn}
                            onPress={()=>handleSubmit()}>
                            <Text style={styles.nextBtnTitle}>SAVE</Text>
                        </TouchableOpacity>
                        </View>
                        {/*ITEM 8*/}
                        <View style={{flex:1, alignItems:'center'}}>

                            <TouchableOpacity
                            style={styles.removeBtn}
                            onPress={()=>handleRemove()}>
                                <Ionicons name={'ios-trash'} size={40} color={'gray'}/>
                                <Text style={styles.nextBtnTitle}>Remove meal from my meal plan</Text>
                            </TouchableOpacity>
                        
                        </View>


            </View>
        </>
    )

}

const styles = StyleSheet.create({
    ModalView: {
      backgroundColor: 'white',
      paddingLeft: 22,
      paddingRight: 22,
      paddingTop: 22,
      paddingBottom: 50,
      borderTopRightRadius: 17,
      borderTopLeftRadius: 17,
      height: '90%'
    },
    headlineView:{
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
      },
      settingsText:{
          marginTop:15,
          color:'#C4C4C4',
          fontSize:15
      },
      mealText:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',

      },
      mealTitle:{
        fontSize:20,
      },
      setting:{
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
      },
      pickers:{
        flex:4,
        flexDirection:'row',
        alignSelf:'center',
        justifyContent:'center'
      },
      switch: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
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
      },
      removeBtn:{
        alignItems: "center",
        justifyContent: 'center',
        marginHorizontal: 10,
      },
      scrollView:{
        width: '100%',
        flex:1,
        //marginBottom:'20%'
      },
      scrollContent:{
        flex:1,
        flexDirection: 'column',
        justifyContent:'space-between',
        height:'100%'
      },
      noticeView:{
          flex:1,
          flexDirection:'row',
          justifyContent:'space-between'
      }
    
  });



