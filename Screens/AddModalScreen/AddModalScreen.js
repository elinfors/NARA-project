import React, { useState, useContext} from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity, Image } from "react-native";
import Modal from 'react-native-modal';
import {ModalVisibleContext} from '../../App'
import Ionicons from 'react-native-vector-icons/Ionicons';
var plusBtn = require('../../Components/Images/plusBtn.png')
import MealForm from './FormComponents/mealForm'
import CompForm from './FormComponents/CompForm'


export default AddModal = () => {
 // const [modalVisible, setModalVisible] = useState(false);
  const {modalVisible, setModalVisible, toggleVisible} = useContext(ModalVisibleContext)
  const [currentStage, setCurrentStage] = useState(0)
  const [inputMeal, setinputMeal] = useState('')

  const handleNext = (meal) => {
    setinputMeal(meal)
    setCurrentStage(currentStage+1)
    console.log(currentStage)
  }

  const handleBack = () => {
    setCurrentStage(currentStage-1)
    console.log(currentStage)
  }

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}
        style={backgroundColor='white'}
      >
    <Image source = {plusBtn}/>    
      </TouchableOpacity>

      <View style={styles.container}>
        <Modal
          backdropOpacity={0.3}
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={styles.contentView}
        >
        {currentStage === 0 ? 
          <View style={styles.ModalView}>

          <View style={styles.headlineView}>
            
            <Text style={styles.textStyle}>Hi 👋!</Text>
            
          </View>
          
          <View style={styles.constumContentView}>
            <TouchableOpacity onPress={()=>handleNext('breakfast')} style={styles.buttonStyle}>
              <Text style={styles.buttonTitle}>Breakfast</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>handleNext('lunch')} style={styles.buttonStyle}>
              <Text style={styles.buttonTitle}>Lunch</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>handleNext('comp')} style={styles.buttonStyle}>
              <Text style={styles.buttonTitle}>Comp</Text>
            </TouchableOpacity>

          </View>


        </View>
        : 
        inputMeal === 'comp' ? 
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