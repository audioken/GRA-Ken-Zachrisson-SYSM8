import "../../styles/FormStyles.css";
import "../../styles/PaymentStyles.css";
import PaymentsCardsList from "./PaymentsCardsList/PaymentsCardsList";
import Button from "../UI/Button/Button";

function UserPaymentSection({ isExpanded, onExpand, onAddNewCardClick }) {
  return (
    <div className="form-container">
      <div
        className="form-header-overlay"
        onClick={onExpand}
        aria-label={isExpanded ? "Collapse" : "Expand"}
      />
      <div className="form-header">
        <h2 className="form-title">Payment Methods</h2>
      </div>
      {isExpanded ? (
        <div className="form">
          <PaymentsCardsList />
          <Button
            className="full-blue"
            onClick={onAddNewCardClick}
            text="Add New Card"
          />
        </div>
      ) : null}
    </div>
  );
}

export default UserPaymentSection;
