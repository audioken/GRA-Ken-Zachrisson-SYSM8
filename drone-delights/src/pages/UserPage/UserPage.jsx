import "./UserPage.css";
import PageHeader from "../../components/Layout/PageHeader/PageHeader";
import AccountSettingsForm from "../../components/User/AccountSettingsForm";
import ChangePasswordForm from "../../components/Auth/ChangePasswordForm";
import DeliveryInfoForm from "../../components/User/DeliveryInfoForm";
import PaymentMethodsDisplay from "../../components/User/PaymentMethodsDisplay";
import PaymentMethodForm from "../../components/User/PaymentMethodForm";
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
