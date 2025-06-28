// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCYCgr3S3lCWGmPLjtRv-sXrpm1ScQeRsk",
    authDomain: "yooo-2c348.firebaseapp.com",
    projectId: "yooo-2c348",
    storageBucket: "yooo-2c348.appspot.com",
    messagingSenderId: "55253462526",
    appId: "1:55253462526:web:ba3319025b823405f924af",
    measurementId: "G-SVJD3T0Z25"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
