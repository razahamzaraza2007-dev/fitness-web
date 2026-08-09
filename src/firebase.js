import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBw56NYhDJdZryHcP1Ua0__VWMh8X7nEls",
  authDomain: "fitness-1-7204b.firebaseapp.com",
  projectId: "fitness-1-7204b",
  storageBucket: "fitness-1-7204b.firebasestorage.app",
  messagingSenderId: "223395137938",
  appId: "1:223395137938:web:ac1363ec326ecba692594b",
  measurementId: "G-N18JDYEQRY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional for web browsers)
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

// Export Auth & Firestore instances for your React components
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;