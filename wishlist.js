let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function addToWishlist(item) {
  console.log('Adding item to wishlist:', item);
  wishlist.push(item);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateWishlistDisplay();
  window.location.href = 'wishlist.html'; // Navigate to wishlist page
}

function updateWishlistDisplay() {
  const wishlistCount = document.getElementById('wishlist-count');
  wishlistCount.textContent = wishlist.length;
  console.log('Wishlist updated. Current items:', wishlist);
}

function renderWishlistItems() {
  const wishlistContainer = document.getElementById('wishlist-items');
  wishlistContainer.innerHTML = '';
  wishlist.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'col-md-4'; // Ensure items are displayed in a grid
    itemElement.innerHTML = `
      <div class="card wishlist-item">
        <div class="card-body">
          <h3 class="card-title">${item.name}</h3>
          <p class="card-text">Price: ${item.price}</p>
        </div>
      </div>
    `;
    wishlistContainer.appendChild(itemElement);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateWishlistDisplay();
  if (document.getElementById('wishlist-items')) {
    renderWishlistItems(); // Render wishlist items only if on wishlist page
  }
  const addToWishlistButtons = document.querySelectorAll('.add-to-wishlist-btn');
  addToWishlistButtons.forEach(button => {
    button.addEventListener('click', () => {
      const item = {
        id: button.dataset.id,
        name: button.dataset.name,
        price: button.dataset.price
      };
      addToWishlist(item);
    });
  });
});
