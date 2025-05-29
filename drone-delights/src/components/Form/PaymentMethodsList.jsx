import { useAuth } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import PaymentMethodCard from "./PaymentMethodCard";

function PaymentMethodsList() {
  const { user } = useAuth();
  const paymentMethods = user?.paymentMethods || [];

  console.log("PaymentMethods: ", paymentMethods);
  console.log("User: ", user);

  return (
    <div className="payment-method-list-container">
      {paymentMethods.length > 0 ? (
        paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method._id}
            id={method._id} 
            cardNumber={method.number}
            isPrimary={method.isPrimary}
          />
        ))
      ) : (
        <p>No payment methods available.</p>
      )}
    </div>
  );
}

export default PaymentMethodsList;
