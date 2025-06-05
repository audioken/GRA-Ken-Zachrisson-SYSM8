import { createContext, useState, useEffect } from 'react';

export const PaymentContext = createContext();

export function PaymentProvider({ children }) { 
  const [paymentInfo, setPaymentInfo] = useState(() => {
    try {
      const stored = localStorage.getItem("paymentInfo");
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      console.error("Failed to parse paymentInfo:", e);
      return {};
    }
  });
  

  useEffect(() => {
    localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
  }, [paymentInfo]);

  return (
    <PaymentContext.Provider value={{ paymentInfo, setPaymentInfo }}>
      {children}
    </PaymentContext.Provider>
  );
}
