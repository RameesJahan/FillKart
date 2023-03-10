import {
  validateName,
  validateEmail,
  checkPasswordStrength,
  createUser,
} from "./utils.js";
import {
  auth,
  provider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "./firebase.js";

const iptName = document.getElementById("signup-ipt-name");
const iptEmail = document.getElementById("signup-ipt-email");
const iptPass = document.getElementById("signup-ipt-pass");
const iptRePass = document.getElementById("signup-ipt-repass");
const btnSignUp = document.getElementById("signup-btn");
const btnGoogle = document.getElementById("signup-btn-google");
const errMsgName = document.getElementById("err-msg-name");
const errMsgMail = document.getElementById("err-msg-email");
const errMsgPass = document.getElementById("err-msg-pass");
const errMsgRePass = document.getElementById("err-msg-repass");
const errInfo = document.getElementById('err-wrong-info');

iptName.oninput = (e) => {
  let valid = validateName(e.target.value);
  if (valid) {
    errMsgName.classList.remove("show");
  } else {
    errMsgName.classList.add("show");
  }
};

iptEmail.oninput = (e) => {
  let valid = validateEmail(e.target.value);
  if (valid) {
    errMsgMail.classList.remove("show");
  } else {
    errMsgMail.classList.add("show");
  }
};

iptPass.oninput = (e) => {
  let strength = checkPasswordStrength(e.target.value);
  errMsgPass.classList.add("show");
  errMsgPass.innerText = strength;

  if (strength === "Medium") {
    errMsgPass.style.color = "#a9b500";
  } else if (strength === "Good") {
    errMsgPass.style.color = "#008900";
  } else if (strength === "Strong") {
    errMsgPass.style.color = "#800080";
  } else {
    errMsgPass.style.color = "#ff0000";
  }
};

iptRePass.oninput = (e) => {
  errMsgRePass.classList.add("show");
  if (!(e.target.value === iptPass.value)) {
    errMsgRePass.style.color = "#ff0000";
    errMsgRePass.innerText = "Password is not Matching";
  } else {
    errMsgRePass.style.color = "#008900";
    errMsgRePass.innerText = "Password Matched";
  }
};

btnSignUp.onclick = (e) => {
  if (iptName.value === "" || null || undefined) {
    errMsgName.innerText = "This Field Must Not Be Blank";
    errMsgName.classList.add("show");
    iptName.focus();
    return;
  } else if (!validateName(iptName.value)) {
    errMsgName.innerText = "Enter Valid Name";
    errMsgName.classList.add("show");
    iptName.focus();
    return;
  } else if (iptEmail.value === "" || null || undefined) {
    errMsgMail.innerText = "This Field Must Not Be Blank";
    errMsgMail.classList.add("show");
    iptEmail.focus();
    return;
  } else if (!validateEmail(iptEmail.value)) {
    errMsgMail.innerText = "Enter Valid Email";
    errMsgMail.classList.add("show");
    iptEmail.focus();
    return;
  } else if (iptPass.value === "" || null || undefined) {
    errMsgPass.innerText = "This Field Must Not Be Blank";
    errMsgPass.classList.add("show");
    errMsgPass.style.color = "#ff0000";
    iptPass.focus();
    return;
  } else if (
    checkPasswordStrength(iptPass.value) != "Strong" &&
    checkPasswordStrength(iptPass.value) != "Good"
  ) {
    errMsgPass.innerText = "Password Must Contain A-Z,a-z,Numbers and Symbols";
    errMsgPass.classList.add("show");
    errMsgPass.style.color = "#ff0000";
    iptPass.focus();
    return;
  } else if (iptRePass.value === "" || null || undefined) {
    errMsgRePass.innerText = "Re-Type Password";
    errMsgRePass.classList.add("show");
    errMsgRePass.style.color = "#ff0000";
    iptRePass.focus();
    return;
  } else if (iptRePass.value != iptPass.value) {
    errMsgRePass.innerText = "Password is not Matching";
    errMsgRePass.classList.add("show");
    errMsgRePass.style.color = "#ff0000";
    iptRePass.focus();
    return;
  } else {
    console.log("signUp")
    signUp(iptName.value, iptEmail.value, iptPass.value);
  }
};

btnGoogle.onclick = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      createUser(user.uid, user.displayName, user.email, user.photoURL);
      console.log("Sign Up Successfully");
      window.location.href = "./profile.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    });
};

const signUp = (name, email, pass ) => {
  createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      
      createUser(user.uid, name, user.email);
      
      window.location.href = "/pages/verify.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      if(errorCode === "auth/email-already-in-use"){
        showError("Email is invalid or already taken")
      }
      else{
        showError(errorCode)
      }
    });
};

window.onpageshow = () => {
  //Get Current User
  onAuthStateChanged(auth, (u) => {
    if (u) {
      if (u.emailVerified) {
        console.log("Email Verified");
        //window.postMessage("Verified", '*');
        window.location.href = "/index.html";
      } else {
        window.location.href = "/pages/verify.html";
      }
    } else {
      console.log("User Not Logged In");
    }
  });
}

const showError = (message) => {
  errInfo.classList.add("show");
  errInfo.innerText = message;
  setTimeout(() => {
    errInfo.classList.remove("show");
  }, 5000);
}