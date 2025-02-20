// let openShopping = document.querySelector(".shopping");
// let closeShopping = document.querySelector(".closeShopping");
// let list = document.querySelector(".list");
// let listCard = document.querySelector(".listCard");
// let body = document.querySelector("body");
// let total = document.querySelector(".total");
// let quantity = document.querySelector(".quantity");

// openShopping.addEventListener("click", () => {
//   body.classList.add("active");
//   reloadCard(); // Refresh the cart display when the shop image is clicked
// });
// closeShopping.addEventListener("click", () => {
//   body.classList.remove("active");
// });

// total.addEventListener("click", () => {
//   localStorage.setItem("totalAmount", total.innerText);
//   window.location.href = "check.html";
// });

// let listCards = [];
// let products = [];

// async function fetchProducts() {
//   try {
//     let response = await fetch('https://679ba7db33d316846324a87d.mockapi.io/v5/fashion/');
//     products = await response.json();
//     console.log('Fetched products:', products); // Debugging log
//     initApp(products);
//   } catch (error) {
//     console.error("Failed to fetch products:", error);
//   }
// }

// function initApp(products) {
//   list.innerHTML = ''; // Clear the list before adding new items
//   products.forEach((value, key) => {
//     let newDiv = document.createElement("div");
//     newDiv.classList.add("item");
//     newDiv.innerHTML = `
//       <img src="${value.image}" alt="${value.name}"/>
//       <div class="title">${value.name}</div>
//       <div class="price">₹${value.price.toLocaleString()}</div>
//       <button onclick="addToCart(${key})">Add To Cart</button>
//     `;
//     list.appendChild(newDiv);
//   });
// }

// function addToCart(key) {
//   console.log('Adding to cart:', products[key]); // Debugging log
//   if (listCards[key] == null) {
//     listCards[key] = JSON.parse(JSON.stringify(products[key]));
//     listCards[key].quantity = 1;
//     alert(`"${products[key].name}" has been added to the cart`);
//   } else {
//     listCards[key].quantity += 1;
//   }
//   reloadCard();
// }

// function reloadCard() {
//   listCard.innerHTML = "";
//   let count = 0;
//   let totalPrice = 0;
//   listCards.forEach((value, key) => {
//     if (value != null) {
//       totalPrice += value.price * value.quantity;
//       count += value.quantity;
//       let newDiv = document.createElement("li");
//       newDiv.innerHTML = `
//         <div><img src="${value.image}" alt="${value.name}"/></div>
//         <div>${value.name}</div>
//         <div>₹${value.price.toLocaleString()}</div>
//         <div>
//           <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
//           <div class="count">${value.quantity}</div>
//           <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
//         </div>`;
//       listCard.appendChild(newDiv);
//     }
//   });
//   total.innerText = `₹${totalPrice.toLocaleString()}`;
//   quantity.innerText = count;
// }

// function changeQuantity(key, quantity) {
//   if (quantity == 0) {
//     delete listCards[key];
//   } else {
//     listCards[key].quantity = quantity;
//   }
//   reloadCard();
// }

// // Fetch products from the API and initialize the app
// fetchProducts();
