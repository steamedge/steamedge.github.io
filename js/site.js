(function () {
  "use strict";

  const PRODUCTS = Array.isArray(window.STEAMEDGE_PRODUCTS) ? window.STEAMEDGE_PRODUCTS : [];
  const CART_KEY = "steamedge-demo-cart-v1";
  const money = (amount) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]);

  function getCart() {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      if (!Array.isArray(saved)) return [];
      return saved.filter((item) => PRODUCTS.some((product) => product.id === item.id) && Number.isInteger(item.quantity) && item.quantity > 0);
    } catch (error) {
      console.warn("SteamEdge cart could not be read:", error);
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
    renderCart();
  }

  function updateCartCount() {
    const count = getCart().reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll("[data-cart-count]").forEach((element) => { element.textContent = count; });
  }

  function showToast(message) {
    const toast = document.querySelector("[data-toast]");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function productArtwork(product) {
    if (product.image) {
      return `<img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.imageAlt || product.name)}" loading="lazy">`;
    }
    const iconPaths = {
      blade: '<path d="M20 14.5 7.6 27l-3.1-3.1L17 11.4M18.7 9.8l3.5-3.5 4.1 4.1-3.5 3.5M9.2 25.4l-2.8 2.8M4.4 21.2l6.1 6.1"/><path d="m15 15 5 5"/>',
      cable: '<path d="M12 8V4m8 4V4M9 8h14v5a7 7 0 0 1-7 7h-1a7 7 0 0 1-7-7v-2"/><path d="M15 20v5m-4 0h8"/>',
      case: '<rect x="5" y="7" width="22" height="18" rx="4"/><path d="M11 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M5 14h22"/>',
      brush: '<path d="M16 4 28 16l-4 4L12 8zM11 9 4 16l8 8 7-7M4 24l-1 4 4-1"/><path d="m14 12 4 4"/>'
    };
    const path = iconPaths[product.visual] || iconPaths.case;
    return `<div class="accessory-art" aria-hidden="true"><svg viewBox="0 0 32 32" role="presentation">${path}</svg><span>STEAMEDGE<br>ACCESSORY</span></div>`;
  }

  function productCard(product, showDetails = false) {
    const badge = product.label ? `<span class="product-badge">${escapeHTML(product.label)}</span>` : "";
    const artClass = product.image ? "product-image" : "product-image product-image-art";
    return `<article class="product-card" data-product-card data-category="${escapeHTML(product.category)}">
      <a class="product-card-visual ${artClass}" href="product.html" aria-label="Learn about the SteamEdge design">${badge}${productArtwork(product)}<span class="card-arrow" aria-hidden="true">↗</span></a>
      <div class="product-card-info"><div><h3>${escapeHTML(product.name)}</h3><p>${escapeHTML(product.shortDescription)}</p>${showDetails ? `<details class="product-details"><summary>Product details</summary><p>${escapeHTML(product.description || product.shortDescription)}</p></details>` : ""}</div><div class="product-card-bottom"><strong>${money(product.price)}</strong><button class="add-button" type="button" data-add-to-cart="${escapeHTML(product.id)}" aria-label="Add ${escapeHTML(product.name)} to cart">Add to cart <span aria-hidden="true">+</span></button></div></div>
    </article>`;
  }

  function renderProductLists() {
    document.querySelectorAll("[data-product-list]").forEach((container) => {
      const type = container.dataset.productList;
      const selected = type === "featured" ? PRODUCTS.filter((product) => product.featured) : PRODUCTS;
      container.innerHTML = selected.map((product) => productCard(product)).join("");
    });

    const shopContainers = Array.from(document.querySelectorAll("[data-shop-list]"));
    if (shopContainers.length) {
      shopContainers.forEach((container) => {
        const category = container.dataset.shopList;
        container.innerHTML = PRODUCTS.filter((product) => product.category === category).map((product) => productCard(product, true)).join("");
      });
      setupShopFilters();
    }
  }

  function setupShopFilters() {
    const buttons = document.querySelectorAll("[data-filter]");
    const search = document.querySelector("[data-product-search]");
    const empty = document.querySelector("[data-empty-search]");
    let activeFilter = "all";

    function applyFilters() {
      const query = (search?.value || "").trim().toLowerCase();
      let visible = 0;
      document.querySelectorAll("[data-product-card]").forEach((card) => {
        const categoryMatches = activeFilter === "all" || card.dataset.category === activeFilter;
        const textMatches = !query || card.textContent.toLowerCase().includes(query);
        const show = categoryMatches && textMatches;
        card.hidden = !show;
        if (show) visible += 1;
      });
      document.querySelectorAll("[data-shop-list]").forEach((container) => {
        const hasVisible = Array.from(container.querySelectorAll("[data-product-card]")).some((card) => !card.hidden);
        container.hidden = !hasVisible;
        const heading = container.previousElementSibling;
        if (heading?.classList.contains("shop-category-head")) heading.hidden = !hasVisible;
      });
      if (empty) empty.hidden = visible !== 0;
    }

    buttons.forEach((button) => button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      buttons.forEach((item) => item.classList.toggle("active", item === button));
      applyFilters();
    }));
    search?.addEventListener("input", applyFilters);
    applyFilters();
  }

  function addToCart(productId) {
    const product = PRODUCTS.find((item) => item.id === productId);
    if (!product) return;
    const cart = getCart();
    const existing = cart.find((item) => item.id === productId);
    if (existing) existing.quantity += 1;
    else cart.push({ id: productId, quantity: 1 });
    saveCart(cart);
    showToast(`${product.name} added to your cart.`);
  }

  function cartDetails() {
    return getCart().map((item) => {
      const product = PRODUCTS.find((entry) => entry.id === item.id);
      return product ? { ...product, quantity: item.quantity, lineTotal: product.price * item.quantity } : null;
    }).filter(Boolean);
  }

  function renderCart() {
    const itemsContainer = document.querySelector("[data-cart-items]");
    if (!itemsContainer) return;
    const items = cartDetails();
    const empty = document.querySelector("[data-cart-empty]");
    const startButton = document.querySelector("[data-start-checkout]");
    const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);

    itemsContainer.innerHTML = items.map((item) => `<article class="cart-row">
      <div class="cart-thumb">${item.image ? `<img src="${escapeHTML(item.image)}" alt="">` : `<span class="cart-thumb-mark">SE</span>`}</div>
      <div class="cart-row-main"><h3>${escapeHTML(item.name)}</h3><span>${money(item.price)} each</span><div class="quantity-control"><button type="button" data-quantity-change="-1" data-product-id="${escapeHTML(item.id)}" aria-label="Decrease ${escapeHTML(item.name)} quantity">−</button><span>${item.quantity}</span><button type="button" data-quantity-change="1" data-product-id="${escapeHTML(item.id)}" aria-label="Increase ${escapeHTML(item.name)} quantity">+</button></div></div>
      <div class="cart-row-end"><strong>${money(item.lineTotal)}</strong><button class="remove-link" type="button" data-remove-item="${escapeHTML(item.id)}">Remove</button></div>
    </article>`).join("");

    if (empty) empty.hidden = items.length !== 0;
    if (startButton) startButton.disabled = items.length === 0;
    document.querySelectorAll("[data-cart-subtotal], [data-cart-total]").forEach((element) => { element.textContent = money(subtotal); });
    const checkoutLayout = document.querySelector(".checkout-layout");
    if (checkoutLayout) checkoutLayout.classList.toggle("cart-is-empty", items.length === 0);
  }

  function changeQuantity(productId, change) {
    const cart = getCart();
    const item = cart.find((entry) => entry.id === productId);
    if (!item) return;
    item.quantity += change;
    saveCart(cart.filter((entry) => entry.quantity > 0));
  }

  function removeItem(productId) {
    saveCart(getCart().filter((item) => item.id !== productId));
    const product = PRODUCTS.find((entry) => entry.id === productId);
    showToast(`${product ? product.name : "Item"} removed from your cart.`);
  }

  function setupCheckout() {
    const startButton = document.querySelector("[data-start-checkout]");
    const customerWrap = document.querySelector("[data-customer-checkout]");
    const form = document.querySelector("[data-checkout-form]");
    const confirmation = document.querySelector("[data-order-confirmation]");
    const backButton = document.querySelector("[data-back-to-cart]");

    startButton?.addEventListener("click", () => {
      if (getCart().length === 0) return;
      customerWrap.hidden = false;
      customerWrap.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    backButton?.addEventListener("click", () => {
      customerWrap.hidden = true;
      document.querySelector(".checkout-layout")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity() || getCart().length === 0) return;
      const formData = new FormData(form);
      const firstName = String(formData.get("fullName") || "there").trim().split(/\s+/)[0] || "there";
      const items = cartDetails();
      const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
      const confirmationMessage = document.querySelector("[data-confirmation-message]");
      const confirmationItems = document.querySelector("[data-confirmation-items]");
      if (confirmationMessage) confirmationMessage.textContent = `Thanks, ${firstName}. Your SteamEdge demo order has been created for ${money(subtotal)}.`;
      if (confirmationItems) confirmationItems.innerHTML = `${items.map((item) => `<div><span>${escapeHTML(item.name)} × ${item.quantity}</span><strong>${money(item.lineTotal)}</strong></div>`).join("")}<div class="confirmation-total"><span>Demo subtotal</span><strong>${money(subtotal)}</strong></div>`;

      document.querySelector(".checkout-layout")?.setAttribute("hidden", "");
      customerWrap.hidden = true;
      confirmation.hidden = false;
      localStorage.removeItem(CART_KEY);
      updateCartCount();
      confirmation.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function setupNavigation() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-nav");
    toggle?.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  function setupGlobalEvents() {
    document.addEventListener("click", (event) => {
      const addButton = event.target.closest("[data-add-to-cart]");
      if (addButton) {
        addToCart(addButton.dataset.addToCart);
        return;
      }
      const quantityButton = event.target.closest("[data-quantity-change]");
      if (quantityButton) {
        changeQuantity(quantityButton.dataset.productId, Number(quantityButton.dataset.quantityChange));
        return;
      }
      const removeButton = event.target.closest("[data-remove-item]");
      if (removeButton) removeItem(removeButton.dataset.removeItem);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-year]").forEach((element) => { element.textContent = new Date().getFullYear(); });
    renderProductLists();
    updateCartCount();
    renderCart();
    setupCheckout();
    setupNavigation();
    setupGlobalEvents();
  });
})();
