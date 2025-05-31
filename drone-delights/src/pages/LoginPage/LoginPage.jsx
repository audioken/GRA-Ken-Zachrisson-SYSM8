import "./LoginPage.css";
import TitleHeader from "../../components/Layout/TitleHeader/TitleHeader";
import LoginForm from "../../components/Auth/LoginForm";
import ButtonLink from "../../components/UI/Button/ButtonLink";

function LoginPage() {
  return (
    <div className="login-page-container">
      <TitleHeader pageTitleBlue={"Welcome"} pageTitleRed={"Back!"} />
      <div className="login-page-body">
        <LoginForm />
      </div>
      <ButtonLink path={"/register"} style={"lite"} text={"Register"} />
    </div>
  );
}

export default LoginPage;
