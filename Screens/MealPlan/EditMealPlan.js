import React, {useState, useEffect, useContext} from 'react'
import { StyleSheet, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {firebase} from '../Firebase/config'
import Modal from 'react-native-modal';
import {CurrentUserContext} from '../../App'
import {EditModalContext} from '../../App'
import {MealPlanContext} from '../../App'
import SettingsScreen from './SettingsScreen'


export default EditMealPlan=()=> {
    
    const [currentUser, setCurrentUser] = useState(null)

    const userId = useContext(CurrentUserContext)
    const {editModalVisible, setEditModalVisible} = useContext(EditModalContext)
    const {currentMealEdit, setCurrentMealEdit} = useContext(MealPlanContext)
    

    useEffect(()=>{
        setCurrentUser(userId.user.uid)
        console.log(currentUser)
        console.log(editModalVisible + "I MEAL PLAN")
    }, [])


    return (
        <>
        <View>

            <View style={styles.container}>
                <Modal
                backdropOpacity={0.3}
                isVisible={editModalVisible}
                onBackdropPress={() => setEditModalVisible(false)}
                style={styles.contentView}
                >
                   {currentMealEdit === null ? null: 
                   <SettingsScreen></SettingsScreen>}
                </Modal>
            </View>
        </View>
        </>
    )
};

const styles = StyleSheet.create({
    ModalView: {
      backgroundColor: 'white',
      padding: 22,
      //justifyContent: 'center',
      alignItems: 'stretch',
      borderTopRightRadius: 17,
      borderTopLeftRadius: 17,
      height: '92%'
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
    }
    
  });

