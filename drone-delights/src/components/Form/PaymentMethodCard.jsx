import "./PaymentMethodCard.css";
import "../Buttons.css";
import masterCardLogo from "../../assets/images/mastercard.svg";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

function PaymentMethodCard({ id, cardNumber, isPrimary }) {
  const [lastFourDigits] = useState(cardNumber.slice(-4));
  const [hovered, setHovered] = useState(false);
  const { token, user, updateUser } = useAuth();

  const deletePaymentMethod = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/users/payment-methods/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      updateUser({ ...user, paymentMethods: res.data.paymentMethods });
    } catch (error) {
      console.error("Error deleting payment method:", error);
    }
  };

  const handleSetPrimary = async () => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/users/payment-methods/${id}/set-primary`,
        { isPrimary: true }, // <-- Skicka med isPrimary!
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.user) {
        updateUser(res.data.user);
      } else if (res.data.paymentMethods) {
        updateUser({ ...user, paymentMethods: res.data.paymentMethods });
      }
    } catch (err) {
      // Hantera fel
    }
  };

  return (
    <div
      className="payment-method-card-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={masterCardLogo}
        alt="MasterCard logo"
        className="mastercard-logo"
      ></img>
      <div className="payment-method-cardnumber-container">
        <p>**** **** **** {lastFourDigits}</p>
      </div>
      <div
        className={`${
          isPrimary
            ? "payment-method-card-primary-container-active"
            : "payment-method-card-primary-container"
        }`}
      >
        {isPrimary && (
          <p className="payment-method-card-primary-text">PRIMARY</p>
        )}
        {!isPrimary && hovered && (
          <button
            className="set-primary-button"
            type="button"
            onClick={handleSetPrimary}
          >
            PRIMARY
          </button>
        )}
      </div>
      <button
        className="cancel-button-s"
        type="button"
        onClick={deletePaymentMethod}
        aria-label="Delete Payment Method"
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
}

export default PaymentMethodCard;
