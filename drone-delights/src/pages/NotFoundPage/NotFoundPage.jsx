import "./NotFoundPage.css";

import TitleHeader from "../../components/Layout/TitleHeader/TitleHeader";
import NotFound from "../../components/Shared/NotFound/NotFound";
import ButtonLink from "../../components/UI/Button/ButtonLink";

function NotFoundPage() {
  const smiley = ":(";

  return (
    <div className="not-found-page-container">
      <TitleHeader/>
      <div className="not-found-page-body">
        <NotFound />
        <ButtonLink path="/menu" style="full" text="See Menu" />
      </div>
    </div>
  );
}

export default NotFoundPage;
