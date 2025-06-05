import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  // Hämta varukorg från localStorage vid initialisering
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cartItems");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
      console.error("Failed to parse cartItems:", e);
      return [];
    }
  });

  // Uppdatera localStorage när varukorgen ändras
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Lägg till vara i varukorgen, eller öka mängden om den redan finns
  function addToCart(item, quantity = 1) {
    setCartItems((prev) => {
      const exists = prev.find((i) => i._id === item._id);
      if (exists) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
  }

  // Uppdatera mängd för en vara
  function updateQuantity(itemId, quantity) {
    setCartItems((prev) =>
      prev.map((i) => (i._id === itemId ? { ...i, quantity } : i))
    );
  }

  // Ta bort en vara från varukorgen
  function removeFromCart(itemId) {
    setCartItems((prev) => prev.filter((i) => i._id !== itemId));
  }

  // Töm hela varukorgen
  function emptyCart() {
    setCartItems([]);
  }

  // Antal produkter i varukorgen
  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Totalt pris för hela varukorgen
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        emptyCart,
        cartQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
