import "./LoginPage.css";
import TitleHeader from "../../components/Layout/TitleHeader/TitleHeader";
import LoginForm from "../../components/Auth/LoginForm";

function LoginPage() {
  return (
    <div className="login-page-container">
      <TitleHeader pageTitleBlue={"Welcome"} pageTitleRed={"Back!"} />
      <div className="login-page-body">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
