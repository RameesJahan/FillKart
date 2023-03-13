import { getUser, getJsonData, removeFromCart } from "./utils.js";
import { auth, onAuthStateChanged } from "./firebase.js";

var user, cart, products;

getJsonData("/data/products.json")
  .then((data) => {
    products = data;
  })
  .catch((error) => {
    console.error(error);
  });

const removeCartItem = (user, item) => {
  removeFromCart(user, item);
  alert("Product Removed From Cart");
  window.location.reload();
};

window.onload = () => {
  onAuthStateChanged(auth, (u) => {
    if (u) {
      // User is signed in
      if (!u.emailVerified) window.location.href = "/pages/verify.html";

      user = getUser(u.uid);
      cart = user.cart;

      loadCart(cart);
      console.log(user);
    } else {
      // User is signed out
      alert("User not Signed In");
      window.history.back();
    }
  });
};

const loadCart = (data) => {
  document.getElementById("empty-cart").style.display =
    data && data.length > 0 ? "none" : "flex";

  const cartList = document.getElementById("cart-list");

  /*
  data.forEach((item) => {
    let product = products.find((obj) => obj.id === item);
    let q = 0;
    
    let temp = `<div class="pro-item row bottom-line">
                  <div class="pro-item-img-cont col-4">
                    <img class="pro-item-img" src="${product.img}" alt="${product.name}" />
                  </div>
                  <div class="pro-item-details col-6">
                    <span class="pro-item-name">${product.name}</span>
                    <span class="pro-item-brand">${product.brand}</span>
                    <span class="pro-item-price">₹${product.price}</span>
                    <span class="pro-item-qty border-line rounded">Qty: ${q}pc</span>
                  </div>
                  <div class="pro-item-btn-cont col">
                    <input type="button" class="pro-item-btn rounded border-line" name="pro-item-btn" id="pro-remove-btn"  value="Remove" />
                  </div>
                </div>`;
    
    cartList.innerHTML += temp;
  });*/
  let countMap = new Map();

  data.forEach((item) => {
    if (countMap.has(item)) {
      countMap.set(item, countMap.get(item) + 1);
      return;
    }

    let product = products.find((obj) => obj.id === item);
    if (product) {
      countMap.set(item, 1);
    }
  });

  countMap.forEach((count, item) => {
    let product = products.find((obj) => obj.id === item);
    let temp = `<div class="pro-item row bottom-line">
                  <div class="pro-item-img-cont col-4">
                    <img class="pro-item-img" src="${product.img}" alt="${product.name}" />
                  </div>
                  <div class="pro-item-details col-6">
                    <span class="pro-item-name">${product.name}</span>
                    <span class="pro-item-brand">${product.brand}</span>
                    <span class="pro-item-price">₹${product.price}</span>
                    <span class="pro-item-qty border-line rounded">Qty: ${count} ${count > 1 ? "pcs" : "pc"}</span>
                  </div>
                  <div class="pro-item-btn-cont col">
                    <input type="button" class="pro-item-btn rounded border-line" name="pro-item-btn" id="pro-remove-btn-${item}" value="Remove" />
                  </div>
                </div>`;

    cartList.innerHTML += temp;
    document
      .getElementById("pro-remove-btn-" + item)
      .addEventListener("click", function () {
        removeCartItem(user, item);
      });
  });
};
