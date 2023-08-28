// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getDatabase } from 'firebase/database';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCQ6iZbm8tLnHqOJZZSB6uUm7hSI9UuQNQ",
  authDomain: "question-deck.firebaseapp.com",
  projectId: "question-deck",
  storageBucket: "question-deck.appspot.com",
  messagingSenderId: "888537764254",
  appId: "1:888537764254:web:2cca16a69df35f7190068f",
  measurementId: "G-RSHFGQNCMD"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
// export const provider = new firebaseConfig.auth.GoogleAuthProvider()
export const database= getDatabase(app)
export const db = getFirestore(app)
