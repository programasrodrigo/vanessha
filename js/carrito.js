const cartContainer = document.getElementById("cartItems");
const totalPriceElement = document.getElementById("totalPrice");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartContainer.innerHTML = '';
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
    totalPriceElement.innerText = '';
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="cart-image">
      <div class="cart-info">
        <h3>${item.title}</h3>
        <p>${item.price}</p>
        <div class="quantity-controls">
          <button class="qty-btn" data-action="decrease" data-index="${index}">−</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" data-action="increase" data-index="${index}">+</button>
        </div>
      </div>
      <button class="remove-btn" data-index="${index}">Eliminar</button>
    `;
    cartContainer.appendChild(div);

    const numericPrice = parseInt(item.price.replace(/\D/g, ""));
    total += numericPrice * item.quantity;
  });

  totalPriceElement.innerText = `Total: $ ${total.toLocaleString()}`;

  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });

  document.querySelectorAll(".qty-btn").forEach(btn => {
    const action = btn.getAttribute("data-action");
    const index = btn.getAttribute("data-index");

    btn.addEventListener("click", () => {
      if (action === "increase") {
        cart[index].quantity += 1;
      } else if (action === "decrease" && cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });
}

renderCart();