let productsInfo = products;
const myContainer = document.querySelector(".products-container");
const companies = document.querySelector(".companies");
const searchInput = document.querySelector(".search");

//add product to homepage
function AddProducts(productsInfo) {
    const myProducts = productsInfo
        .map((product) => {
            const { title, url, price } = product;
            return `
<article class="product">
<img src="${url}" class="product-img" alt="" />
<div class="product-info">
    <h3 class="product-name">${title}</h3>
    <span class="product-price">${price}</span>
</div>
</article>`;
        })
        .join("");

    myContainer.innerHTML = myProducts;
}

AddProducts(productsInfo);

/* add companies to nav*/

const myCompanies = productsInfo.map((product) => {
    return product.company;
});
//  Remove Duplicates

const uniqueList = Array.from(new Set(myCompanies));
uniqueList.unshift("all");

const companiesList = uniqueList
    .map((comp) => {
        return `
    <li data-id=${comp}>${comp}</li>
    `;
    })
    .join("");

companies.innerHTML = companiesList;

// filter according to buttom clicked
companies.addEventListener("click", (e) => {
    e.target.dataset.id === "all"
        ? AddProducts(productsInfo)
        : (productsInfo = productsInfo.filter(
              (prod) => prod.company === e.target.dataset.id
          ));
    searchInput.value = "";
    AddProducts(productsInfo);
    productsInfo = products;
});

// filter according to search input value

searchInput.addEventListener("keyup", (e) => {
    console.log(searchInput.value);
    productsInfo = productsInfo.filter((prod) => {
        return prod.title
            .toLowerCase()
            .includes(searchInput.value.toLowerCase());
    });
    AddProducts(productsInfo);
    if (productsInfo.length === 0) {
        myContainer.innerHTML = "Sorry, no products matched your search";
    }
    productsInfo = products;
});
