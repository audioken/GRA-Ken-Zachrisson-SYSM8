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
      <div className="confirmed-container">
        <i class="fa-solid fa-circle-check confirmed"></i>
      </div>
      <h2 className="order-confirmation-title">
        <span className="your-order-is">Your order is</span> <span className="on-the-way">on the way!</span>
      </h2>
      <div className="order-summary-container">
        <div className="order-items-all-cards-container">
          {cartItems.map((item) => (
            <div className="order-item-card-container" key={item.id}>
              <div className="order-image-container">
                <img src={item.image} alt="" className="order-image" />{" "}
              </div>
              <div className="order-item-details-container" key={item.id}>
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
            <span className="total-cost-price">${totalPrice}</span>
          </div>
        </div>

        {/* <div className="order-delivery-and-payment-container">
          <div className="order-payment-method-container">
            <h4>Payment Method:</h4>
            <p>{paymentInfo.method}</p>
          </div>
          <div className="order-delivery-details-container">
            <h4>Will be hovered to:</h4>
            <p>{deliveryInfo.name}</p>
            <p>{deliveryInfo.address}</p>
            <p>
              {deliveryInfo["postal-code"]}, {deliveryInfo.city}
            </p>
          </div>
        </div> */}
        <div className="order-delivery-and-payment-container">
          <section className="order-payment-method-container">
            <h4 className="payment-method-title">Payment Method:</h4>
            <p className="payment-method-text">{paymentInfo.method}</p>
          </section>

          <section className="order-delivery-address-container">
            <h4 className="delivery-address-title">Will be hovered to:</h4>
            <address className="delivery-address-text">
              <p>{deliveryInfo.name}</p>
              <p>{deliveryInfo.address}</p>
              <p>
                {deliveryInfo["postal-code"]}, {deliveryInfo.city}
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
