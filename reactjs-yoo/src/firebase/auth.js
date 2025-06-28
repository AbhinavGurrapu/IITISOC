import { auth } from "./firebase";
import { CreateUserWithEmailAndPassword, GoogleAuthProvider, SignInWithEmailAndPassword, signOut } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return CreateUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  return SignInWithEmailAndPassword(auth, email, password);
};
export const doSignInWIthGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await SignInWithPopup(auth, provider);
  return result;
};

export const doSignOut = () => {
  return signOut(auth);
};