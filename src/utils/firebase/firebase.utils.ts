import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyCU_8Lk_XYfErTC1-mI8htZ-yfp0P-b74A",
  authDomain: "habbit-db.firebaseapp.com",
  projectId: "habbit-db",
  storageBucket: "habbit-db.appspot.com",
  messagingSenderId: "572942493414",
  appId: "1:572942493414:web:32ce0922b039aee414fd27",
  measurementId: "G-1ML4JWKDF3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
const auth = getAuth();
// const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInWithFacebook = () => signInWithPopup(auth, facebookProvider);
export const signInWithTwitter = () => signInWithPopup(auth, twitterProvider);
