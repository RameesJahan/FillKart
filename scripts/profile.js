import { auth, signOut, onAuthStateChanged } from "./firebase.js";
import { getUser } from "./utils.js";

const btnSignIn = document.getElementById("btn-signin");
const profPic = document.getElementById("prof-pic");
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");

var user;

window.addEventListener("load", () => {
  const currentUser = auth.currentUser;
  btnSignIn.onclick = goToSignIn;

  //Get Current User
  onAuthStateChanged(auth, (u) => {
    if (u) {
      // User is signed in
      user = getUser(u.uid);
      main();
    } else {
      // User is signed out
      console.log("User is signed out");
      btnSignIn.onclick = goToSignIn;
    }
  });
});

const goToSignUp = () => {
  window.location.href = "./signup.html";
};
const goToSignIn = () => {
  window.location.href = "./signin.html";
};
const logOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      alert("Sign Out Successful");
      window.location.reload();
    })
    .catch((error) => {
      // An error happened.
    });
};

const main = () => {
  console.log(user);
  btnSignIn.innerText = "Sign Out";
  btnSignIn.onclick = logOut;
  profPic.src = user.photoUrl;
  userName.innerText = user.name;
  userEmail.innerText = user.email;
};
