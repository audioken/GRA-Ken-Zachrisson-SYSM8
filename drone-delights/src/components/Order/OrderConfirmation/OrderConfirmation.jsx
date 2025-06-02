// import "./OrderConfirmation.css";
// import { use, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { CartContext } from "../../../context/CartContext";
// import { DeliveryContext } from "../../../context/DeliveryContext";
// import { PaymentContext } from "../../../context/PaymentContext";

// function OrderConfirmation() {
//   const { totalPrice, cartItems, setCartItems } = useContext(CartContext);
//   const { deliveryInfo } = useContext(DeliveryContext);
//   const { paymentInfo } = useContext(PaymentContext);
//   const navigate = useNavigate();

//   const [orderData, setOrderData] = useState(() => {
//     const saved = sessionStorage.getItem("lastOrder");
//     return saved ? JSON.parse(saved) : null;
//   });

//   function addOrderToServer() {
//     const order = {
//       items: cartItems,
//       totalPrice: Number(totalPrice),
//       deliveryInfo: deliveryInfo,
//       paymentInfo: paymentInfo,
//     };
//     fetch(`${process.env.REACT_APP_API_URL}/orders`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(order),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Order confirmed:", data);
//         setOrderData(data);
//         setCartItems([]);
//         sessionStorage.setItem("lastOrder", JSON.stringify(data)); // <-- Spara ordern
//       })
//       .catch((error) => {
//         console.error("Error confirming order:", error);
//       });
//     console.log("Order skickas:", order);
//     console.log("paymentInfo i OrderConfirmation:", paymentInfo);
//   }

//   useEffect(() => {
//     if (!orderData) {
//       navigate("/menu");
//     }
//   }, [orderData]);

//   useEffect(() => {
//     const orderSent = sessionStorage.getItem("orderSent");
//     const lastOrder = sessionStorage.getItem("lastOrder");

//     // Om ordern är markerad som skickad, men ingen sparad data finns – redirecta
//     if (orderSent === "true" && !lastOrder) {
//       navigate("/menu");
//       return;
//     }

//     // Om ordern inte är skickad än – skicka den nu
//     if (cartItems.length > 0 && orderSent !== "true") {
//       addOrderToServer();
//       sessionStorage.setItem("orderSent", "true");
//     }

//     // Rensa sessionen när man lämnar sidan
//     return () => {
//       sessionStorage.removeItem("orderSent");
//       sessionStorage.removeItem("lastOrder");
//     };
//   }, []);

//   const items = orderData ? orderData.items : cartItems;
//   const price = orderData ? orderData.totalPrice : totalPrice;
//   const delivery = orderData ? orderData.deliveryInfo : deliveryInfo;
//   const payment = orderData ? orderData.paymentInfo : paymentInfo;
//   const orderId = orderData ? orderData._id.slice(0, 4) : "N/A";

//   return (
//     <div className="order-confirmation-container">
//       <div className="order-number-container">
//         <div className="order-header">
//           <div className="order-number-row">
//             <span className="order-number-text">Order #</span>
//             <span className="order-number-id">{orderId}</span>
//           </div>
//         </div>
//       </div>
//       <div className="confirmed-container">
//         <i className="fa-solid fa-circle-check confirmed"></i>
//       </div>
//       <h2 className="order-confirmation-title">
//         <span className="your-order-is">Your order is</span>{" "}
//         <span className="on-the-way">on the way!</span>
//       </h2>
//       <div className="order-summary-container">
//         <div className="order-items-all-cards-container">
//           {items.map((item, index) => (
//             <div
//               className="order-item-card-container"
//               key={item._id || `${item.name}-${index}`}
//             >
//               <div className="order-image-container">
//                 <img src={item.image} alt="" className="order-image" />{" "}
//               </div>
//               <div className="order-item-details-container">
//                 <div className="order-item-title">{item.name}</div>
//                 <div className="ordet-item-price-and-quantity-container">
//                   <span className="order-item-price">${item.price}</span>
//                   <div className="order-item-quantity-container">
//                     <span className="order-item-quantity-text">Qty:</span>
//                     <span className="order-item-quantity">{item.quantity}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="order-total-cost-container">
//           <div className="total-cost-row">
//             <span className="total-cost-text">Total Cost:</span>
//             <span className="total-cost-price">${price}</span>
//           </div>
//         </div>

//         <div className="order-delivery-and-payment-container">
//           {/* <section className="order-payment-method-container">
//             <h4 className="payment-method-title">Payment Method:</h4>
//             <p className="payment-method-text">
//               {payment.method}
//               <br />
//               {payment.phone}
//             </p>
//             <p className="payment-method-text">
//               {payment.method}
//               <br />
//               {payment.method === "Swish" && payment.phone}
//               {payment.method === "Mastercard" && (
//                 <>**** **** **** {payment.number.slice(-4)}</>
//               )}
//             </p>
//           </section> */}
//           <section className="order-payment-method-container">
//             <h4 className="payment-method-title">Payment Method:</h4>
//             <p className="payment-method-text">
//               {payment.method}
//               <br />
//               {payment.method === "Swish" && payment.phone && (
//                 <>{payment.phone}</>
//               )}
//               {payment.method === "Mastercard" && payment.number && (
//                 <>**** **** **** {payment.number.slice(-4)}</>
//               )}
//             </p>
//           </section>

//           <section className="order-delivery-address-container">
//             <h4 className="delivery-address-title">Will be hovered to:</h4>
//             <address className="delivery-address-text">
//               <p>{delivery.name}</p>
//               <p>{delivery.address}</p>
//               <p>
//                 {delivery.postalCode}, {delivery.city}
//               </p>
//             </address>
//           </section>
//         </div>
//       </div>

//       <h3 className="thank-you-text">Thank you for your order!</h3>
//     </div>
//   );
// }

// export default OrderConfirmation;

import "./OrderConfirmation.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";
import { DeliveryContext } from "../../../context/DeliveryContext";
import { PaymentContext } from "../../../context/PaymentContext";

function OrderConfirmation() {
  const { totalPrice, cartItems, setCartItems } = useContext(CartContext);
  const { deliveryInfo } = useContext(DeliveryContext);
  const { paymentInfo } = useContext(PaymentContext);
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState(() => {
    const saved = sessionStorage.getItem("lastOrder");
    return saved ? JSON.parse(saved) : null;
  });

  function addOrderToServer() {
    const order = {
      items: cartItems,
      totalPrice: Number(totalPrice),
      deliveryInfo: deliveryInfo,
      paymentInfo: paymentInfo,
    };

    fetch(`${process.env.REACT_APP_API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((data) => {
        setOrderData(data);
        setCartItems([]); // Rensa kundvagn
        sessionStorage.setItem("lastOrder", JSON.stringify(data));
        sessionStorage.setItem("orderSent", "true");
      })
      .catch((error) => {
        console.error("Error confirming order:", error);
      });
  }

  useEffect(() => {
    // Rensa gammal sessionstorage så att vi inte har kvar från tidigare sessioner
    sessionStorage.removeItem("orderSent");
    sessionStorage.removeItem("lastOrder");
  }, []);

  useEffect(() => {
    // Om vi redan har orderData (från sessionStorage) navigera inte bort
    if (orderData) return;

    // Om kundvagnen är tom, skicka till meny direkt
    if (cartItems.length === 0) {
      navigate("/menu");
      return;
    }

    // Skicka order om den inte är skickad tidigare
    const orderSent = sessionStorage.getItem("orderSent");
    if (orderSent !== "true") {
      addOrderToServer();
    }
  }, [orderData, cartItems, navigate]);

  useEffect(() => {
    if (!orderData) return;

    // Om orderData plockas bort (exempelvis ny order gjord), navigera bort
    if (!orderData) {
      navigate("/menu");
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return <p>Loading order...</p>;
  }

  const items = orderData.items;
  const price = orderData.totalPrice;
  const delivery = orderData.deliveryInfo;
  const payment = orderData.paymentInfo;
  const orderId = orderData._id ? orderData._id.slice(-4) : "N/A";

  return (
    <div className="order-confirmation-container">
      <div className="order-number-container">
        <div className="order-header">
          <div className="order-number-row">
            <span className="order-number-text">Order #</span>
            <span className="order-number-id">{orderId}</span>
          </div>
        </div>
      </div>
      <div className="confirmed-container">
        <i className="fa-solid fa-circle-check confirmed"></i>
      </div>
      <h2 className="order-confirmation-title">
        <span className="your-order-is">Your order is</span>{" "}
        <span className="on-the-way">on the way!</span>
      </h2>
      <div className="order-summary-container">
        <div className="order-items-all-cards-container">
          {items.map((item, index) => (
            <div
              className="order-item-card-container"
              key={item._id || `${item.name}-${index}`}
            >
              <div className="order-image-container">
                <img src={item.image} alt={item.name} className="order-image" />
              </div>
              <div className="order-item-details-container">
                <div className="order-item-title">{item.name}</div>
                <div className="ordet-item-price-and-quantity-container">
                  <span className="order-item-price">${item.price}</span>
                  <div className="order-item-quantity-container">
                    <span className="order-item-quantity-text">Qty:</span>
                    <span className="order-item-quantity">{item.quantity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="order-total-cost-container">
          <div className="total-cost-row">
            <span className="total-cost-text">Total Cost:</span>
            <span className="total-cost-price">${price}</span>
          </div>
        </div>

        <div className="order-delivery-and-payment-container">
          <section className="order-payment-method-container">
            <h4 className="payment-method-title">Payment Method:</h4>
            <p className="payment-method-text">
              {payment.method}
              <br />
              {payment.method === "Swish" && payment.phone && (
                <>{payment.phone}</>
              )}
              {payment.method === "Mastercard" && payment.number && (
                <>**** **** **** {payment.number.slice(-4)}</>
              )}
            </p>
          </section>

          <section className="order-delivery-address-container">
            <h4 className="delivery-address-title">Will be delivered to:</h4>
            <address className="delivery-address-text">
              <p>{delivery.name}</p>
              <p>{delivery.address}</p>
              <p>
                {delivery.postalCode}, {delivery.city}
              </p>
            </address>
          </section>
        </div>
      </div>

      <h3 className="thank-you-text">Thank you for your order!</h3>
    </div>
  );
}

export default OrderConfirmation;
