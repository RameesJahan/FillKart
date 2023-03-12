import { getJsonData, getUser } from "./utils.js";
import { auth, signOut, onAuthStateChanged } from "./firebase.js";

const categories = [
  "Laptops",
  "Phones",
  "Accessories",
  "Mens",
  "Womens",
  "Kids",
];
var products;
var user;

const userPic = document.getElementById("usr_img");
const fabCart = document.getElementById("fab-cart");
const cartBadge = document.getElementById("cart-badge");

document.getElementById("ipt_search").onfocus = (e) => {
  e.preventDefault();
  window.location.href = "/pages/search.html"
}


/*Function to go To Profile page
=========================================*/
window.goToUser = () => {
  window.location.href = "/pages/profile.html";
};

window.addEventListener("load", function () {
  
    //Get Current User
  onAuthStateChanged(auth, (u) => {
    if (u) {
      // User is signed in
      if (!u.emailVerified) window.location.href = "/pages/verify.html";
      
      user = getUser(u.uid);
      main();
      
    } else {
      // User is signed out
      userPic.src = "/images/img_avatar.png";
      cartBadge.classList.add("hide");
      fabCart.onclick = () => { alert("User Not Signed In")};
    }
  });
  
  /*Function to load products
  =========================================*/
  // Call the getJsonData function and log the JSON data to the console
  getJsonData("/data/products.json")
    .then((data) => {
      console.log(data);
      products = data;
      loadCatData();
    })
    .catch((error) => {
      console.error(error);
    });

  /*Function to Create Catagory List
  =========================================*/
  const loadCatData = () => {
    categories.forEach((item) => {
      let temp = `<h3 class="pro-list-cat-title m-2">${item}</h3>
                <div id="pro_item_list_${item}" class="pro-list-item-list m-2"></div>`;

      let elem = document.createElement("div");
      elem.classList.add("pro-list-cat-sec");
      elem.innerHTML = temp;
      document.getElementById("pro_list_cont").appendChild(elem);
      loadProData(item);
    });
  };

  /*Function to create Product List
  =========================================*/
  const loadProData = (i) => {
    let proList = "";

    let result = products.filter((item) => item.category === i);
    if (result == undefined) return;
    result.forEach((item) => {
      let proTemp = `<a href="/pages/product.html?id=${item.id}">
                      <div class="pro-card border-line" data-aos="fade-left">
                        <img class="pro-card-img" 
                             src="${item.img}" 
                             alt="${item.name}" />
                        <span class="pro-card-name">${item.name}</span>
                        <span class="pro-card-brand">${item.brand}</span>
                        <span class="pro-card-price">₹${item.price}</span>
                      </div>
                    </a>`;
      proList += proTemp;
    });
    document.getElementById("pro_item_list_" + i).innerHTML = proList;
  };
  
});

const main = () => {
  console.log(user)
  fabCart.onclick = () => window.location.href = "/pages/cart.html";
  
  //Cart Badge
  if (user.cart.length === 0) {
    cartBadge.style.display = "none";
  }else{
    cartBadge.style.display = "flex";
    cartBadge.innerText = user.cart.length;
  }
  
  userPic.src = user.photoUrl;
}