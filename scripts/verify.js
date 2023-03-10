import { auth, onAuthStateChanged ,sendEmailVerification } from "./firebase.js";

//const btnVerify =  document.getElementById("btn-verify");
const txtVerify =  document.getElementById("txt-verify");

window.onload = () => {
  //Get Current User
  onAuthStateChanged(auth, (u) => {
    if (u) {
      if (u.emailVerified) {
        console.log("Email Verified");
        //window.postMessage("Verified", '*');
          window.history.back();
      } else {
        sendEmailVerification(u).then(() => {
          // Email verification sent!
          console.log("Email verification sent!")
          //btnVerify.value = "Verify";
          //btnVerify.blur();
          //txtVerify.innerText = "Check your inbox and follow the instructions in the verification email.";
          
        });
      }
    } else {
      console.log("User Not Logged In");
    }
  });
}

window.onfocus = () => {
  window.location.reload();
}