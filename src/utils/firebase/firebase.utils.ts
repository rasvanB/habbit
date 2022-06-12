import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  NextOrObserver,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
  User,
  UserCredential,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
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
initializeApp(firebaseConfig);
const auth = getAuth();
// const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();
facebookProvider.addScope("email");
twitterProvider.addScope("email");
googleProvider.addScope("email");
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInWithFacebook = () => signInWithPopup(auth, facebookProvider);
export const signInWithTwitter = () => signInWithPopup(auth, twitterProvider);

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangeListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

type AdditionalUserInfo = {
  displayName?: string;
};

type authMethods = "google" | "facebook" | "twitter";

export type UserInfo = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
};

const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth: UserInfo,
  additionalInformation: AdditionalUserInfo = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        ...userAuth,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error);
    }
  }
};

export const createUserDocument = (data: UserCredential) => {
  const { user } = data;
  if (
    !user ||
    !user.uid ||
    !user.displayName ||
    !user.providerData[0].email ||
    !user.photoURL
  )
    return;

  let userInfo: UserInfo = {
    uid: user.uid,
    email: user.providerData[0].email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
  createUserDocumentFromAuth(userInfo);
};

export const signInWithProvider = async (provider: authMethods) => {
  let userCredential: UserCredential | null = null;
  try {
    switch (provider) {
      case "google":
        await signInWithGoogle().then((data) => {
          createUserDocument(data);
          userCredential = data;
        });
        break;
      case "facebook":
        await signInWithFacebook().then((data) => {
          createUserDocument(data);
          userCredential = data;
        });
        break;
      case "twitter":
        await signInWithTwitter().then((data) => {
          createUserDocument(data);
          userCredential = data;
        });
        break;
    }
  } catch (error) {
    return error as FirebaseError;
  }
  if (userCredential) {
    const { user } = userCredential;
    return user;
  }
};
