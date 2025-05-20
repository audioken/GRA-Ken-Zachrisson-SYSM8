import { createContext, useState, useEffect } from "react";

export const DeliveryContext = createContext();

export function DeliveryProvider({ children }) {
  const [deliveryInfo, setDeliveryInfo] = useState(() => {
    // Hämta deliveryInfo från localStorage vid första renderingen
    const storedDeliveryInfo = localStorage.getItem("deliveryInfo");
    return storedDeliveryInfo ? JSON.parse(storedDeliveryInfo) : [];
  });

  // Spara deliveryInfo i localStorage när de ändras
  useEffect(() => {
    localStorage.setItem("deliveryInfo", JSON.stringify(deliveryInfo));
  }, [deliveryInfo]);

  return (
    <DeliveryContext.Provider value={{ deliveryInfo, setDeliveryInfo }}>
      {children}
    </DeliveryContext.Provider>
  );
}
