import "./Payment.css";
import swish from "../../assets/images/swish.svg";
import mastercard from "../../assets/images/mastercard.svg";
import { DeliveryContext } from "../../context/DeliveryContext";
import { PaymentContext } from "../../context/PaymentContext";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Payment({ className = "" }) {
  const { deliveryInfo } = useContext(DeliveryContext);
  const { paymentInfo, setPaymentInfo } = useContext(PaymentContext);
  const { user } = useAuth();
  const [selected, setSelected] = useState("mastercard");

  // Initiera form state: om paymentInfo finns, använd det, annars deliveryInfo
  const [formData, setFormData] = useState({
    name: paymentInfo?.name || deliveryInfo?.name || user?.name || "",
    phone: paymentInfo?.phone || deliveryInfo?.phone || user?.phone || "",
    card: paymentInfo?.card || "",
    expiry: paymentInfo?.expiry || "",
    cvc: paymentInfo?.cvc || "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: deliveryInfo?.name || user?.name || "",
      phone: deliveryInfo?.phone || user?.phone || "",
    }));
  }, [deliveryInfo, user, paymentInfo]);

  const navigate = useNavigate();

  // Hantera ändringar i formulärfälten
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Endast siffror
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    setFormData({ ...formData, expiry: value });
  };

  // Spara paymentInfo och gå vidare
  const handleSubmit = (method) => (event) => {
    event.preventDefault();
    const data = { ...formData, method };
    setPaymentInfo(data);
    navigate("/order-confirmation");
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
            type="button"
          >
            <img src={swish} alt="Swish" className="swish-icon" />
          </button>
          <button
            className={`mastercard-btn payment-btn ${
              selected === "mastercard" ? "selected-btn" : ""
            }`}
            onClick={() => setSelected("mastercard")}
            type="button"
          >
            <img
              src={mastercard}
              alt="Mastercard"
              className="mastercard-icon"
            />
          </button>
        </div>
      </div>

      {/* Mastercard-formulär */}
      <form
        className={`payment-info-form-mastercard ${
          selected === "swish" ? "none" : ""
        }`}
        onSubmit={handleSubmit("Mastercard")}
      >
        <div className="name-and-phone-container">
          <div className="form-group">
            <label htmlFor="nameOnCard">Name On Card</label>
            <input
              type="text"
              id="nameOnCard"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
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
            value={formData.card}
            onChange={handleChange}
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
              value={formData.expiry}
              onChange={handleExpiryChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvc">CVC</label>
            <input
              type="text"
              id="cvc"
              name="cvc"
              placeholder="xxx"
              required
              value={formData.cvc}
              onChange={handleChange}
            />
          </div>
          <button className="place-order-btn" type="submit">
            Place Order
          </button>
        </div>
      </form>

      {/* Swish-formulär */}
      <form
        className={`payment-info-form-swish ${
          selected === "mastercard" ? "none" : ""
        }`}
        onSubmit={handleSubmit("Swish")}
      >
        <div className="swish-phone-container">
          <div className="form-group">
            <label htmlFor="phoneSwish">Phone Number</label>
            <input
              type="text"
              id="phoneSwish"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
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
