import { useState, useEffect } from "react";
import "./FormStyles.css";
import PaymentMethodList from "./PaymentMethodsList";

function PaymentMethodsDisplay({ isExpanded, onExpand, onAddNewCardClick }) {

  return (
    <div className="form-container add-payment-form-container">
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
          <PaymentMethodList />
          <button onClick={onAddNewCardClick}>Add New Card +</button>
        </div>
      ) : null}
    </div>
  );
}

export default PaymentMethodsDisplay;