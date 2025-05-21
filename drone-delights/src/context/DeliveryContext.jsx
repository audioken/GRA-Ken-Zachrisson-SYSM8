import { createContext, useState, useEffect } from "react";

export const DeliveryContext = createContext();

export function DeliveryProvider({ children }) {
  const [deliveryInfo, setDeliveryInfo] = useState(() => {
    const storedDeliveryInfo = localStorage.getItem("deliveryInfo");
    console.log("Stored delivery info:", storedDeliveryInfo);
    return storedDeliveryInfo ? JSON.parse(storedDeliveryInfo) : [];
  });

  useEffect(() => {
    localStorage.setItem("deliveryInfo", JSON.stringify(deliveryInfo));
  }, [deliveryInfo]);

  return (
    <DeliveryContext.Provider value={{ deliveryInfo, setDeliveryInfo }}>
      {children}
    </DeliveryContext.Provider>
  );
}
