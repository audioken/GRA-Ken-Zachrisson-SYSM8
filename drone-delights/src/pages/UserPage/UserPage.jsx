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
    setExpanded((prev) => (prev === panel ? null : panel));
  };

  return (
    <div className="user-page-container">
      <PageHeader pageTitleBlue={"User"} pageTitleRed={"Settings!"} />
      <div className="user-page-body">
        {!showChangePassword ? (
          <AccountSettingsForm
            onChangePasswordClick={() => setShowChangePassword(true)}         
          />
        ) : (
          <ChangePasswordForm
            onCancel={() => setShowChangePassword(false)}
            onSuccess={() => setShowChangePassword(false)}
            isExpanded={true}
            onExpand={() => {}}
          />
        )}
        <DeliveryInfoForm />
      </div>
    </div>
  );
}

export default UserPage;
