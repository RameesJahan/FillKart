import { auth, onAuthStateChanged } from "./firebase.js";

window.onload = () => {
  //Get Current User
  onAuthStateChanged(auth, (u) => {
    if (u) {
      if (u.emailVerified) {
        console.log("Email Verified")
        
      } else {
        sendEmailVerification(u).then(() => {
          // Email verification sent!
          console.log("Email verification sent!")
        });
      }
    } else {
      console.log("User Not Logged In")
    }
  });
};
