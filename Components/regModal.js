import React, { useState } from 'react';
import { StyleSheet, View, Button, Icon, Text} from "react-native";
import Modal from 'react-native-modal';


export default RegScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Button onPress={() => {setModalVisible(true)}}
        buttonStyle={styles.buttonStyle}
        icon={
          <Icon name={"creditCard"} width="80" height="80" />}
          title = 'button'
      ></Button>
      <View style={styles.container}>
        <Modal
          backdropOpacity={0.3}
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          style={styles.contentView}
        >
          <View style={styles.content}>
            <Text style={styles.contentTitle}>Hi 👋!</Text>
            <Text>Hello from Overlay!</Text>
          </View>
        </Modal>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
	buttonStyle: {
    height: 90,
    width: 90,
    backgroundColor: 'white',
    borderRadius: 100
  }
});