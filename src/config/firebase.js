// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYROf_4Xl9FgA5fDKzTEAOsOWcG4IZNQ8",
  authDomain: "test-86449.firebaseapp.com",
  databaseURL: "https://test-86449-default-rtdb.firebaseio.com",
  projectId: "test-86449",
  storageBucket: "test-86449.appspot.com",
  messagingSenderId: "260252718800",
  appId: "1:260252718800:web:6e12681dbc48b7d25530d5"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
export const db = initializeApp(firebaseConfig)
export const auth = firebase.auth();
export default firebase;