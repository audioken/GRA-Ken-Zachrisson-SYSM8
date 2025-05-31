import { useState, useEffect } from "react";
import "../../styles/FormStyles.css";
import "../../styles/PaymentStyles.css";
import PaymentsCardsList from "./PaymentsCardsList/PaymentsCardsList";

function UserPaymentSection({ isExpanded, onExpand, onAddNewCardClick }) {
  return (
    <div className="form-container payment-methods-display-container">
      <div
        className="form-header-overlay"
        onClick={onExpand}
        aria-label={isExpanded ? "Collapse" : "Expand"}
      />
      <div className="form-header">
        <h2 className="form-title">Payment Methods</h2>
      </div>
      {isExpanded ? (
        <div className="payment-methods-display-form ">
          <PaymentsCardsList />
          <button className="full-button-blue" onClick={onAddNewCardClick}>
            Add New Card
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default UserPaymentSection;
