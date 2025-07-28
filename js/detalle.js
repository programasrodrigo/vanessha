const params = new URLSearchParams(location.search);
const id = parseInt(params.get("id"));
const container = document.getElementById("productDetail");

if (!id || isNaN(id)) {
  container.innerHTML = `<p>ID de producto inválido.</p><a href="index.html">← Volver al catálogo</a>`;
} else {
  const product = products.find(p => p.id === id);
  if (product) {
    const sizes = Array.isArray(product.sizes) ? product.sizes : [product.sizes];

    container.innerHTML = `
      <h1>${product.title}</h1>
      <img src="${product.image}" alt="${product.title}" style="max-width:300px; border-radius: 10px;">
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Categoría:</strong> ${product.category}</p>

      <label for="sizeSelect"><strong>Talla:</strong></label>
      <select id="sizeSelect" name="size">
        ${sizes.map(s => `<option value="${s}">${s}</option>`).join('')}
      </select>

      <br><br>
      <button class="add-to-cart-btn" onclick="addToCart(${product.id}, document.getElementById('sizeSelect').value)">
        <span class="icon-cart">🛒</span> Agregar al carrito
      </button>
      <br><a href="index.html" class="back-link"><span class="icon-back">⬅️</span> Volver</a>
    `;
  } else {
    container.innerHTML = `<p>Producto no encontrado.</p><a href="index.html">← Volver al catálogo</a>`;
  }
}

function addToCart(id, selectedSize) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productToAdd = products.find(p => p.id === id);
  if (!productToAdd) {
    alert("Producto no encontrado");
    return;
  }

  const existing = cart.find(item => item.id === id && item.size === selectedSize);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...productToAdd, size: selectedSize, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`Producto agregado al carrito (Talla: ${selectedSize})`);
}
