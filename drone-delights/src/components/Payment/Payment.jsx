import "./Payment.css";
import swish from "../../assets/images/swish.svg";
import mastercard from "../../assets/images/mastercard.svg";
import { DeliveryContext } from "../../context/DeliveryContext";
import { useContext, useState } from "react";

function Payment({ className = "" }) {
  const { deliveryInfo, setDeliveryInfo } = useContext(DeliveryContext);
  const [selected, setSelected] = useState("mastercard");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    setDeliveryInfo(data);
    console.log("Delivery Information:", data);
  };

  return (
    <div className={`payment-info-container ${className}`}>
      <div className="payment-info-header">
        <h2 className="payment-info-title">Payment</h2>
        <div className="payment-options-container">
          <button
            className={`swish-btn payment-btn ${
              selected === "swish" ? "selected-btn" : ""
            }`}
            onClick={() => setSelected("swish")}
          >
            <img src={swish} alt="Swish" className="swish-icon" />
          </button>
          <button
            className={`mastercard-btn payment-btn ${
              selected === "mastercard" ? "selected-btn" : ""
            }`}
            onClick={() => setSelected("mastercard")}
          >
            <img
              src={mastercard}
              alt="Mastercard"
              className="mastercard-icon"
            />
          </button>
        </div>
      </div>
      <form
        className={`payment-info-form-mastercard ${
          selected === "swish" ? "none" : ""
        }`}
        onSubmit={handleSubmit}
      >
        <div className="name-and-phone-container">
          <div className="form-group">
            <label htmlFor="name">Name On Card</label>
            <input
              type="text"
              id="nameOnCard"
              name="name"
              required
              defaultValue={deliveryInfo.name || ""}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="card">Card Number</label>
          <input
            type="text"
            id="card"
            name="card"
            placeholder="xxxx-xxxx-xxxx-xxxx"
            required
          />
        </div>
        <div className="postal-code-and-city-container">
          <div className="form-group">
            <label htmlFor="expiry">Expiry</label>
            <input
              type="text"
              id="expiry"
              name="expiry"
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvc">CVC</label>
            <input type="text" id="cvc" name="cvc" placeholder="xxx" required />
          </div>
          <button className="place-order-btn" type="submit">
            Place Order
          </button>
        </div>
      </form>
      <form
        className={`payment-info-form-swish ${
          selected === "mastercard" ? "none" : ""
        }`}
        onSubmit={handleSubmit}
      >
        <div className="swish-phone-container">
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              id="phoneSwish"
              name="phone"
              required
              defaultValue={deliveryInfo.phone || ""}
            />
          </div>
          <button className="place-order-btn" type="submit">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}

export default Payment;
