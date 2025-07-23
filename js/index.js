const container = document.getElementById('productContainer');
const filter = document.getElementById('categoryFilter');

function displayProducts(data) {
  container.innerHTML = '';
  data.forEach(p => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.title}" class="product-image" />
        <div class="product-details">
          <h3><a href="detalle.html?id=${p.id}">${p.title}</a></h3>
          <p>${p.price}</p>
          <button onclick="addToCart(${p.id})">Agregar al carrito</button>
        </div>
      </div>
    `;
  });
}

function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = products.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert("Producto agregado");
}

filter.addEventListener('change', () => {
  const cat = filter.value;
  const filtered = cat === 'todos' ? products : products.filter(p => p.category === cat);
  displayProducts(filtered);
});

displayProducts(products);
