import React, { useState, useContext} from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity, Image } from "react-native";
import Modal from 'react-native-modal';
import {MealPlanContext} from '../../App'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';


export default SettingsScreen = () => {
    const {currentMealEdit, setCurrentMealEdit} = useContext(MealPlanContext)
    const [hour, setHour] = useState('07')
    const [minute, setMinute] = useState('07')
    var name = currentMealEdit.name.toUpperCase();

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
                <View style={styles.timeNotice}>
                    <Text>Time for meal</Text>
                    <View style={styles.pickers}>
                    <Picker
                    selectedValue={hour}
                    style={{height: 50, width: 100}}
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
                    style={{height: 50, width: 200}}
                    onValueChange={(itemValue, itemIndex) =>
                       setMinute(itemValue)
                    }>
                    <Picker.Item label="00" value="00" />
                    <Picker.Item label="15" value="15" />
                    <Picker.Item label="30" value="30" />
                    <Picker.Item label="45" value="45" />
                    </Picker>
                    </View>
                </View>
                <View style={styles.timeNotice}>
                    <Text>Notification</Text>
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
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        marginBottom: 50,

      },
      timeNotice:{
          padding:22,
        flex:1,
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        alignContent:'flex-start'

      },
      mealTitle:{
        fontSize:20,
      },
      pickers:{
        flex: 1,
        flexDirection: 'row',
        justifyContent:'center'


      }
    
  });




