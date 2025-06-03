// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2Be1mXO0gIIUeFcYWlX_EBluy3O5BN8w",
  authDomain: "shoppinglistdb-99838.firebaseapp.com",
  projectId: "shoppinglistdb-99838",
  storageBucket: "shoppinglistdb-99838.firebasestorage.app",
  messagingSenderId: "1084119582952",
  appId: "1:1084119582952:web:3d8fcc39c1193b1d83a15d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
