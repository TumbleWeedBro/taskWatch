// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAs-QLuF_5QXRa-W5fsU3jk2nl3rZ8DkWg",
  authDomain: "taskwatch-abe7f.firebaseapp.com",
  projectId: "taskwatch-abe7f",
  storageBucket: "taskwatch-abe7f.firebasestorage.app",
  messagingSenderId: "676438964937",
  appId: "1:676438964937:web:d6216f48417451eae26b18",
  measurementId: "G-VFDLCETR7B"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});