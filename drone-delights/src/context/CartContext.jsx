import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Hämta cartItems från localStorage vid första renderingen
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Spara cartItems i localStorage när de ändras
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Beräkna total kvantitet av varor i cart
  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Beräkna totalpris av varor i cart och avrunda till två decimaler
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);
    

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
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        cartQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
