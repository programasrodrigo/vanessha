const container = document.getElementById('productContainer');
const filter = document.getElementById('categoryFilter');

function displayProducts(data) {
  container.innerHTML = '';
  data.forEach(p => {
    const sizesOptions = p.sizes ? p.sizes.map(size => `<option value="${size}">${size}</option>`).join('') : '<option value="">No disponible</option>';

    container.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.title}" class="product-image" />
        <div class="product-details">
          <h3><a href="detalle.html?id=${p.id}">${p.title}</a></h3>
          <p>${p.price}</p>
          <label for="sizeSelect-${p.id}"><strong>Tallas:</strong></label>
          <select id="sizeSelect-${p.id}">
            ${sizesOptions}
          </select>
          <button onclick="addToCart(${p.id}, document.getElementById('sizeSelect-${p.id}').value)">Agregar al carrito</button>
        </div>
      </div>
    `;
  });
}

function addToCart(id, selectedSize) {
  if (!selectedSize) {
    alert("Por favor, selecciona una talla");
    return;
  }
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = products.find(p => p.id === id);
  if (!product) return;
  // Buscar si ya existe el mismo producto con la misma talla
  const existing = cart.find(item => item.id === id && item.size === selectedSize);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, size: selectedSize, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`Producto agregado (Talla: ${selectedSize})`);
}

filter.addEventListener('change', () => {
  const cat = filter.value;
  const filtered = cat === 'todos' ? products : products.filter(p => p.category === cat);
  displayProducts(filtered);
});

displayProducts(products);
