// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9ipHpoM_DwXI_USnN3VjutiGporKK0uY",
  authDomain: "console-log-3eda1.firebaseapp.com",
  projectId: "console-log-3eda1",
  storageBucket: "console-log-3eda1.appspot.com",
  messagingSenderId: "669827153900",
  appId: "1:669827153900:web:badd1030c95a01ba820ac9",
  measurementId: "G-06F5WH5SW9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
