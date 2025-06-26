const params = new URLSearchParams(location.search);
const id = parseInt(params.get("id"));
const container = document.getElementById("productDetail");

if (!id || isNaN(id)) {
  container.innerHTML = `<p>ID de producto inválido.</p><a href="index.html">← Volver al catálogo</a>`;
} else {
  const product = products.find(p => p.id === id);
  if (product) {
    container.innerHTML = `
      <h1>${product.title}</h1>
      <img src="${product.image}" alt="${product.title}" style="max-width:300px; border-radius: 10px;">
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Categoría:</strong> ${product.category}</p>
      <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
        <span class="icon-cart">🛒</span> Agregar al carrito
      </button>
      <br><a href="index.html" class="back-link"><span class="icon-back">⬅️</span> Volver</a>
    `;
  } else {
    container.innerHTML = `<p>Producto no encontrado.</p><a href="index.html">← Volver al catálogo</a>`;
  }
}

function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productToAdd = products.find(p => p.id === id);
  if (!productToAdd) {
    alert("Producto no encontrado");
    return;
  }
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...productToAdd, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert("Producto agregado al carrito");
}