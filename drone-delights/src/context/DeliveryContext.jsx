import { createContext, useState, useEffect } from "react";

export const DeliveryContext = createContext();

export function DeliveryProvider({ children }) {
  const [deliveryInfo, setDeliveryInfo] = useState(() => {
    try {
      const stored = localStorage.getItem("deliveryInfo");
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      console.error("Failed to parse deliveryInfo:", e);
      return {};
    }
  });

  // Återställ leveransinformationen
  const resetDeliveryInfo = () => setDeliveryInfo({});

  // Spara leveransinformation i localStorage när den ändras
  useEffect(() => {
    localStorage.setItem("deliveryInfo", JSON.stringify(deliveryInfo));
  }, [deliveryInfo]);

  return (
    <DeliveryContext.Provider
      value={{ deliveryInfo, setDeliveryInfo, resetDeliveryInfo }}
    >
      {children}
    </DeliveryContext.Provider>
  );
}
