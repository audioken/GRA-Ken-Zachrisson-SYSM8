import { createContext, useState, useEffect } from 'react';

export const PaymentContext = createContext();

export function PaymentProvider({ children }) { 
  const [paymentInfo, setPaymentInfo] = useState(() => {
    const storedPaymentInfo = localStorage.getItem('paymentInfo');
    console.log('Stored payment info:', storedPaymentInfo);
    return storedPaymentInfo ? JSON.parse(storedPaymentInfo) : {};
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
