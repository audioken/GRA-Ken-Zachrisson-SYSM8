import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

function PaymentMethodCard({ id, cardNumber, isPrimary }) {
  const [lastFourDigits, setLastFourDigits] = useState(cardNumber.slice(-4));

  const { user, updateUser, token } = useAuth();

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

  return (
    <div className="payment-method-card-container">
      <img src="" alt="" className="mastercard-logo"></img>
      <p>**** **** **** {lastFourDigits}</p>
      {isPrimary && (
        <div className="payment-method-card-primary-container">
          <p className="payment-method-card-primary-text">PRIMARY</p>
        </div>
      )}
      {/* <button className="payment-method-card-remove-button">
        <i className="fas fa-times"></i>
      </button> */}
      <button
        className="form-cancel-btn-mini"
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
