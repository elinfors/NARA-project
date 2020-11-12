import React, { useState, useContext} from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity, Image, Switch } from "react-native";
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
    const [notice, setNotice] = useState(currentMealEdit.notification)
    
    const [isEnabled, setIsEnabled] = useState(currentMealEdit.notification);
   


    var name = currentMealEdit.name.toUpperCase();

    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
        console.log("notification ", isEnabled)
    }

    const handleSubmit = () =>{
        var mealRef = firebase.firestore().collection('users').doc(userContext.user.uid).collection('mealplan').doc(currentMealEdit.id)

        mealRef.set({
            name: currentMealEdit.name,
            time: hour + ":"+ minute,
            notification: isEnabled, 
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
      }, 1500);

    }

    return(
        <>
        
            <View style={styles.ModalView}>
                <View style={styles.headlineView}>  
                    <TouchableOpacity>
                        <Ionicons name={'ios-close'} size={40} color={'black'} />
                    </TouchableOpacity>
                    <Text style={styles.settingsText}>SETTINGS</Text> 
                </View>
                <View style={styles.mealText}>  
                    <Text style={styles.mealTitle}>{name}</Text> 
                </View>
                
                <View style={styles.setting}>
                    <Text>At what time would you like to eat?</Text>
                </View>
                    
                <View style={styles.pickers}>
                    <Picker
                    selectedValue={hour}
                    style={{height: 40, width: 100}}
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
                    style={{height: 40, width: 100}}
                    onValueChange={(itemValue, itemIndex) =>
                       setMinute(itemValue)
                    }>
                    <Picker.Item label="00" value="00" />
                    <Picker.Item label="15" value="15" />
                    <Picker.Item label="30" value="30" />
                    <Picker.Item label="45" value="45" />
                    </Picker>
                </View>
              
                <View style={styles.setting}>
                    <Text>Notification to register meal</Text>
                </View>
                <View style={styles.switch}>
                    <Switch
                        trackColor='#ffffff'
                        thumbColor={isEnabled ? "#f4f3f4" : "#ffffff"}
                        ios_backgroundColor="#e2e2e2"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>

               
                <View style={styles.setting}>
                <TouchableOpacity
                    style={styles.nextBtn}
                    onPress={()=>handleSubmit()}>
                    <Text style={styles.nextBtnTitle}>SAVE</Text>
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
        justifyContent:'flex-start'
      },
      settingsText:{
          marginTop:15,
          marginLeft:140,
          color:'#C4C4C4',
          fontSize:15
      },
      mealText:{
        flex:2,
        justifyContent: 'center',
        alignItems:'center',

      },
      mealTitle:{
        fontSize:20,
      },
      setting:{
            flex:2,
            alignItems:'center'
      },
      pickers:{
        flex:3,
        flexDirection:'row',
        alignSelf:'center',
        justifyContent:'flex-start'
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
    
  });



