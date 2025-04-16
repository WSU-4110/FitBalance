import { collection, addDoc } from "firebase/firestore";

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


// Function to add food to Firestore



// Firebase Firestore Functions
export const addFoodToFirestore = async (foodData, userId) => {
  try {
    const docRef = await addDoc(collection(db, "foods"), {
      ...foodData,
      userId, // Associate food with user
      createdAt: new Date(),
    })
    console.log("Food added with ID: ", docRef.id)
    return docRef.id
  } catch (e) {
    console.error("Error adding food to Firestore: ", e)
    return null
  }
}

export const updateFoodInFirestore = async (foodId, foodData) => {
  try {
    await setDoc(doc(db, "foods", foodId), foodData, { merge: true })
    console.log("Food updated with ID: ", foodId)
  } catch (e) {
    console.error("Error updating food in Firestore: ", e)
  }
}

export const deleteFoodFromFirestore = async (foodId) => {
  try {
    await deleteDoc(doc(db, "foods", foodId))
    console.log("Food deleted with ID: ", foodId)
  } catch (e) {
    console.error("Error deleting food from Firestore: ", e)
  }
}