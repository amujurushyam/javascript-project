let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(item) {
  console.log('Adding item to cart:', item);
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
  displayCartItems();
}

function updateCartDisplay() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = cart.length;
  console.log('Cart updated. Current items:', cart);
}

function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = '';
  cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.textContent = `${item.name} - $${item.price}`;
    cartItemsContainer.appendChild(itemElement);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartDisplay();
  displayCartItems();
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const item = {
        id: button.dataset.id,
        name: button.dataset.name,
        price: button.dataset.price
      };
      addToCart(item);
    });
  });
});
