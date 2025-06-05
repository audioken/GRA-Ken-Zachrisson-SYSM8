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
  
  const resetDeliveryInfo = () => setDeliveryInfo({});

  useEffect(() => {
    localStorage.setItem("deliveryInfo", JSON.stringify(deliveryInfo));
  }, [deliveryInfo]);

  return (
    <DeliveryContext.Provider value={{ deliveryInfo, setDeliveryInfo, resetDeliveryInfo }}>
      {children}
    </DeliveryContext.Provider>
  );
}
