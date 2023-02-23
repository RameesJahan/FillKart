const categories = ["Mens","Womens","Kids"];
const products = [{ img:"./images/shirt_1.jpg", name: "Men Shirt" , brand: "Levis" , price: 599},
                  { img:"./images/shirt_2.jpg", name: "Men T Shirt" , brand: "Nike" , price: 399},
                  { img:"./images/shirt_1.jpg", name: "Men Full Sleeve" , brand: "US Polo" , price: 549},
                  { img:"./images/shirt_3.jpg", name: "Men Shirt" , brand: "Allen Solly" , price: 699},
                 ];

const loadCatData = () => {
  
  categories.forEach((item,index) => {
    let temp = `<h3 class="pro-list-cat-title m-2">${item}</h3>
                <div id="pro_item_list_${index}" class="pro-list-item-list m-2"></div>`;
  
    let elem = document.createElement("div");
    elem.classList.add("pro-list-cat-sec");
    elem.innerHTML = temp;
    document.getElementById("pro_list_cont").appendChild(elem);
    loadProData(index);
  });
  
}

const loadProData = (i) => {
  let proList = "";
  products.forEach((item) => {
    let proTemp = `<div class="pro-card border-line">
                  <img class="pro-card-img" src="${item.img}" alt="Product Image" />
                  <span class="pro-card-name">${item.name}</span>
                  <span class="pro-card-brand">${item.brand}</span>
                  <span class="pro-card-price">₹${item.price}</span>
                </div>`;
    proList += proTemp;
  });
  document.getElementById("pro_item_list_" + i).innerHTML = proList;
}

loadCatData();