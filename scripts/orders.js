import { getUser, getJsonData, cancelOrder } from "./utils.js";
import { auth, onAuthStateChanged } from "./firebase.js";

var user, orders, products;

getJsonData("/data/products.json")
  .then((data) => {
    products = data;
  })
  .catch((error) => {
    console.error(error);
  });

window.removeOrder = (item) => {
  cancelOrder(user, item);
  alert("Order Cancelled");
  window.location.reload();
}; 

window.onload = () => {
  onAuthStateChanged(auth, (u) => {
    if (u) {
      // User is signed in
      if (!u.emailVerified) window.location.href = "/pages/verify.html";

      user = getUser(u.uid);
      orders = user.orders;

      loadOrders(orders);
      console.log(user);
    } else {
      // User is signed out
      alert("User not Signed In");
      window.history.back();
    }
  });
};

const loadOrders = (data) => {
  document.getElementById("empty-orders").style.display =
    data && data.length > 0 ? "none" : "flex";

  const ordersList = document.getElementById("orders-list");
  
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
    const itemId = item;
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
                    <input type="button" class="pro-item-btn rounded border-line" name="pro-item-btn" id="pro-remove-btn" value="Cancel Order" 
                           onclick="removeOrder('${itemId}')"/>
                  </div>
                </div>`;

    ordersList.innerHTML += temp;
  });
};