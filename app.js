// CampusBiz storefront — no Stripe or email service is connected yet.
// Prices are centralized here so they can be changed later in one place.

const SERVICES = [
  {
    id: "starter",
    name: "Starter Site",
    price: 80,
    description: "A clean, polished online home for a new or growing business.",
    icon: "✦",
    tag: "Get online"
  },
  {
    id: "business",
    name: "Business Site",
    price: 80,
    description: "A more complete website for businesses ready to look established.",
    icon: "♡",
    tag: "Most popular",
    featured: true
  },
  {
    id: "premium",
    name: "Premium Site",
    price: 80,
    description: "A custom-focused setup for entrepreneurs who want more flexibility.",
    icon: "✧",
    tag: "Level up"
  }
];

const ADDONS = [
  { id: "booking", name: "Booking Setup", price: 25, description: "Turn your site into a booking hub." },
  { id: "qr", name: "Custom QR Code", price: 15, description: "A branded QR code customers can scan." },
  { id: "social", name: "Social Media Setup", price: 20, description: "Connect your important social links." },
  { id: "extra-page", name: "Extra Page", price: 20, description: "Add another page to your website." },
  { id: "products", name: "Product Section", price: 25, description: "Showcase products or services." },
  { id: "contact", name: "Contact Form", price: 15, description: "Collect customer messages online." }
];

// The launch discount is intentionally kept in the front-end for now.
// Once Resend + a database/backend are connected, enforce the first-10,
// unique-email/phone rule server-side so it cannot be bypassed.
const PROMO_CODE = "CAMPUSBIZ10";
const PROMO_PERCENT = 10;

let cart = JSON.parse(localStorage.getItem("campusbiz-cart") || "[]");
let promoApplied = false;

const money = value => `$${value.toFixed(2)}`;

function renderServices() {
  document.getElementById("serviceGrid").innerHTML = SERVICES.map(s => `
    <article class="service-card ${s.featured ? "featured" : ""}">
      <div class="service-top"><span class="tag">${s.tag}</span><span class="service-icon">${s.icon}</span></div>
      <h3>${s.name}</h3>
      <p>${s.description}</p>
      <div class="price">${money(s.price)} <small>starting</small></div>
      <button class="add-button" data-add="${s.id}">Add to cart +</button>
    </article>
  `).join("");
}

function renderAddons() {
  document.getElementById("addonGrid").innerHTML = ADDONS.map(a => `
    <article class="addon">
      <div><h3>${a.name}</h3><p>${a.description}</p></div>
      <button aria-label="Add ${a.name}" data-addon="${a.id}">+</button>
    </article>
  `).join("");
}

function getProduct(id) {
  return SERVICES.find(x => x.id === id) || ADDONS.find(x => x.id === id);
}

function saveCart() {
  localStorage.setItem("campusbiz-cart", JSON.stringify(cart));
}

function addToCart(id) {
  const product = getProduct(id);
  if (!product) return;
  cart.push({ ...product, cartId: `${id}-${Date.now()}-${Math.random()}` });
  saveCart();
  renderCart();
  openCart();
}

function removeFromCart(cartId) {
  cart = cart.filter(item => item.cartId !== cartId);
  saveCart();
  renderCart();
}

function renderCart() {
  const items = document.getElementById("cartItems");
  document.getElementById("cartCount").textContent = cart.length;

  if (!cart.length) {
    items.innerHTML = `<div class="empty">Your cart is empty.<br>Add a service to get started ✦</div>`;
  } else {
    items.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>${item.description || ""}</p>
          <button class="remove" data-remove="${item.cartId}">Remove</button>
        </div>
        <strong>${money(item.price)}</strong>
      </div>
    `).join("");
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const discount = promoApplied ? subtotal * (PROMO_PERCENT / 100) : 0;
  document.getElementById("subtotal").textContent = money(subtotal);
  document.getElementById("discount").textContent = `-${money(discount)}`;
  document.getElementById("total").textContent = money(subtotal - discount);
}

function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function openProjectModal() {
  document.getElementById("detailsModal").classList.add("open");
}

function closeProjectModal() {
  document.getElementById("detailsModal").classList.remove("open");
  document.getElementById("projectForm").reset();
  document.getElementById("projectForm").style.display = "block";
  document.getElementById("successMessage").style.display = "none";
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("menuToggle").addEventListener("click", () => {
  const menu = document.getElementById("mobileNav");
  const isOpen = menu.classList.toggle("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".mobile-nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("mobileNav").classList.remove("open");
    document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("click", e => {
  const service = e.target.closest("[data-add]");
  const addon = e.target.closest("[data-addon]");
  const remove = e.target.closest("[data-remove]");

  if (service) addToCart(service.dataset.add);
  if (addon) addToCart(addon.dataset.addon);
  if (remove) removeFromCart(remove.dataset.remove);
});

document.getElementById("openCart").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
document.getElementById("cartOverlay").addEventListener("click", closeCart);

document.getElementById("applyPromo").addEventListener("click", () => {
  const input = document.getElementById("promoCode");
  const message = document.getElementById("promoMessage");
  if (input.value.trim().toUpperCase() === PROMO_CODE) {
    promoApplied = true;
    message.textContent = `${PROMO_PERCENT}% launch discount applied. First 10 customers only.`;
  } else {
    promoApplied = false;
    message.textContent = "That promo code is not valid.";
  }
  renderCart();
});

document.getElementById("continueButton").addEventListener("click", () => {
  if (!cart.length) {
    alert("Add a service to your cart first.");
    return;
  }
  closeCart();
  openProjectModal();
});

document.getElementById("closeModal").addEventListener("click", () => {
  closeProjectModal();
});

document.getElementById("detailsModal").addEventListener("click", e => {
  if (e.target.id === "detailsModal") closeProjectModal();
});

document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  closeCart();
  if (document.getElementById("detailsModal").classList.contains("open")) closeProjectModal();
});

document.getElementById("projectForm").addEventListener("submit", e => {
  e.preventDefault();
  const form = new FormData(e.target);
  const request = {
    ...Object.fromEntries(form.entries()),
    cart,
    promoApplied,
    createdAt: new Date().toISOString()
  };

  // Temporary local save. Later, replace this with a POST to your backend
  // that sends the request through Resend and eventually creates Stripe checkout.
  localStorage.setItem("campusbiz-last-project", JSON.stringify(request));

  e.target.style.display = "none";
  document.getElementById("successMessage").style.display = "block";
});

document.getElementById("year").textContent = new Date().getFullYear();
renderServices();
renderAddons();
renderCart();
