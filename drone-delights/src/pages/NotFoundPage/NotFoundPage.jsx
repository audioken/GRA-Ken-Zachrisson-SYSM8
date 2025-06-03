import "./NotFoundPage.css";

import TitleHeader from "../../components/Layout/TitleHeader/TitleHeader";
import NotFound from "../../components/Shared/NotFound/NotFound";
import ButtonLink from "../../components/UI/Button/ButtonLink";

function NotFoundPage() {
  const smiley = ":(";

  return (
    <div className="not-found-page-container">
      <TitleHeader />
      <div className="not-found-page-body">
        <NotFound />
        <div className="not-found-page-btns-container">
          <ButtonLink path="/menu" style="full" text="See Menu" />
          <ButtonLink path="/login" style="full" text="Log In" />
          <ButtonLink path="/register" style="full" text="Register" />
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
