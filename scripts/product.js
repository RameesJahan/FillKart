import { getJsonData, goBack, addToCart, placeOrder , getUser} from "./utils.js";
import { auth, onAuthStateChanged } from "./firebase.js";

var products,user;

window.goBack = goBack;

const btnAddCart = document.getElementById("btn-add-cart");
const btnBuyNow = document.getElementById("btn-buy-now");

window.addEventListener("load", function () {

      //Get Current User
  onAuthStateChanged(auth, (u) => {
    if (u) {
      // User is signed in
      if (!u.emailVerified) window.location.href = "/pages/verify.html";
      user = getUser(u.uid);
      
    } else {
      // User is signed out
      btnAddCart.onclick = () => window.location.href = "/pages/profile.html";
      btnBuyNow.onclick = () => window.location.href = "/pages/profile.html";
    }
  });
  
  /*Function to load products
=========================================*/
  // Call the getJsonData function and log the JSON data to the console
  getJsonData("../data/products.json")
    .then((data) => {
      console.log(data);
      products = data;
      loadData();
    })
    .catch((error) => {
      console.error(error);
    });

  let url = window.location.search;
  let queryString = new URLSearchParams(url);
  console.log(url);

  const loadData = () => {
    let id = queryString.get("id");

    const product = products.find((p) => p.id === id);
    if (!product) {
      document.getElementById("pro-not-found").classList.add("show");
      document.title = "Product Not Found";
      return;
    }
    
    btnAddCart.onclick = () => {
      addToCart(user,id);
      alert("Product added to cart");
    };
    btnBuyNow.onclick = () => {
      placeOrder(user,id);
      alert("Order Placed Successfully");
    };
    
    document.title = product.name;
    document.getElementById("product-name").innerHTML = product.name;
    document.getElementById("product-price").innerHTML = "₹" + product.price;
    document.getElementById("product-disc").innerHTML = product.disc;
    document.getElementById("product-brand").innerHTML = product.brand;
    //document.getElementById("product-review").innerHTML = product.review;
    document.getElementById("product-img").src = product.img;

    /*Discription show more
=========================================*/

    var textElement = document.getElementById("product-disc");
    var textContent = textElement.textContent.trim();
    var words = textContent.split(" ");

    if (words.length > 70) {
      var shortText = words.slice(0, 70).join(" ");
      var longText = words.slice(70).join(" ");

      textElement.innerHTML =
        shortText + '<span class="show-more">... <a href="#">more</a></span>';
      var moreLink = document.querySelector(".show-more a");
      moreLink.addEventListener("click", function (event) {
        event.preventDefault();
        textElement.innerHTML =
          longText + '<span class="show-less">. <a href="#">less</a></span>';
        var lessLink = document.querySelector(".show-less a");
        lessLink.addEventListener("click", lessClickHandler);
        moreLink.removeEventListener("click", moreClickHandler);
      });

      var moreClickHandler = function (event) {
        event.preventDefault();
        textElement.innerHTML =
          longText + '<span class="show-less">. <a href="#">less</a></span>';
        var lessLink = document.querySelector(".show-less a");
        lessLink.addEventListener("click", lessClickHandler);
        moreLink.removeEventListener("click", moreClickHandler);
      };

      var lessClickHandler = function (event) {
        event.preventDefault();
        textElement.innerHTML =
          shortText + '<span class="show-more">... <a href="#">more</a></span>';
        moreLink = document.querySelector(".show-more a");
        moreLink.addEventListener("click", moreClickHandler);
        lessLink.removeEventListener("click", lessClickHandler);
      };

      moreLink.addEventListener("click", moreClickHandler);
    }
  };
});

