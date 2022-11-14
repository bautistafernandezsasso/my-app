import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBuIzvl8uMVMTMR50rLFuKO8Uv7uza_Ekw",
    authDomain: "finalprogramacion3-adc41.firebaseapp.com",
    projectId: "finalprogramacion3-adc41",
    storageBucket: "finalprogramacion3-adc41.appspot.com",
    messagingSenderId: "996175899387",
    appId: "1:996175899387:web:a219e9f29305a64dd0de5e"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();