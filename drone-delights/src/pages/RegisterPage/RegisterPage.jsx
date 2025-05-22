import "./RegisterPage.css";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import PageHeader from "../../components/PageHeader/PageHeader";

function RegisterPage() {
  return (
    <div className="register-page-container ">
      <PageHeader pageTitleBlue="Register" pageTitleRed="Account!" />
      <div className="register-page-body">
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
