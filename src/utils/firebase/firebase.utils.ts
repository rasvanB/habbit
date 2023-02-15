import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  NextOrObserver,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
  User,
  UserCredential,
  sendEmailVerification,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { defaultProfilePicURL } from "../store/user.store";
import { getStorage, ref } from "firebase/storage";
import { Habit, HabitSchema, UserData, UserSchema } from "../types.utils";
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
const storage = getStorage();

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
      console.error("error creating the user", error);
    }
  }
};

export const createUserDocument = async (
  data: UserCredential,
  additionalInformation: AdditionalUserInfo = {}
) => {
  const { user } = data;
  if (additionalInformation != null) {
    if (user.email) {
      createUserDocumentFromAuth(
        {
          uid: user.uid,
          email: user.email,
          displayName: additionalInformation.displayName || "Guest",
          photoURL: defaultProfilePicURL,
        },
        additionalInformation
      );
    }
  }

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
  await createUserDocumentFromAuth(userInfo, additionalInformation);
};

export const getUserDocData = async (uid: string) => {
  const userDocRef = doc(db, "users", uid);
  const userSnapshot = await getDoc(userDocRef);
  if (userSnapshot.exists()) {
    const result = UserSchema.safeParse(userSnapshot.data());
    if (result.success) {
      return result.data;
    }
  }
};

export const getImagesStorageRef = (imageName: string) => {
  return ref(storage, imageName);
};

export const editUser = async (newUser: UserData) => {
  const { uid } = newUser;
  const userDocRef = doc(db, "users", uid);
  await setDoc(userDocRef, newUser);
};

export const getUserHabits = async (uid: string) => {
  const habitsQuery = query(collection(db, `users/${uid}/habits`));
  const habitsDocs = await getDocs(habitsQuery);
  const habitsArr: Habit[] = [];
  habitsDocs.forEach((doc) => {
    const result = HabitSchema.safeParse(doc.data());
    if (result.success) {
      habitsArr.push(result.data);
    }
  });
  return habitsArr;
};

export const getUserData = async (uid: string) => {
  const user = await getUserDocData(uid);
  if (user) {
    const userHabits = await getUserHabits(user.uid);
    return { user, habits: userHabits };
  }
  return null;
};

export const addHabitToUser = async (uid: string, habit: Habit) => {
  const habitDocRef = doc(
    db,
    `users/${uid}/habits`,
    habit.timeStamp.toString()
  );
  await setDoc(habitDocRef, habit);
};

export const deleteHabitFromUser = async (uid: string, habit: Habit) => {
  const habitDocRef = doc(
    db,
    `users/${uid}/habits`,
    habit.timeStamp.toString()
  );
  await deleteDoc(habitDocRef);
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

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
  additionalInformation: AdditionalUserInfo = {}
): Promise<{ error: string | null }> => {
  if (!email || !password) {
    return {
      error: "Invalid credentials",
    };
  }
  const signInMethods = await fetchSignInMethodsForEmail(auth, email);
  if (!signInMethods.length) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);
      await createUserDocument(userCredential, additionalInformation);
    } catch (error) {
      return {
        error: errorHandling(error as FirebaseError),
      };
    }
  } else {
    return {
      error: "Email already in use",
    };
  }
  return {
    error: null,
  };
};

export const signInUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<{ error: string | null }> => {
  let error: string | null = null;
  if (!email || !password) error = "Invalid credentials";
  try {
    const data = await signInWithEmailAndPassword(auth, email, password);
    if (!data.user.emailVerified) {
      error = "Email not verified";
    }
  } catch (err) {
    error = errorHandling(err as FirebaseError);
  }
  if (error) await signOutUser();
  return { error };
};

const errorHandling = (error: FirebaseError): string => {
  switch (error.code) {
    case "auth/user-not-found":
      return "User not found";
    case "auth/wrong-password":
      return "Wrong password";
    case "auth/email-already-in-use":
      return "Email already in use";
    case "auth/invalid-credentials":
      return "Invalid credentials";
    case "auth/email-not-verified":
      return "Email not verified";
    default:
      return "Something went wrong";
  }
};
