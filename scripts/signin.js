import { validateEmail , validatePassword , createUser } from './utils.js';
import {
  auth,
  provider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "./firebase.js";

const iptEmail = document.getElementById('signin-ipt-email');
const iptPass = document.getElementById('signin-ipt-pass');
const errEmail = document.getElementById('si-err-msg-email');
const errPass = document.getElementById('si-err-msg-pass');
const errInfo = document.getElementById('err-wrong-info');
const btnSignIn = document.getElementById('signin-btn');
const btnGoogle = document.getElementById('signin-google');

iptEmail.oninput = (e) => {
  let valid = validateEmail(e.target.value);
  if(valid){
    errEmail.classList.remove('show');
  }else{
    errEmail.classList.add('show');
  }
}

iptPass.oninput = (e) => {
  let valid = validatePassword(e.target.value);
  
  valid?errPass.classList.remove('show')
       :errPass.classList.add('show');
}

btnSignIn.onclick = () => {
  if (!validateEmail(iptEmail.value) && (iptEmail.value === "" || null || undefined)) {
    errEmail.classList.add('show');
    iptEmail.focus();
    return;
  } 
  else if (!validateEmail(iptPass.value) && (iptPass.value === "" || null || undefined)) {
    errPass.classList.add('show');
    iptPass.focus();
    return;
  }else{
    signIn(iptEmail.value,iptPass.value);
  }
}

btnGoogle.onclick = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      createUser(user.uid, user.displayName, user.email, user.photoURL);
      console.log("Sign In Successfully");
      window.location.href = "./profile.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    });
};

const signIn = (email, pass) => {
  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      window.location.href = "./profile.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if(errorCode === "auth/user-not-found"){
        showError("User Not Found")
      }else if(errorCode === "auth/wrong-password"){
        showError("Invalid Email or Password")
      }
      else{
        showError(errorCode)
      }
    });
}

const showError = (message) => {
  errInfo.classList.add("show");
  errInfo.innerText = message;
  
}