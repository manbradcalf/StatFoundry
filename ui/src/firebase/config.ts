import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVB2VSHdVF7ChpdxZnKoysKpzKGUrVjAU",
  authDomain: "statfoundry.firebaseapp.com",
  projectId: "statfoundry",
  storageBucket: "statfoundry.firebasestorage.app",
  messagingSenderId: "593055794947",
  appId: "1:593055794947:web:60408d90d1948d8c4ccb36",
  measurementId: "G-WXE3QT8F8B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
console.log(db)
export default app;
