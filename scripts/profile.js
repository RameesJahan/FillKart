import {
  auth,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  deleteUser
} from "./firebase.js";
import { getUser, updateName, validateName , delUser} from "./utils.js";

const btnSignIn = document.getElementById("btn-signin");
const profPic = document.getElementById("prof-pic");
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const btnEdtName = document.getElementById("btn-edit-name");
const btnEdtPass = document.getElementById("btn-edit-pass");
const diaContainer = document.getElementById("dialog-container");
const errEdtName = document.getElementById("edt-name-err-msg");

var user;

const removeUser = (u) => {
  
  if (confirm("Are You Sure?") == true) {
    deleteUser(u).then(() => {
      // User deleted.
      delUser(u.uid);
      alert("Account Deleted!");
      window.location.reload();
    }).catch((error) => {
      // An error ocurred
      alert("An Error Occurred!")
    });
  } else {
    console.log("Cancelled")
  }
};

window.addEventListener("load", () => {
  const currentUser = auth.currentUser;
  btnSignIn.onclick = goToSignIn;
  btnEdtName.onclick = editName;
  btnEdtPass.onclick = changePass;

  //Get Current User
  onAuthStateChanged(auth, (u) => {
    document.getElementById("use-edt-cont").style.display = u?"flex":"none";
    if (u) {
      // User is signed in
      if (!u.emailVerified) window.location.href = "/pages/verify.html";

      user = getUser(u.uid);
      document.getElementById("btn-my-orders").onclick = () =>
        (window.location.href = "/pages/orders.html");
      document.getElementById("btn-my-cart").onclick = () =>
        (window.location.href = "/pages/cart.html");
      main();
      
      document.getElementById('btn-dlt-usr').onclick = () => removeUser(u);
      
    } else {
      // User is signed out
      console.log("User is signed out");
      btnSignIn.onclick = goToSignIn;
      document.getElementById("btn-my-orders").onclick = () =>
        alert("User Not Signed In");
      document.getElementById("btn-my-cart").onclick = () =>
        alert("User Not Signed In");
      document.getElementById("btn-dlt-usr").onclick = () =>
        alert("User Not Signed In");
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

const editName = () => {
  console.log("Clicked");
  diaContainer.classList.add("show");
  document.getElementById("ipt-edit-name").focus();
};

document.getElementById("edt-name-cancel").onclick = () => {
  document.getElementById("ipt-edit-name").value = "";
  document.getElementById("ipt-edit-name").blur();
  diaContainer.classList.remove("show");
};

document.getElementById("edt-name-save").onclick = () => {
  let u = auth.currentUser;
  let name = document.getElementById("ipt-edit-name").value.toString();

  if (validateName(name)) {
    updateProfile(u, { displayName: name })
      .then(() => {
        // Profile updated!
        updateName(u, name);
        window.location.reload();
      })
      .catch((error) => {
        // An error occurred
        console.log(error);
        errEdtName.classList.add("show");
        errEdtName.innerText = error.message;
      });
  } else {
    errEdtName.classList.add("show");
    errEdtName.innerText = "Enter Valid Name";
  }
};

const changePass = () => {
  let u = auth.currentUser;
  console.log("Clicked");
  sendPasswordResetEmail(auth, u.email)
    .then(() => {
      // Password reset email sent!
      alert("Check your Mail for Password Reset");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error);
    });
};


