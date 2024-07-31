// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCu8SqS1Cg0HrSbDhzxhJt7ZPjmTHpODRw",
  authDomain: "fashion-web-order-dashboard.firebaseapp.com",
  projectId: "fashion-web-order-dashboard",
  storageBucket: "fashion-web-order-dashboard.appspot.com",
  messagingSenderId: "674577611221",
  appId: "1:674577611221:web:20326fd8b2bfced50d255c",
  measurementId: "G-5HM4KB7YJR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

