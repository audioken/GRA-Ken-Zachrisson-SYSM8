import "./UserPaymentCard.css";
import "../../../styles/ButtonStyles.css";
import masterCardLogo from "../../../assets/images/mastercard.svg";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../UI/Button/Button";
import useIsMobile from "../../../hooks/useIsMobile";
import axios from "axios";

function UserPaymentCard({ id, number, isPrimary }) {
  const [lastFourDigits] = useState(number.slice(-4));
  const [hovered, setHovered] = useState(false);
  const { token, user, updateUser } = useAuth();
  const isMobile = useIsMobile(500);

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
        { isPrimary: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.user) {
        updateUser(res.data.user);
      } else if (res.data.paymentMethods) {
        updateUser({ ...user, paymentMethods: res.data.paymentMethods });
      }
    } catch (err) {
      console.error("Error setting primary payment method:", err);
    }
  };

  return (
    <div
      className="user-payment-card-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="payment-card-details-container">
        <img
          src={masterCardLogo}
          alt="MasterCard logo"
          className="mastercard-logo"
        ></img>
        <div className="payment-cardnumber-container">
          <p>**** **** **** {lastFourDigits}</p>
        </div>
      </div>

      <div className="payment-card-btns-container">
        {isPrimary && (
          <div className="payment-method-card-primary-enabled">
            <p className="payment-method-card-primary-text">PRIMARY</p>
          </div>
        )}

        {!isPrimary && (
          
          <Button
            text="PRIMARY"
            onClick={handleSetPrimary}
            className={`payment-method-card-primary-disabled ${hovered ? "primary-hovered" : ""}`}
          />
        )}
        <Button
          text={<i className="fas fa-times"></i>}
          style="cancel-button-s"
          onClick={deletePaymentMethod}
        />
      </div>
    </div>
  );
}

export default UserPaymentCard;
