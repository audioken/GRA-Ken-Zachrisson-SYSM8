import "./OrderConfirmation.css";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { DeliveryContext } from "../../context/DeliveryContext";
import { PaymentContext } from "../../context/PaymentContext";

function OrderConfirmation() {
  const { totalPrice, cartItems } = useContext(CartContext);
  const { deliveryInfo } = useContext(DeliveryContext);
  const { paymentInfo } = useContext(PaymentContext);

  return (
    <div className="order-confirmation-container">
      <h2>Order is on the way!</h2>
      <h3>Order Summary</h3>
      <div className="order-summary">
        <h4>Items:</h4>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
        <h4>Delivery Details:</h4>
        <p>{deliveryInfo.name}</p>
        <p>{deliveryInfo.phone}</p>
        <p>{deliveryInfo.address}</p>
        <p>
          {deliveryInfo.city}, {deliveryInfo["postal-code"]}
        </p>
        <h4>Payment Method:</h4>
        <p>{paymentInfo.method}</p>
        <p>Total Amount: ${totalPrice}</p>
      </div>
      <h3>Thank you for your order!</h3>
    </div>
  );
}

export default OrderConfirmation;
