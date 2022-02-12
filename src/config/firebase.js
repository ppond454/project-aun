// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
// ใส่ firebase config
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
export const db = initializeApp(firebaseConfig)
export const auth = firebase.auth();
export default firebase;
