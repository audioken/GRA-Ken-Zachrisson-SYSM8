import "./LoginPage.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import LoginForm from "../../components/Form/LoginForm";
import ButtonLink from "../../components/ButtonLink/ButtonLink";

function LoginPage() {
  return (
    <div className="login-page-container">
      <PageHeader pageTitleBlue={"Welcome"} pageTitleRed={"Back!"} />
      <div className="login-page-body">
        <LoginForm />
      </div>
      <ButtonLink path={"/register"} style={"lite"} text={"Register"}/>
    </div>
  );
}

export default LoginPage;
