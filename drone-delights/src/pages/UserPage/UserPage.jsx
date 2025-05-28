import "./UserPage.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import AccountSettingsForm from "../../components/Form/AccountSettingsForm";
import ChangePasswordForm from "../../components/Form/ChangePasswordForm";

function UserPage() {
  return (
    <div className="user-page-container">
      <PageHeader pageTitleBlue={"User"} pageTitleRed={"Settings!"} />
      <div className="user-page-body">
        <AccountSettingsForm />
        {/* <ChangePasswordForm /> */}
      </div>
    </div>
  );
}

export default UserPage;
