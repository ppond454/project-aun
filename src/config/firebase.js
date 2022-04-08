// Import the functions you need from the SDKs you need
import firebase from "firebase";
import "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web db's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVy7M-SPzoECmEdsxC9bGYBQxiRU9KXRQ",
  authDomain: "project-8925d.firebaseapp.com",
  databaseURL: "https://project-8925d-default-rtdb.firebaseio.com",
  projectId: "project-8925d",
  storageBucket: "project-8925d.appspot.com",
  messagingSenderId: "619757971481",
  appId: "1:619757971481:web:bdb011c1d3cacf4507e288",
  measurementId: "G-PMWRB648EN"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);

export const db = firebase.initializeApp(firebaseConfig)
export const auth = db.auth();
export const store = db.firestore();
export default firebase;