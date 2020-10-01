import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView, Alert } from 'react-native';
import * as firebase from "firebase";

//configure firebase
var firebaseConfig = {
  apiKey: "AIzaSyBsxyEqQ10yOtdoJupy3ILRrT7d7blHu3w",
  authDomain: "nearby2-afb20.firebaseapp.com",
  databaseURL: "https://nearby2-afb20.firebaseio.com",
  projectId: "nearby2-afb20",
  storageBucket: "nearby2-afb20.appspot.com",
  messagingSenderId: "721463503697",
  appId: "1:721463503697:web:ba8eeb2f5da201bacd8170",
  measurementId: "G-KHQJ09MJG3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);




export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Hello" onPress={() => Alert.alert("Pressed")}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
