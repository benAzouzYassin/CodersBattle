import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

export type AppUser = {
  finishedChallengesCount: number;
  email: string;
  name: string;
  userImg: string;
  solvedProblems: string[];
  ownedChallenges: string[];
  leetCodeId: string;
  isVerified: boolean;
  finishedChallenges: string[];
  currentChallenges: string[];
  createdAt: Timestamp;
};

export const config = {
  apiKey: "AIzaSyDYY1oKwwOyw4cRosioo72QzkypxXhTGD4",

  authDomain: "codersbattles.firebaseapp.com",

  projectId: "codersbattles",

  storageBucket: "codersbattles.appspot.com",

  messagingSenderId: "167544498308",

  appId: "1:167544498308:web:3236b17b1eeed4221fbad1",
};

const app = initializeApp(config);

/***********************AUTH************************/
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export async function singUp(email: string, password: string) {
  email = email.toLowerCase();
  password = password.toLowerCase();
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export async function singIn(email: string, password: string) {
  email = email.toLowerCase();
  password = password.toLowerCase();
  return signInWithEmailAndPassword(auth, email, password);
}
export function getCurrentUser() {
  return auth.currentUser;
}
export function onAuthChange(cb: (user: User | null) => void) {
  onAuthStateChanged(auth, cb);
}

export function signOut() {
  auth.signOut();
}

export async function signInWithGithub() {
  signInWithPopup(auth, githubProvider);
}

/******************************FIRESTORE*******************************/
export const db = getFirestore(app);

export function saveNewUser(user: User) {
  const userToSave: AppUser = {
    finishedChallengesCount: 0,
    email: user.email ?? "",
    currentChallenges: [],
    finishedChallenges: [],
    isVerified: false,
    leetCodeId: "",
    ownedChallenges: [],
    solvedProblems: [],
    name: user.displayName ?? user?.email?.split("@")[0] ?? "",
    userImg: user.photoURL ?? "",
    createdAt: Timestamp.fromDate(new Date()),
  };
  const docRef = doc(db, "users", user.uid);
  setDoc(docRef, userToSave);
}
export async function getUserData(userId: string) {
  const target = doc(db, "users", userId);
  const snapshot = await getDoc(target);
  const currentUser = snapshot.data() as AppUser;
  return currentUser;
}
export async function isNewUser(id: string) {
  const user = await getUserData(id)
  if (!user) {
    return true
  } else {
    throw new Error("Old user ! ")
  }
}