import React, { useState, useContext} from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity, Image } from "react-native";
import Modal from 'react-native-modal';
import {ModalVisibleContext} from '../../../App'
import Ionicons from 'react-native-vector-icons/Ionicons';
var plusBtn = require('../../../Components/Images/plusBtn.png')

export default CompForm = () => {
    const {modalVisible, setModalVisible, toggleVisible} = useContext(ModalVisibleContext)
    const [currentStage, setCurrentStage] = useState(1)

    return(
        <>
        <View style={styles.ModalView}>
            <Text>COMP. FORM</Text>
        </View>
        </>
    )

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
    }
    
  });