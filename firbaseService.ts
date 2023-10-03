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

export const config = {
  apiKey: "AIzaSyDYY1oKwwOyw4cRosioo72QzkypxXhTGD4",

  authDomain: "codersbattles.firebaseapp.com",

  projectId: "codersbattles",

  storageBucket: "codersbattles.appspot.com",

  messagingSenderId: "167544498308",

  appId: "1:167544498308:web:3236b17b1eeed4221fbad1",
};

const app = initializeApp(config);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export async function singUp(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export async function singIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}
export function getCurrentUser() {
  console.log(auth.currentUser);
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
