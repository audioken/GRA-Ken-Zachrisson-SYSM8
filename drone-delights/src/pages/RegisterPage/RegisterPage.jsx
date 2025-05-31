import "./RegisterPage.css";
import RegisterForm from "../../components/Auth/RegisterForm";
import TitleHeader from "../../components/Layout/TitleHeader/TitleHeader";

function RegisterPage() {
  return (
    <div className="register-page-container ">
      <TitleHeader pageTitleBlue="Register" pageTitleRed="Account!" />
      <div className="register-page-body">
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
