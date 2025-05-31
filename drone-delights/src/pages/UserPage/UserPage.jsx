import "./UserPage.css";
import TitleHeader from "../../components/Layout/TitleHeader/TitleHeader";
import UserSettingsForm from "../../components/User/UserSettingsForm";
import ChangePasswordForm from "../../components/Auth/ChangePasswordForm";
import UserDeliveryForm from "../../components/User/UserDeliveryForm";
import UserPaymentSection from "../../components/User/UserPaymentSection";
import UserPaymentForm from "../../components/User/UserPaymentForm";
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
      <TitleHeader pageTitleBlue={"User"} pageTitleRed={"Settings!"} />
      <div className="user-page-body">
        {!showChangePassword ? (
          <UserSettingsForm
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
        <UserDeliveryForm
          onExpand={() => handleExpand("delivery")}
          isExpanded={expanded === "delivery"}
        />
        {!showPaymentMethodForm ? (
          <UserPaymentSection
            onAddNewCardClick={() => setShowPaymentMethodForm(true)}
            onExpand={() => handleExpand("payment")}
            isExpanded={expanded === "payment"}
          />
        ) : (
          <UserPaymentForm
            onCancel={() => setShowPaymentMethodForm(false)}
            onSuccess={() => setShowPaymentMethodForm(false)}
          />
        )}
      </div>
    </div>
  );
}

export default UserPage;
