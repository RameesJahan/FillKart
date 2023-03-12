import { getJsonData, debounce } from "./utils.js";

const categories = [
  "Laptops",
  "Phones",
  "Accessories",
  "Mens",
  "Womens",
  "Kids",
];
var products;
const catList = document.getElementById("cat-list");
const iptSearch = document.getElementById("ipt-search");
iptSearch.focus();

iptSearch.addEventListener("input", (e) => {
  let data = search(e.target.value);
  loadData(data);
});

window.addEventListener("load", () => {
  getJsonData("/data/products.json")
    .then((data) => {
      console.log(data);
      products = data;
      loadCat();
      loadData(data);
    })
    .catch((error) => {
      console.error(error);
    });
});

const loadCat = () => {
  categories.forEach((item) => {
    let elem = document.createElement("span");
    elem.classList.add("cat-list-item", "border-line", "rounded");
    elem.id = "cat-list-item-" + item;
    elem.name = "cat-list-item";
    elem.innerText = item;
    elem.addEventListener("click", toggleRadio(elem));
    catList.appendChild(elem);
  });
};

const loadData = (data) => {
  const noResultElem = document.getElementById("no-reslt");
  noResultElem.style.display = data && data.length > 0 ? "none" : "flex";
  let proList = "";
  data.forEach((item) => {
    console.log(item);
    let temp = `<a href="/pages/product.html?id=${item.id}">
                  <div class="search-item bottom-line" data-aos="slide-up">
                    <div class="srch-item-img-container">
                      <img class="srch-item-img" src="${item.img}" alt="${item.name}" />
                    </div>
                    <div class="srch-item-details">
                      <span class="srch-item-name">${item.name}</span>
                      <span class="srch-item-cat">${item.category}</span>
                      <span class="srch-item-disc">${item.disc}</span>
                    </div>
                  </div>
                </a>`;
    proList += temp
  });
  document.getElementById("search-item-cont").innerHTML = proList;
};

const goToProduct = (id) => {
  window.location.href = "/pages/product.html?id=" + id;
};

const search = (keyword) => {
  const lowercaseKeyword = keyword.toLowerCase();

  const filteredArray = products.filter((obj) => {
    return Object.values(obj).some((value) => {
      return String(value).toLowerCase().includes(lowercaseKeyword);
    });
  });

  return filteredArray;
};

function toggleRadio(element) {
  return function() {
    const items = document.querySelectorAll(".cat-list-item");
    items.forEach((item) => {
      item.classList.remove("checked");
    });
    element.classList.add("checked");
    
    loadData(search(element.innerText));
  };
}
