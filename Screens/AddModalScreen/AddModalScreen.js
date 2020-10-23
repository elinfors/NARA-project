import React, { useState, useContext} from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity, Image } from "react-native";
import Modal from 'react-native-modal';
import {ModalVisibleContext} from '../../App'
import {CurrentMealContext} from '../../App'
import Ionicons from 'react-native-vector-icons/Ionicons';
var plusBtn = require('../../Components/Images/plusBtn.png')
var plusButton = require('../../Components/Images/plus.png')



export default AddModal = () => {
 // const [modalVisible, setModalVisible] = useState(false);
  //const [currentStage, setCurrentStage] = useState(1)
  const [inputMeal, setinputMeal] = useState('')
  const {modalVisible, setModalVisible, toggleVisible} = useContext(ModalVisibleContext)
  const {currentMeal, setCurrentMeal, currentStage, setCurrentStage} = useContext(CurrentMealContext)

  const handleNext = () => {
    setCurrentStage(currentStage+1)
    console.log(currentStage)
  }

  const handleBack = () => {
    setCurrentStage(currentStage-1)
    console.log(currentStage)
  }

  const renderText = (stage) => {
    if (stage === 1) {
       return (<>
            
           
              <TouchableOpacity onPress={()=>setinputMeal('breakfast')} style={styles.buttonStyle}>
                <Text style={styles.buttonTitle}>Breakfast</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setinputMeal('lunch')} style={styles.buttonStyle}>
                <Text style={styles.buttonTitle}>Lunch</Text>
              </TouchableOpacity>



       </>)
    }
    if(stage === 2){
    return  <Text> {currentMeal} at {currentStage}</Text>
    }
    if(stage === 3){
      return  <Text>what did you eat?</Text>; 
    }
    if(stage === 4){
      return  <Text>pre filled question about meal</Text>; 
    }
    if(stage === 5){
      return  <Text>add comment</Text>; 
    }
}


  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}
        style={backgroundColor='white'}
      >
    <Image source = {plusButton}/>    
      </TouchableOpacity>

      <View style={styles.container}>
        <Modal
          backdropOpacity={0.3}
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={styles.contentView}
        >
  
          <View style={styles.ModalView}>

            <View style={styles.headlineView}>
              <TouchableOpacity onPress={()=>handleBack()}>
                <Ionicons name={'ios-arrow-back'} size={30} color={'black'} />
              </TouchableOpacity>
              <Text style={styles.textStyle}>Hi 👋!</Text>
              <TouchableOpacity>
                <Ionicons name={'ios-close'} size={40} color={'black'} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.constumContentView}>
              {renderText(currentStage)}

            </View>

            {/*NEXT BUTTON*/}
              <View style={styles.nextBtnView}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={()=>handleNext()}>
                  <Text style={styles.buttonTitle}>{currentStage === 5 ? 'Submit': 'Next'}</Text>
                </TouchableOpacity>
              </View>

          </View>
          
                
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