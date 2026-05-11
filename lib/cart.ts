export interface CartItemLocal {
  sku: string;
  size: string;
  quantity: number;
}

export const getLocalCart = (): CartItemLocal[] => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("stepup_cart");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

export const saveLocalCart = (cart: CartItemLocal[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("stepup_cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-update"));
};

export const addToLocalCart = (sku: string, size: string, quantity: number = 1) => {
  const cart = getLocalCart();
  const existingIndex = cart.findIndex((i) => i.sku === sku && i.size === size);
  if (existingIndex >= 0) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ sku, size, quantity });
  }
  saveLocalCart(cart);
};

export const updateLocalCartQuantity = (sku: string, size: string, quantity: number) => {
  let cart = getLocalCart();
  if (quantity <= 0) {
    cart = cart.filter((i) => !(i.sku === sku && i.size === size));
  } else {
    const existing = cart.find((i) => i.sku === sku && i.size === size);
    if (existing) existing.quantity = quantity;
  }
  saveLocalCart(cart);
};

export const removeFromLocalCart = (sku: string, size: string) => {
  let cart = getLocalCart();
  cart = cart.filter((i) => !(i.sku === sku && i.size === size));
  saveLocalCart(cart);
};

export const clearLocalCart = () => {
  saveLocalCart([]);
};
