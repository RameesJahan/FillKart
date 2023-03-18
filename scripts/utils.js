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

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
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
  console.log(raw);
  let users = raw ? JSON.parse(raw) : [];
  let found = users.some((item) => item.id === id);
  if (!found) users.push(user);

  window.localStorage.setItem("USERS", JSON.stringify(users));
};

const getUser = (id) => {
  let users = JSON.parse(window.localStorage.getItem("USERS"));
  return users.find((item) => item.id === id);
};

const updateName = (user, name) => {
  let users = JSON.parse(window.localStorage.getItem("USERS"));
  let index = users.findIndex((item) => item.id === user.uid);
  users[index].name = name;
  window.localStorage.setItem("USERS", JSON.stringify(users));
};

const delUser = (id) => {
  let users = JSON.parse(window.localStorage.getItem("USERS"));
  users = users.filter((item) => item.id !== id);
  window.localStorage.setItem("USERS", JSON.stringify(users));
};

const addToCart = (user, proId) => {
  let users = JSON.parse(window.localStorage.getItem("USERS"));
  let index = users.findIndex((item) => item.id === user.id);
  users[index].cart.push(proId);
  window.localStorage.setItem("USERS", JSON.stringify(users));
};

const removeFromCart = (user, proId) => {
  let users = JSON.parse(window.localStorage.getItem("USERS"));
  let index = users.findIndex((item) => item.id === user.id);
  users[index].cart = removeAllItem(proId,users[index].cart);
  window.localStorage.setItem("USERS", JSON.stringify(users));
};

const placeOrder = (user, proId) => {
  let users = JSON.parse(window.localStorage.getItem("USERS"));
  let index = users.findIndex((item) => item.id === user.id);
  users[index].orders.push(proId);
  window.localStorage.setItem("USERS", JSON.stringify(users));
};

const cancelOrder = (user, proId) => {
  let users = JSON.parse(window.localStorage.getItem("USERS"));
  let index = users.findIndex((item) => item.id === user.id);
  users[index].orders = removeAllItem(proId,users[index].orders);
  window.localStorage.setItem("USERS", JSON.stringify(users));
};

function removeAllItem(value, array) {
  return array.filter((item) => item !== value);
}

export {
  getJsonData,
  encode,
  debounce,
  goBack,
  validatePassword,
  validateName,
  validateEmail,
  checkPasswordStrength,
  createUser,
  getUser,
  updateName,
  addToCart,
  removeFromCart,
  placeOrder,
  cancelOrder,
  delUser
};
