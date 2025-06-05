import "./UserPaymentCard.css";
import "../../../styles/ButtonStyles.css";
import masterCardLogo from "../../../assets/images/mastercard.svg";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Button from "../../UI/Button/Button";
import axios from "axios";

function UserPaymentCard({ id, number, isPrimary }) {
  const { token, user, updateUser } = useAuth();

  // Sista 4 siffrorna på kortet för visning
  const [lastFourDigits] = useState(number.slice(-4));

  // Hover-effekt för att visa extra styling
  const [hovered, setHovered] = useState(false);

  // Radera betalkort
  const deletePaymentMethod = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/users/payment-methods/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      updateUser({ ...user, paymentMethods: res.data.paymentMethods });
    } catch (error) {
      console.error("Error deleting payment method:", error);
    }
  };

  // Sätt detta kort som primärt
  const handleSetPrimary = async () => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/users/payment-methods/${id}/set-primary`,
        { isPrimary: true },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Uppdatera användaren beroende på vad backend skickar tillbaka
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
    <article
      className="user-payment-card-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="payment-card-details-container">
        <img
          src={masterCardLogo}
          alt="MasterCard logo"
          className="mastercard-logo"
        />
        <div className="payment-cardnumber-container">
          <p>**** **** **** {lastFourDigits}</p>
        </div>
      </div>

      <div className="payment-card-btns-container">
        {isPrimary ? (
          <span
            className="payment-method-card-primary-enabled"
            aria-label="Primary payment method"
          >
            PRIMARY
          </span>
        ) : (
          <Button
            text="PRIMARY"
            onClick={handleSetPrimary}
            className={`payment-method-card-primary-disabled ${
              hovered ? "primary-hovered" : ""
            }`}
          />
        )}

        <Button
          text={<i className="fas fa-times"></i>}
          style="cancel-button-s"
          onClick={deletePaymentMethod}
        />
      </div>
    </article>
  );
}

export default UserPaymentCard;

