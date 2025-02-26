import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSIXK5JGMHZzuiSnO_OM_UxQf3zOSquZQ",
  authDomain: "fitbalance-39b85.firebaseapp.com",
  projectId: "fitbalance-39b85",
  storageBucket: "fitbalance-39b85.appspot.com", 
  messagingSenderId: "566157054130",
  appId: "1:566157054130:web:006f68fcfc216da6ee39ab",
  measurementId: "G-4V10G9BJY6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };