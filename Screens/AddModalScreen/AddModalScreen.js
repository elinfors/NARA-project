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
import RegMeal from '../RegMeal/RegMealModal'



export default AddModal = () => {
 // const [modalVisible, setModalVisible] = useState(false);
  //const [currentStage, setCurrentStage] = useState(1)
  const {modalVisible, setModalVisible, toggleVisible} = useContext(ModalVisibleContext)
  const {currentMeal, setCurrentMeal, currentStage, setCurrentStage} = useContext(CurrentMealContext)


  const handleNext = (meal) => {
    setCurrentMeal(meal)
    if(meal === 'Extra Snack'){
      setCurrentStage(currentStage+2)
    }
    else{
      setCurrentStage(currentStage+1)

    }
    console.log(currentStage)
  }

  const handleBack = () => {
    setCurrentStage(currentStage-1)
    console.log(currentStage)
  }

  const handleClose = () => {
    setModalVisible(false)
    console.log('modal visible: ',modalVisible)
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
            
            <Text style={styles.textStyle}> </Text>
            <Text style={styles.textStyle}>REGISTER</Text>
             <TouchableOpacity onPress={()=>handleClose()}>
                <Ionicons name={'ios-close'} size={40} color={'black'} />
            </TouchableOpacity>
            
          </View>
          <View style={styles.constumContentView}>
            {/*
            <TouchableOpacity
                    style={styles.mealCard}
                    onPress={()=>handleNext('Breakfast')}>
                    <Text style={styles.cardTitle}>BREAKFAST</Text>
            </TouchableOpacity>
            <TouchableOpacity
                    style={styles.mealCard}
                    onPress={()=>handleNext('Snack')}>
                    <Text style={styles.cardTitle}>SNACK</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.constumContentView}>
            <TouchableOpacity
                    style={styles.mealCard}
                    onPress={()=>handleNext('Lunch')}>
                    <Text style={styles.cardTitle}>LUNCH</Text>
            </TouchableOpacity>
            <TouchableOpacity
                    style={styles.mealCard}
                    onPress={()=>handleNext('Dinner')}>
                    <Text style={styles.cardTitle}>DINNER</Text>
            </TouchableOpacity>
            */}
            <TouchableOpacity
                    style={styles.mealCard}
                    onPress={()=>handleNext('Extra Snack')}>
                    <Text style={styles.cardTitle}>ADD EXTRA SNACK</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.constumContentViewComp}>
            <TouchableOpacity
                    style={styles.mealCard}
                    onPress={()=>handleNext('comp')}>
                    <Text style={styles.cardTitle}>COMPENSATION</Text>
            </TouchableOpacity>
            </View>

          </View>

        : currentStage === 10 ?
        <RegMeal></RegMeal>
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
    height: '90%'
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
  constumContentView:{
    //alignItems:'center',
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft:20,
    marginRight:20,
    marginTop:20,
  },
  constumContentViewComp:{
    //alignItems:'center',
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft:30,
    marginRight:30,
    marginTop:25,
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
    color: 'white',
},
mealCard: {
    backgroundColor: '#7CA179',
    padding:15,
    height: 80,
    width:'80%',
    margin:10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: 'center'
},
mealCardComp: {
  backgroundColor: '#7CA179',
  padding:15,
  height: 120,
  width:160,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: 'center'
},
plusButton:{
  marginRight:10
}
  
});