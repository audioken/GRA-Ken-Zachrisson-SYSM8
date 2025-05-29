import "./UserPage.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import AccountSettingsForm from "../../components/Form/AccountSettingsForm";
import ChangePasswordForm from "../../components/Form/ChangePasswordForm";
import DeliveryInfoForm from "../../components/Form/DeliveryInfoForm";
import PaymentMethodsDisplay from "../../components/Form/PaymentMethodsDisplay";
import PaymentMethodForm from "../../components/Form/PaymentMethodForm";
import { useState } from "react";

function UserPage() {
  const [expanded, setExpanded] = useState("account"); // "account", "password", null
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPaymentMethodForm, setShowPaymentMethodForm] = useState(false);
  
  const handleExpand = (panel) => {
    if (expanded === panel) {
      setExpanded(null);
      setShowChangePassword(false);
    } else {
      setExpanded(panel);
      setShowChangePassword(false);
    }
  };

  return (
    <div className="user-page-container">
      <PageHeader pageTitleBlue={"User"} pageTitleRed={"Settings!"} />
      <div className="user-page-body">
        {!showChangePassword ? (
          <AccountSettingsForm
            onChangePasswordClick={() => setShowChangePassword(true)}
            onExpand={() => handleExpand("account")}
            isExpanded={expanded === "account"}
          />
        ) : (
          <ChangePasswordForm
            onCancel={() => setShowChangePassword(false)}
            onSuccess={() => setShowChangePassword(false)}
          />
        )}
        <DeliveryInfoForm
          onExpand={() => handleExpand("delivery")}
          isExpanded={expanded === "delivery"}
        />
        {!showPaymentMethodForm ? (
          <PaymentMethodsDisplay
            onAddNewCardClick={() => setShowPaymentMethodForm(true)}
            onExpand={() => handleExpand("payment")}
            isExpanded={expanded === "payment"}
          />
        ) : (
          <PaymentMethodForm
            onCancel={() => setShowPaymentMethodForm(false)}
            onSuccess={() => setShowPaymentMethodForm(false)}
          />
        )}
      </div>
    </div>
  );
}

export default UserPage;
