import "./PaymentsCardsList.css";
import { useAuth } from "../../../context/AuthContext";
import UserPaymentCard from "../UserPaymentCard/UserPaymentCard";

function PaymentsCardsList() {
  const { user } = useAuth();
  const paymentMethods = user?.paymentMethods || [];

  console.log("PaymentMethods: ", paymentMethods);
  console.log("User: ", user);

  return (
    <div className="payment-cards-list-container">
      {paymentMethods.length > 0 ? (
        paymentMethods.map((method) => (
          <UserPaymentCard
            key={method._id}
            id={method._id}
            number={method.number}
            isPrimary={method.isPrimary}
          />
        ))
      ) : (
        <p>No payment methods available.</p>
      )}
    </div>
  );
}

export default PaymentsCardsList;
