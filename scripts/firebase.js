import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDHk4e-krK7Nlqw30ePsYPlVsKe_F3M5Go",
  authDomain: "fill-kart.firebaseapp.com",
  projectId: "fill-kart",
  storageBucket: "fill-kart.appspot.com",
  messagingSenderId: "958596606960",
  appId: "1:958596606960:web:0093796e44e0161fad4b35",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signIn = (email, pass) => {
  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const provider = new GoogleAuthProvider();

export {
  auth,
  provider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail
};
