
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

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

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };