import React, { useState, useContext} from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity, Image } from "react-native";
import Modal from 'react-native-modal';
import {ModalVisibleContext} from '../../App'
import {CurrentMealContext} from '../../App'
import Ionicons from 'react-native-vector-icons/Ionicons';
var plusBtn = require('../../Components/Images/plusBtn.png')
var plusButton = require('../../Components/Images/plus.png')

import MealForm from './FormComponents/mealForm'
import CompForm from './FormComponents/CompForm'



export default AddModal = () => {
 // const [modalVisible, setModalVisible] = useState(false);
  //const [currentStage, setCurrentStage] = useState(1)
  const {modalVisible, setModalVisible, toggleVisible} = useContext(ModalVisibleContext)
  const {currentMeal, setCurrentMeal, currentStage, setCurrentStage} = useContext(CurrentMealContext)


  const handleNext = (meal) => {
    setCurrentMeal(meal)
    setCurrentStage(currentStage+1)
    console.log(currentStage)
  }

  const handleBack = () => {
    setCurrentStage(currentStage-1)
    console.log(currentStage)
  }

  const handleClose = () => {
    setModalVisible(false)
    setCurrentStage(0)
  }

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}
      >
    <Image source = {plusButton} style={styles.plusButton}/>    
      </TouchableOpacity>

      <View style={styles.container}>
        <Modal
          backdropOpacity={0.3}
          isVisible={modalVisible}
          onBackdropPress={() => handleClose()}
          style={styles.contentView}
        >
        {currentStage === 0 ? 
          <View style={styles.ModalView}>

          <View style={styles.headlineView}>
            
            <Text style={styles.textStyle}>Hi 👋!</Text>
            
          </View>
          
            <TouchableOpacity
                    style={styles.mealCard}
                    onPress={()=>handleNext('breakfast')}>
                    <Text style={styles.cardTitle}>Breakfast</Text>
            </TouchableOpacity>
            <TouchableOpacity
                    style={styles.mealCard}
                    onPress={()=>handleNext('snack1')}>
                    <Text style={styles.cardTitle}>Snack</Text>
            </TouchableOpacity>
            <TouchableOpacity
                    style={styles.mealCard}
                    onPress={()=>handleNext('lunch')}>
                    <Text style={styles.cardTitle}>Lunch</Text>
            </TouchableOpacity>
            <TouchableOpacity
                    style={styles.mealCard}
                    onPress={()=>handleNext('comp')}>
                    <Text style={styles.cardTitle}>Comp</Text>
            </TouchableOpacity>
            

          </View>

        : 
        currentMeal === 'comp' ? 
        <CompForm></CompForm>
        :
        <MealForm></MealForm>
      
        
        }
                
        </Modal>
      </View>
    </>
  );
}
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
  },
  cardTitle: {
    color: '#404040',
    fontSize: 20,
},
mealCard: {
    backgroundColor: '#ffffff',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    height: 60,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
},
plusButton:{
  marginRight:10
}
  
});