// Cart utility for localStorage-based cart
export function getCart() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch {
    return [];
  }
}

export function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(p => p.id === item.id);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
} 