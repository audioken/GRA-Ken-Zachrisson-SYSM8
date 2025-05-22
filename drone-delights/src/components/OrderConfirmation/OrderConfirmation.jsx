import "./OrderConfirmation.css";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { DeliveryContext } from "../../context/DeliveryContext";
import { PaymentContext } from "../../context/PaymentContext";

function OrderConfirmation() {
  const { totalPrice, cartItems, setCartItems } = useContext(CartContext);
  const { deliveryInfo } = useContext(DeliveryContext);
  const { paymentInfo } = useContext(PaymentContext);

  const [orderData, setOrderData] = useState(() => {
    const saved = sessionStorage.getItem("lastOrder");
    return saved ? JSON.parse(saved) : null;
  });

  function addOrderToServer() {
    const order = {
      items: cartItems,
      totalPrice: totalPrice,
      deliveryInfo: deliveryInfo,
      paymentInfo: paymentInfo,
    };
    fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Order confirmed:", data);
        setOrderData(data);
        setCartItems([]);
        sessionStorage.setItem("lastOrder", JSON.stringify(data)); // <-- Spara ordern
      })
      .catch((error) => {
        console.error("Error confirming order:", error);
      });
  }

  useEffect(() => {
    if (
      cartItems.length === 0 ||
      sessionStorage.getItem("orderSent") === "true"
    ) {
      return;
    }
    addOrderToServer();
    sessionStorage.setItem("orderSent", "true");
  }, []);

  const items = orderData ? orderData.items : cartItems;
  const price = orderData ? orderData.totalPrice : totalPrice;
  const delivery = orderData ? orderData.deliveryInfo : deliveryInfo;
  const payment = orderData ? orderData.paymentInfo : paymentInfo;
  const orderId = orderData ? orderData.id : null;

  return (
    <div className="order-confirmation-container">
      <div className="order-number-container">
        <div className="order-header">
          {/* <i className="fa-solid fa-house home-btn"></i> */}
          <div className="order-number-row">
            <span className="order-number-text">Order Number:</span>
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
          {items.map((item) => (
            <div className="order-item-card-container" key={item._id}>
              <div className="order-image-container">
                <img src={item.image} alt="" className="order-image" />{" "}
              </div>
              <div className="order-item-details-container" key={item._id}>
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
              {payment.phone}
            </p>
          </section>

          <section className="order-delivery-address-container">
            <h4 className="delivery-address-title">Will be hovered to:</h4>
            <address className="delivery-address-text">
              <p>{delivery.name}</p>
              <p>{delivery.address}</p>
              <p>
                {delivery["postal-code"]}, {delivery.city}
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
