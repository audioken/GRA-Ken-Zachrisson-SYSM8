import "./PaymentsCardsList.css";
import { useAuth } from "../../../context/AuthContext";
import UserPaymentCard from "../UserPaymentCard/UserPaymentCard";

function PaymentsCardsList() {
  const { user } = useAuth();

  // Hämta sparade betalningsmetoder från användarkontext
  const paymentMethods = user?.paymentMethods || [];

  return (
    <ul
      className="payment-cards-list-container"
      aria-label="Saved payment methods"
    >
      {paymentMethods.length > 0 ? (
        paymentMethods.map((method) => (
          <li key={method._id}>
            <UserPaymentCard
              id={method._id}
              number={method.number}
              isPrimary={method.isPrimary}
            />
          </li>
        ))
      ) : (
        <p>No payment methods available.</p>
      )}
    </ul>
  );
}

export default PaymentsCardsList;
