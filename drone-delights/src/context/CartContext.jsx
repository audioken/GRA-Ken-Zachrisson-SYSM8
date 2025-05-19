import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Lägg till eller uppdatera vara i cart
  function addToCart(item, quantity = 1) {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
  }

  // Uppdatera kvantitet för en vara
  function updateQuantity(itemId, quantity) {
    setCartItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
    );
  }

  // Ta bort vara
  function removeFromCart(itemId) {
    setCartItems((prev) => prev.filter((i) => i.id !== itemId));
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
