document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    document.querySelectorAll('#search-input, #search-input-mobile').forEach(input => {
        input.addEventListener('input', filterProducts);
    });
});

let allProducts = [];
let cart = [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function fetchProducts() {
    fetch('https://679ba7db33d316846324a87d.mockapi.io/v5/fashion')
        .then(response => response.json())
        .then(products => {
            allProducts = products;
            shuffleArray(allProducts);
            displayProducts(allProducts);
        })
        .catch(error => console.error('Error fetching products:', error));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayProducts(products) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; // Clear any existing products

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.onclick = (event) => {
            if (event.target.tagName !== 'BUTTON' && event.target.tagName !== 'I') {
                viewProductDetails(product);
            }
        };

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.name}</h2>
            <p>₹${product.price}</p>
            <button onclick="event.stopPropagation(); addToCart('${product.id}', '${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
            <i class="bi bi-heart add-to-wishlist" data-id="${product.id}" data-image="${product.image}" data-name="${product.name}" data-description="${product.description}" data-price="${product.price}" onclick="event.stopPropagation(); addToWishlist('${product.id}', '${product.name}', ${product.price}, '${product.image}')"></i>
        `;

        productContainer.appendChild(productDiv);
    });
}

function filterProducts() {
    const searchTerm = document.querySelector('#search-input').value.toLowerCase() || document.querySelector('#search-input-mobile').value.toLowerCase();
    const filteredProducts = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
}

function fetchCategory(category) {
    const filteredProducts = allProducts.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
    );
    displayProducts(filteredProducts);
}

function applyFilters() {
    const priceFilter = document.getElementById('price-filter').value;
    const brandFilter = document.getElementById('brand-filter').value;
    const ratingFilter = document.getElementById('rating-filter').value;

    let filteredProducts = allProducts;

    if (priceFilter !== 'all') {
        const [minPrice, maxPrice] = priceFilter.split('-');
        filteredProducts = filteredProducts.filter(product => {
            const price = parseFloat(product.price);
            return price >= parseFloat(minPrice) && (maxPrice === '+' || price <= parseFloat(maxPrice));
        });
    }

    if (brandFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.brand === brandFilter);
    }

    if (ratingFilter !== 'all') {
        const minRating = parseFloat(ratingFilter);
        filteredProducts = filteredProducts.filter(product => product.rating >= minRating);
    }

    displayProducts(filteredProducts);
}

function addToCart(id, name, price, image) {
    const existingProduct = cart.find(product => product.id === id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }
    updateCart();
    Swal.fire({
        title: 'Success!',
        text: `${name} has been added to your cart.`,
        icon: 'success',
        confirmButtonColor: '#343a40',
        confirmButtonText: 'OK'
    });
}

function addToWishlist(id, name, price, image) {
    const existingProduct = wishlist.find(product => product.id === id);
    if (!existingProduct) {
        wishlist.push({ id, name, price, image });
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlist();
        Swal.fire({
            title: 'Added to Wishlist!',
            text: `${name} has been added to your wishlist.`,
            icon: 'success',
            confirmButtonColor: '#343a40',
            confirmButtonText: 'OK'
        });
    } else {
        Swal.fire({
            title: 'Already in Wishlist!',
            text: `${name} is already in your wishlist.`,
            icon: 'info',
            confirmButtonColor: '#343a40',
            confirmButtonText: 'OK'
        });
    }
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    cartItems.innerHTML = '';

    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div>
                <h4>${product.name}</h4>
                <p>₹${product.price} x ${product.quantity}</p>
                <div class="quantity-controls">
                    <button onclick="decreaseQuantity('${product.id}')">-</button>
                    <span>${product.quantity}</span>
                    <button onclick="increaseQuantity('${product.id}')">+</button>
                </div>
            </div>
            <button onclick="removeFromCart('${product.id}')">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = cart.reduce((total, product) => total + product.quantity, 0);
}

function updateWishlist() {
    const wishlistCount = document.getElementById('wishlist-count');
    wishlistCount.textContent = wishlist.length;
}

function removeFromCart(id) {
    const productIndex = cart.findIndex(product => product.id === id);
    if (productIndex !== -1) {
        cart[productIndex].quantity -= 1;
        if (cart[productIndex].quantity === 0) {
            cart.splice(productIndex, 1);
        }
    }
    updateCart();
}

function increaseQuantity(id) {
    const product = cart.find(product => product.id === id);
    if (product) {
        product.quantity += 1;
        updateCart();
    }
}

function decreaseQuantity(id) {
    const product = cart.find(product => product.id === id);
    if (product && product.quantity > 1) {
        product.quantity -= 1;
        updateCart();
    }
}

function toggleCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
}

function toggleWishlist() {
    const wishlistContainer = document.getElementById('wishlist-container');
    wishlistContainer.style.display = wishlistContainer.style.display === 'none' ? 'block' : 'none';
    displayWishlistItems();
}

function displayWishlistItems() {
    const wishlistItems = document.getElementById('wishlist-items');
    wishlistItems.innerHTML = '';

    wishlist.forEach(product => {
        const wishlistItem = document.createElement('div');
        wishlistItem.classList.add('wishlist-item');
        wishlistItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div>
                <h4>${product.name}</h4>
                <p>₹${product.price}</p>
            </div>
            <button onclick="removeFromWishlist('${product.id}')">Remove</button>
        `;
        wishlistItems.appendChild(wishlistItem);
    });
}

function removeFromWishlist(id) {
    const productIndex = wishlist.findIndex(product => product.id === id);
    if (productIndex !== -1) {
        wishlist.splice(productIndex, 1);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
    updateWishlist();
    displayWishlistItems();
}

function checkout() {
    Swal.fire({
        title: 'Checkout',
        text: 'Checkout functionality not implemented yet.',
        icon: 'info',
        confirmButtonColor: '#343a40',
        confirmButtonText: 'OK'
    });
}

function viewProductDetails(product) {
    localStorage.setItem('productDetails', JSON.stringify(product));
    console.log("Stored product details:", product); // Debugging log
    window.location.href = 'details.html';
}

function logout() {
    Swal.fire({
        title: 'Logged Out',
        text: 'Logout successfully',
        icon: 'success',
        confirmButtonColor: '#343a40',
        confirmButtonText: 'OK'
    }).then(() => {
        window.location.href = 'index.html';
    });
}
