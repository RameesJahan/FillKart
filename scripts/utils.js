const getJsonData = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = xhr.response;
        resolve(data);
      } else {
        reject(new Error("Error fetching JSON data"));
      }
    };
    xhr.onerror = () => {
      reject(new Error("Error fetching JSON data"));
    };
    xhr.send();
  });
};

const encode = (str) => {
  return str.trim().replace(/ /g, "+");
};

function goBack() {
  window.history.back();
}

function validatePassword(password) {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  return regex.test(password);
}

function validateName(name) {
  const regex = /^[a-zA-Z]+([ ][a-zA-Z]+)*$/;
  return regex.test(name);
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function checkPasswordStrength(password) {
  if (!password) {
    return "Password is required";
  }
  if (password.length < 8 || /^[a-zA-Z]+$/.test(password)) {
    return "Weak";
  }

  let hasLowercase = /[a-z]/.test(password);
  let hasUppercase = /[A-Z]/.test(password);
  let hasNumber = /\d/.test(password);
  let hasSymbol = /[^a-zA-Z0-9]/.test(password);
  let hasRepeatedChar = /(.).*\1/.test(password);

  if (
    hasLowercase &&
    hasUppercase &&
    hasNumber &&
    hasSymbol &&
    !hasRepeatedChar
  ) {
    return "Strong";
  }

  if (hasLowercase && hasUppercase && hasNumber && hasSymbol) {
    return "Good";
  }

  return "Medium";
}
//console.log(checkPasswordStrength("@JohnDoe"))

const createUser = (id, name, email, photo = "/images/img_avatar.png") => {
  const user = {
    id: id,
    name: name,
    email: email,
    photoUrl: photo,
    cart: [],
    orders: [],
  };

  let raw = window.localStorage.getItem("USERS");

  if (raw) {
    let users = JSON.parse(raw);
  } else {
    let users = [];
  }
  let found = users.some((item) => item.id === id);
  if(!found) users.push(user);

  window.localStorage.setItem("USERS", JSON.stringify(users));
};

const getUser = (id) => {
  let users = JSON.parse(window.localStorage.getItem("USERS"));
  return users.find((item) => item.id === id);
};

export {
  getJsonData,
  encode,
  goBack,
  validatePassword,
  validateName,
  validateEmail,
  checkPasswordStrength,
  createUser,
  getUser
};
