import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBQ6N-wJAppJa6-4DKN-LmJIRTFPmVvSZA",
  authDomain: "electrolyte-eb1bc.firebaseapp.com",
  databaseURL: "https://electrolyte-eb1bc-default-rtdb.firebaseio.com",
  projectId: "electrolyte-eb1bc",
  storageBucket: "electrolyte-eb1bc.firebasestorage.app",
  messagingSenderId: "603033135814",
  appId: "1:603033135814:web:10dabb3ea9eda3077ec5c7",
  measurementId: "G-LJ48S4ZXPM"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth,database };
