import { createContext, useState } from "react";

export const DeliveryContext = createContext();

export function DeliveryProvider({ children }) {
  const [deliveryInfo, setDeliveryInfo] = useState({});
  return (
    <DeliveryContext.Provider value={{ deliveryInfo, setDeliveryInfo }}>
      {children}
    </DeliveryContext.Provider>
  );
}
