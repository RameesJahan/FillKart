const categories = [ "Laptops" ,"Phones","Accessories","Mens", "Womens", "Kids" ,];
var products;

/*Function to load products
=========================================*/
// Call the getJsonData function and log the JSON data to the console
getJsonData("./data/products.json")
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
    let proTemp = `<a href="./pages/product.html?id=${item.id}">
                      <div class="pro-card border-line">
                        <img class="pro-card-img" 
                             src="${ item.img}" 
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

/*Function to go To Profile page
=========================================*/
const goToUser = () => {
  window.location.href = "./pages/profile.html";
}