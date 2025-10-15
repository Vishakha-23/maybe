// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTCltn4a9m2_U2-OpjNEo2J3KX59QRn08",
  authDomain: "strideon-d621a.firebaseapp.com",
  projectId: "strideon-d621a",
  storageBucket: "strideon-d621a.firebasestorage.app",
  messagingSenderId: "461524903891",
  appId: "1:461524903891:web:7311c2f4609330ef333126",
  measurementId: "G-1ZRM5ZNDQD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);