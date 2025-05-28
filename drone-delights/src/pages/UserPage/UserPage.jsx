import "./UserPage.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import AccountSettingsForm from "../../components/Form/AccountSettingsForm";
import ChangePasswordForm from "../../components/Form/ChangePasswordForm";
import DeliveryInfoForm from "../../components/Form/DeliveryInfoForm";
import { useState } from "react";

function UserPage() {
  const [expanded, setExpanded] = useState("account"); // "account", "password", null
  const [showChangePassword, setShowChangePassword] = useState(false);
  
  const handleExpand = (panel) => {
    // Om man klickar på redan öppen panel: stäng alla
    // Annars: öppna vald panel och stäng ChangePasswordForm
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
      </div>
    </div>
  );
}

export default UserPage;
